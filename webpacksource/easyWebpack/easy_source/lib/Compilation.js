const fs = require('fs');
const path = require('path');
const { Tapable, SyncHook } = require('tapable');
const NormalModleFactory = require('./NormalModleFactory');
const Parser = require('./Parser')
const neo_async = require('neo-async');
const Chunk = require('./Chunk');
const ejs = require('ejs');
const mainTempalte = fs.readFileSync(path.posix.join(__dirname, '../templates', 'main.ejs'), 'utf-8')
const mainRender = ejs.compile(mainTempalte)

let parser = new Parser()
let normalModleFactory = new NormalModleFactory()
module.exports = class Compilation extends Tapable{
    constructor(compiler){
        super()
        this.compiler = compiler
        this.options = compiler.options
        this.context = compiler.context
        this.inputFileSystem = compiler.inputFileSystem // 读文件
        this.outputFileSystem = compiler.outputFileSystem// 写文件
        this.modules = [] // 存放本次编译产生的 所有的模块
        this._modules = {} // key 模块id， 值是 模块对象
        this.entrys = [] // 入口模块的数组，这里存放所有的模块
        this.hooks = {
            succesedModule: new SyncHook(['module']), // 构建完成一个模块就会触发这个钩子

            seal: new SyncHook(),
            beforeChunks: new SyncHook(), // 生成代码块之前
            afterChunks: new SyncHook(), // 生成代码块之后
        }


        this.chunks = []
        this.entrypoints = new Set()
        this.assets = {}
        this.files = []; // chunk 生成的输出文件名构成的数组。你可以从 compilation.assets 表中访问这些资源来源。

        this.chunks = [] // 这里存放所有的代码块

        this.assets = {} // 存放生成的资源， key 是文件名， 值是 文件的内容
    }

    addEntry(context, entry, name, cb){
        this._addModuleChain(context, entry, name, (err, module) => {
            cb(err, module)
        })
    }
    _addModuleChain(context, entry, name, cb){
        this.createModule({
                name, context, rawRequest: entry, parser,
                resource: path.posix.join(context, entry),
                moduleId: './' + path.posix.relative(context, path.posix.join(context, entry))
            },
            entryModle => this.entrys.push(entryModle),
            cb,
        )
    }
    /**
     * @param {*} data 要编译的模块的信息
     * @param {*} addEntry  可选增加入口的方法， 如果这个模块是 入口模块，不是入口模块，什么都不做
     * @param {*} cb 编译完成后可以调用 cb
     */
    createModule(data, addEntry, cb){
        // let entryModule = normalModleFactory.create({
        //     name,
        //     context: this.context,
        //     rawRequest: entry, // ./src/index.js
        //     resource: path.posix.join(context, entry), // 拼接的资源 绝对路径
        //     parser,
        // })

        let entryModule = normalModleFactory.create(data)
        // entryModule.moduleId = './' + path.posix.relative(this.context, entryModule.resource)
        // console.log(entryModule.resource, '111', data.resource, '2222', entryModule.moduleId)

        addEntry && addEntry(entryModule) // 如果是入口模块， 则添加到入口里面去
        // 给入口模块添加一个模块
        // this.entrys.push(entryModule)


        // 给普通模块添加一个模块
        this.modules.push(entryModule)

        this._modules[entryModule.moduleId] = entryModule // 保存 this._modules 信息，可以  通过 模块id 拿到 模块信息


        const afterBuild = (err, module) => {
            // 大于 0 表示有依赖的模块
            if(module.dependencies.length > 0){
                this.processModuleDependencies(module, err => {
                    cb(err, module)
                })
            }else{
                cb(err, module)
            }
        }
        this.buildModule(entryModule, afterBuild)
    }
    buildModule(module, afterBuild){
        // 模块的编译逻辑，放在 module 内部
        module.build(this, (err)=> {
            this.hooks.succesedModule.call(module)
            afterBuild(err, module)
        })
    }

    processModuleDependencies(module, cb){
        let dependencies = module.dependencies
        // console.log(neo_async, 'dependencies')

        neo_async.forEach(dependencies, (dependencie, done) => {
            let { name, context,rawRequest,resource, moduleId } = dependencie

            this.createModule({
                    name, context, rawRequest, parser,resource, moduleId
                },
                null,
                done,
            )

        }, () => {
            cb()
        })
    }

    seal(cb){
        this.hooks.seal.call()
        this.hooks.beforeChunks.call() // 开始准备生成代码块

        // 循环入口，开始生成 chunk
        for (const entryModule of this.entrys) {
            const chunk = new Chunk(entryModule)
            // 根据入口模块得到代码块，放到 this.chunks 里面
            this.chunks.push(chunk)

            // 对所有的模块进行过滤，找出来 名称和chunk 一样的 模块
            chunk.modules = this.modules.filter(_ => _.name === chunk.name)
        }

        this.hooks.afterChunks.call(this.chunks)
        // 生成代码块对应的资源
        this.createChunkAssets()
        cb()
    }
    createChunkAssets(){
        const chunks = this.chunks
        for (let index = 0; index < chunks.length; index++) {
            const chunk = chunks[index];
            chunk.files = []
            const file = chunk.name + '.js' // 对应的是 output 的  chunkFileName 字段 (chunkFileName: [name].[chunkHash].js)

            chunk.files.push(file) //拿到了文件名

            // console.log()
            let source = mainRender({
                entryModuleId: chunk.entryModule.moduleId,
                modules: chunk.modules
            })
            this.emitAsstes(file, source)
        }
    }
    emitAsstes(file, source){
        this.assets[file] = source
        this.files.push(file)
    }
}