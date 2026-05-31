const { SyncHook, Tapable, AsyncSeriesHook, SyncBailHook, AsyncParallelHook } = require('tapable');
const Complication = require('./Compilation');
const Stats = require('./Stats');
const NormalModleFactory = require('./NormalModleFactory');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp')


module.exports = class Compiler extends Tapable{
    constructor(context){
        super()
        this.context = context
        this.hooks = {
            beforeRun: new AsyncSeriesHook(['compiler']), 
            run: new AsyncSeriesHook(["compiler"]),
            beforeCompile: new AsyncSeriesHook(["params"]),
            compile: new SyncHook(["params"]),
            afterCompile: new AsyncSeriesHook(["compilation"]), // 编译完成
            // done: new AsyncSeriesHook(['stats']),
            entryOption: new SyncBailHook(["context", "entry"]),
            make: new AsyncParallelHook(["compilation"]), // 异步并行钩子 构建

            thisCompilation: new SyncHook(["compilation", "params"]), // 开始一次新的编译
            compilation: new SyncHook(["compilation", "params"]), // 创建完成一个新的 compilation

            emit: new AsyncSeriesHook(['compilation']), // 发射或者写入
            done: new AsyncSeriesHook(['sats']) // 编译完成
        }
    }
    emitAssets(compilation, cb){
        // finalCallback(err, {
        //     entries: [], // 显示所有的入口
        //     chunks: [], // 显示所有的代码块
        //     modules: [], // 显示所有模块
        //     assets: [],  // 显示所有打包后的资源， 也就是文件
        // })

        // finalCallback(err, new Stats(compilation))

        // 把 chunk 写文文件，写入硬盘
        const emitFiles = (err) => {
            const assets = compilation.assets
            let outputPath = compilation.options.output.path
            for (const file in assets) {
               const source = assets[file]
               let targetPath = path.posix.join(outputPath, file)
               this.outputFileSystem.writeFileSync(targetPath, source)
            }
            cb()
        }
        // emit 钩子很多，他是修改资源的最后的钩子，之后就开始写入硬盘了
        this.hooks.emit.callAsync(compilation, () => {
            // 先创建dist目录， 在写入文件
            mkdirp(this.options.output.path, emitFiles)
        })
    }
    run(cb){
        // const finalCallback = (err, stats) => {
        //     cb(err, stats)
        // }

        const onCompiled = (err, compilation) => {
            this.emitAssets(compilation, (err) => {
                let stats = new Stats(compilation)
                this.hooks.done.callAsync(stats, (err) => {
                    cb(err, stats)
                })
            })
        }

        // hooks 执行顺序是
        // entryOption -> beforeRun -> run -> beforeCompile -> compile -> make -> afterCompile -> done
        this.hooks.beforeRun.callAsync(this, (err) => {
            this.hooks.run.callAsync(this, () => {
                this.compiler(onCompiled)
            })
        })
    }
    compiler(onCompiled){
        const params = this.newCompilationParams('params');
        this.hooks.beforeCompile.callAsync('params',(err) => {
            this.hooks.compile.call(params)
            let compilation = this.newComplication(params)

            this.hooks.make.callAsync(compilation, (err) => {
                console.log('make 完成');
                
                // seal 之后 编译就完成了
                compilation.seal(err => {
                    // 触发编译完成的钩子
                    this.hooks.afterCompile.callAsync(compilation, err => {
                        onCompiled(null, compilation)
                    })
                })
            })
        })
    }
    newCompilationParams(){
        const params = {
            normalModleFactory: new NormalModleFactory(),
            
        }
        return params
    }

    newComplication(params){
        const complication = this.createComplication()
        this.hooks.thisCompilation.call(complication, params)
        this.hooks.compilation.call(complication, params)
        return complication
    }
    createComplication(){
        return new Complication(this);
    }
}


