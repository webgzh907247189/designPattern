const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
    target: 'web',
    context: process.cwd(),
    entry: './src/index.js',
    mode: 'production',
    devtool: 'source-map',
    // 类内部声明的方法，是不可枚举的，而通过原型链声明的方法是可以枚举的
    // https://zhuanlan.zhihu.com/p/32831172
    // https://juejin.cn/post/6844903640533041159
    // 三个重大更新
    // 1. 持久化缓存(默认开启，默认启用内存缓存) 2. tree shaking (sideEffects: ['*.css'])  3. 模块联邦
    // 处理资源的loader 内置了；  支持在请求中处理学医(URIs)；  deterministic 变更；   移除 node 核心模块的 polyfill(版本4 默认打包打进来，5不会打进去)

    // 内置 Web Worker 构建能力;      *** 内置了 Prepack 的部分能力 (scope hosting) ****； *****  内置 WebAssembly 编译及异步加载能力 ******
    // 注意，在new URL()中不能使用.worker.js命名文件，否则会优先被 worker-loader 解析而导致最终你的 worker 无法正常运行
    // master.js
    // const worker = new Worker(new URL('./calc.js', import.meta.url), {
    //     name: "calc"
    //     /* webpackEntryOptions: { filename: "workers/[name].js" } */
    // });
    // worker.onmessage = e => {
    //     console.log(e.data.value);
    // };


    // 改为 filesystem 不能使用 cnpm 安装模块
    // cache.cacheDirectory 选项仅当 cache.type 被设置成 filesystem 才可用。
    // 设置这个之后，不能使用cnpm 下载
    cache: {
        type: 'filesystem', // memory filesystem 默认是 memory 
        // cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack')
    },
    experiments: {
        topLevelAwait: true,
        asyncWebAssembly: true, // https://wasdk.github.io/WasmFiddle/
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'monitor.js',
        chunkFilename: '[name].js',
        environment: {
            arrowFunction: false,
            dynamicImport: false,
        }
    },
    // 以前的 chunkfilename 都是 以 0 1 2 3 作为[name].js, 现在改进采用 确定性的算法计算出来的 文件名， 文件内容不变，名字不变
    optimization: {
        usedExports: true, // 表示使用到的导出
        // minimize:true, //开启压缩 (删除未使用代码)
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
    },
    resolve: {
        // 需要 polyfill
        fallback: {
            // 'crypto': require.resolve('crypto-browserify'), 
            // 'stream': require.resolve('stream-browserify'), 
            // 'buffer': require.resolve('buffer'), 
        },
        // 不需要 polyfill
        // fallback: {
        //     'crypto': false, 
        //     'stream': false,
        //     'buffer': false, 
        // },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env']],
                        }
                    }
                ]
            },
            // asset/source ——功能相当于 raw-loader。
            {
                test: /\.png$/,
                type: 'asset/resource',  // -> 对标 file-loader 
                // generator: {
                //     // [ext]前面自带"."
                //     filename: 'assets/[hash:8].[name][ext]',
                // },
            },
            {
                test: /\.ico$/,
                type: 'asset/inline',  // -> 对标 url-loader 
            },
            {
                test: /\.txt$/,
                type: 'asset',  // -> 不写类型， 自己匹配找类型   对标 raw-loader 
                // 默认会根据文件大小来选择使用哪种类型，当文件小于 8 KB 的时候会使用 asset/inline，否则会使用 asset/resource。
                parser: {
                    detaUrlCondition: {
                        maxSize: 4* 1024
                    }
                }
            }
        ]
    },
    plugins: [
        // 监控脚本先执行，所以注册到头部
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: 'head',
            scriptLoading: 'blocking'
        }),
        new CleanWebpackPlugin(),
    ],
}