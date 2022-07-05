const { Tapable, AsyncSeriesHook, SyncBailHook, AsyncParallelBailHook, SyncHook } = require('tapable');
const path = require('path');

const Parser = require('./Parser')
const parser = new Parser();

const NormalModuleFactory = require('./NormalModuleFactory')
const normalModuleFactory = new NormalModuleFactory();


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

        this.hooks = {
            // 当成功构建完一个模块后就会触发此钩子执行
            successModule: new SyncHook(['module'])
        }
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
        let entryModule = normalModuleFactory.create({
            name,
            context: this.context,
            rawRequest: entry,
            resource: path.posix.join(context, entry), // 入口的绝对路径
            parser,
        })

        this.entries.push(entryModule) // 给入口模块添加一个模块
        this.modules.push(entryModule) // 给普通模块添加一个模块

        const afterBuild = (err) => {
            return cb(err, entryModule)
        }
        this.buildModule(entryModule, afterBuild)
    }

    // 模块编译 调用 自己的编译方法
    buildModule(module, afterBuild){
        // 这里的 cb 调用完成之后，module._ast、module._source 都有了
        module.build(this, (err) => {
            this.hooks.successModule.call(module)
            afterBuild(err)
        })
    }   
}