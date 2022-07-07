const { Tapable, AsyncSeriesHook, SyncBailHook, AsyncParallelBailHook, SyncHook } = require('tapable');
const path = require('path');
const fs = require('fs')
const neoAsync = require('neo-async')
const Chunk = require('./Chunk')

const Parser = require('./Parser')
const parser = new Parser();

const NormalModuleFactory = require('./NormalModuleFactory')
const normalModuleFactory = new NormalModuleFactory();


const ejs = require('ejs');
const mainTempalte = fs.readFileSync(path.posix.join(__dirname, '../templates', 'main.ejs'), 'utf-8')
const mainRender = ejs.compile(mainTempalte)

module.exports = class Compilation extends Tapable {
    constructor(compiler){
        super();
        this.compiler = compiler
        this.options = compiler.options
        this.context = compiler.context // 根目录

        this.inputFileSystem = compiler.inputFileSystem;
        this.outFileSystem = compiler.outFileSystem;

        this.entries = [] // 入口模块的数组， 存放所有的入口模块
        this.modules = [] // 模块的数组，里面存放所有的模块
        this.chunks = []

        this.hooks = {
            // 当成功构建完一个模块后就会触发此钩子执行
            successModule: new SyncHook(['module']),

            seal: new SyncHook(['']),
            beforeChunks: new SyncHook(['']),
            afterChunks: new SyncHook([''])
        }

        this._modules = {} // key 模块id， value 模块

        this.files = [] // 本地编译所有产出的文件

        this.assets = {} // 存放生成的资源， key 是文件名， 值是 文件的内容
    }
    /**
     * 开始编译新的入口
     * @param {*} context   根目录
     * @param {*} entry     入口模块的相对路径  ./src/index.js
     * @param {*} name      main
     * @param {*} cb        完成的回调
     */
    addEntry(context, entry, name, cb){
        this._addModuleChain(context, entry, name, (err, module) => {
            cb(err, module)
        })
    }
    _addModuleChain(context, entry, name, cb){
        this.createModule({ 
            name,
            context,
            rawRequest: entry,
            resource: path.posix.join(context, entry), // 入口的绝对路径
            parser,
        }, entryModule => this.entries.push(entryModule), cb)
    }
    /**
     * 
     * @param {*} data 要编译的模块的信息
     * @param {*} addEntry 可选的增加入口的方法， 如果这个模块是入口模块，就执行。负责，什么都不做
     * @param {*} cb 编译完成之后的 cb 回调
     */
    createModule(data, addEntry, cb){
        let module = normalModuleFactory.create(data)
        module.moduleId = './' + path.posix.relative(this.context, module.resource)  // resource 模块的绝对路径

        addEntry && addEntry(module) // 如果是入口模块，则添加
        // this.entries.push(module) // 给入口模块添加一个模块

        this._modules[module.moduleId] = module


        this.modules.push(module) // 给普通模块添加一个模块

        const afterBuild = (err, module) => {
            // 当前的moule 已经编译完成了， 需要编译此模块的依赖的模块

            if(module.dependencies.length > 0){
                this.precessModuleDependencies(module, err => {
                    cb(err, module)
                })
            }else {
                cb(err, module)
            } 
        }
        this.buildModule(module, afterBuild)
    }

    // 模块编译 调用 自己的编译方法
    buildModule(module, afterBuild){
        // 这里的 cb 调用完成之后，module._ast、module._source 都有了
        module.build(this, (err) => {
            this.hooks.successModule.call(module)
            afterBuild(err, module)
        })
    }   

    precessModuleDependencies(module, cb){
        // 拿到当前模块依赖的模块
        let dependencies = module.dependencies

        // 循环编译 dependencies 的每个 item 模块，所有的模块都结束之后，执行 cb
        neoAsync.forEach(dependencies, (dependencie, done) => {
            let { 
                name, 
                context, // 根目录
                rawRequest, // 模块的相对路径
                moduleId, // 模块 id 它是一个相当于根目录的相对路径 以 ./ 开头
                resource,
            } = dependencie

            // 每个 dependencie 编译成功执行 done， 当所有模块都编译成功 执行 cb
            this.createModule({ 
                name,
                context,
                rawRequest,
                resource,
                parser,
                moduleId,
            }, null, done)

        }, cb)
    }
    
    /**
     * 把模块封装成代码块
     * @param {*} cb 
     */
    seal(cb){
        this.hooks.seal.call()
        this.hooks.beforeChunks.call()

        for (const entrie of this.entries) {
            const chunk = new Chunk(entrie) // 每个入口对应一个 chunk
            this.chunks.push(chunk)

            // this.modules 所有的模块 过滤出来 
            chunk.modules = this.modules.filter(_ => _.name === chunk.name)
        }

        this.hooks.afterChunks.call(this.chunks)
        // 生成代码块之后，需要生成代码块对应的资源
        this.createChunkAssets()
        cb()
    }
    createChunkAssets(){
        for (let index = 0; index < this.chunks; index++) {
            const chunk = this.chunks[index];
            const file = chunk.name + '.js'

            chunk.files.push(file)

            let source = mainRender({
                entryModuleId: chunk.entryModule.moduleId,
                modules: chunk.modules
            })
            this.emitAssets(file, source)
        }
    }
    emitAssets(file, source){
        this.assets[file] = source
        this.files.push(file)
    }
}