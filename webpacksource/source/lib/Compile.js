
const { Tapable, AsyncSeriesHook, SyncBailHook, AsyncParallelBailHook, SyncHook } = require('tapable');
const NormalModuleFactory = require('./NormalModuleFactory');
const Compilation = require('./Compilation');
const Stats = require('./Stats')

class Compile extends Tapable{
    constructor(context){
        super();
        this.context = context;
        this.hooks = {
            // 当编译完成触发这个钩子
            done: new AsyncSeriesHook(['stats']),

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

            // 开始创建一次新的编译
            thisCompilation: new SyncHook(['compilation','params']),
            // 创建完成新的 compilation
            compilation: new SyncHook(['compilation','params']),


            // 运行前
            beforeRun: new AsyncSeriesHook(['compiler']),
            // 运行时
            run: new AsyncSeriesHook(['compiler']),
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
            finalCallback(err, new Stats(compilation))
        }

        this.hooks.beforeRun.callAsync(this, (err) => {
            this.hooks.run.callAsync(this,err => {
                this.compile(onCompiled)
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
                onCompiled(err, compilation);
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