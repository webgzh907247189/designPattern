
const { Tapable, AsyncSeriesHook, SyncBailHook, AsyncParallelBailHook, SyncHook } = require('tapable');
const NormalModuleFactory = require('./NormalModuleFactory');
const Compilation = require('./Compilation');
const Stats = require('./Stats')
const mkdirp = require('mkdirp')

class Compile extends Tapable{
    constructor(context){
        super();
        this.context = context;
        this.hooks = {
           

            // context 项目根目录的决定路径  entry 项目入口
            entryOption: new SyncBailHook(['context', 'entry']),

            //异步 并行钩子
            make: new AsyncParallelBailHook(['compilation']),

            // 编译前
            beforeCompile: new AsyncSeriesHook(['params']),
            // 编译后
            afterCompile: new AsyncSeriesHook(['compilation']),
            // 编译时
            compile: new SyncHook(['params']),
            // 编译前
            afterCompile: new AsyncSeriesHook(['compilation']),

            // 开始创建一次新的编译
            thisCompilation: new SyncHook(['compilation','params']),
            // 创建完成新的 compilation
            compilation: new SyncHook(['compilation','params']),


            // 运行前
            beforeRun: new AsyncSeriesHook(['compiler']),
            // 运行时
            run: new AsyncSeriesHook(['compiler']),

            emit: new AsyncSeriesHook(['compilation']), // 发射写入
            // 当编译完成触发这个钩子
            done: new AsyncSeriesHook(['stats']),
        }
    }

    // 编译当入口
    run(cb){
        console.log('Compile run');

        // 最终的回调函数
        const finalCallback = (err, stats) => {
            cb(err, stats)
        }

        const onCompiled = (err, compilation) => {
            // finalCallback(err,  {
            //     entries: [], // 显示所有的入口
            //     chunks: [], // 显示所有的代码块
            //     modules: [], // 显示所有的模块
            //     assets: [], // 显示所有的资源，打包之后的文件
            // })
            // finalCallback(err, new Stats(compilation))

            // chunk 变成文件，写入硬盘
            // const emitFiles = () => {
            //     const assets = compilation.assets
            //     let outputPath = compilation.options.output.path
            //     for (const file in assets) {
            //        const source = assets[file]
            //        let targetPath = path.posix.join(outputPath, file)
            //        this.outputFileSystem.writeFileSync(targetPath, source)
            //     }
            //     cb()
            // }
            // // emit 是修改资源的最后机会，后面就写入硬盘了
            // this.hooks.emit.callAsync(compilation, err => {
            //     mkdirp(this.options.output.path, emitFiles)
            // })

            this.emitAssets(compilation,err => {
                let stats = new Stats(compilation)
                this.hooks.done.callAsync(stats, (err) => {
                    cb(err, stats)
                })
            })
        }

        this.hooks.beforeRun.callAsync(this, (err) => {
            this.hooks.run.callAsync(this,err => {
                this.compile(onCompiled)
            })
        })
    }
    emitAssets(compilation, cb){
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

            // console.log(this.options.output, 'this.options.output.path', emitFiles)
            mkdirp(this.options.output.path).then(() => {
                emitFiles()
            })
        })
    }

    compile(onCompiled){
        const params = this.newCompilationsParams();
        this.hooks.beforeCompile.callAsync(params, err => {
            this.hooks.compile.call(params)

            // 此处创建 compilation
            const compilation = this.newCompilation(params)

            // 触发 make 钩子 执行
            this.hooks.make.callAsync(compilation, err => {
                console.log('make 完成');

                // 封装代码之后编译就完成了
                compilation.seal(err => {
                    // 触发编译完成
                    this.hooks.afterCompile.callAsync(compilation, (err)=> {
                        onCompiled(err, compilation);
                    })
                })
            })
        })
    }
    newCompilation(params){
        const compilation = this.createCompilation();

        this.hooks.thisCompilation.call(compilation, params)
        this.hooks.compilation.call(compilation, params)
        return compilation
    }
    createCompilation(){
        return new Compilation(this)
    }
    newCompilationsParams(){
        const params = {
            // 创建 compilation 之前，已经创建了一个模块工厂
            normalModuleFactory: new NormalModuleFactory()
        }

        return params
    }
}

exports = module.exports = Compile