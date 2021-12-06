const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');


module.exports = {
    target: 'web',
    context: process.cwd(),
    entry: './src/index.js',
    mode: 'development',
    devtool: false,
    // 类内部声明的方法，是不可枚举的，而通过原型链声明的方法是可以枚举的
    // https://zhuanlan.zhihu.com/p/32831172
    // https://juejin.cn/post/6844903640533041159
    // 三个重大更新
    // 1. 持久化缓存(默认开启，默认启用内存缓存) 2. tree shaking (sideEffects: ['*.css'])  3. 模块联邦
    // 处理资源的loader 内置了；  支持在请求中处理学医(URIs)；  deterministic 变更；   移除 node 核心模块的 polyfill(版本4 默认打包打进来，5不会打进去)

    // 改为 filesystem 不能使用 cnpm 安装模块
    // cache.cacheDirectory 选项仅当 cache.type 被设置成 filesystem 才可用。
    // cache: {
        // type: 'filesystem', // memory filesystem 默认是 memory 
        // cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack')
    // },
    experiments: {
        topLevelAwait: true,
    },
    output: {
        publicPath: 'http://localhost:8080/',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[name].js',
        environment: {
            arrowFunction: false,
            dynamicImport: true,
        }
    },
    // 以前的 chunkfilename 都是 以 0 1 2 3 作为[name].js, 现在改进采用 确定性的算法计算出来的 文件名， 文件内容不变，名字不变
    optimization: {
        usedExports: true, // 表示使用到的导出
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
    devServer: {
        port: 8080,
        hot: true,
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        onBeforeSetupMiddleware(devServer, server, compiler){
            devServer.app.use((req, res, next) => {
                if(req.path === '/success' && req.method.toLowerCase() === 'get'){
                    res.json({id: 1})
                }
                if(req.path === '/error' && req.method.toLowerCase() === 'post'){
                    res.json({id: 1})
                }
                next()
            });
        },
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
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        }
                    }
                ]
            },
            {
                test: /\.png$/,
                type: 'asset/resource',  // -> 对标 file-loader 
            },
            {
                test: /\.ico$/,
                type: 'asset/inline',  // -> 对标 url-loader 
            },
            {
                test: /\.txt$/,
                type: 'asset',  // -> 不写类型， 自己匹配找类型   对标 raw-loader 
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
        new ModuleFederationPlugin({
            name: 'remotegzh', // 必填 输出的模块名 被远程引用路径为 ${remotes.name}/${expose}
            filename: 'remoteEntry.js', // 构建出来的文件名
            exposes: {
                './NewList': './src/list'
            },
            // shared: ['react', 'react-dom'],
            shared: {
                'react': {singleton: true}, 
                'react-dom': {singleton: true}
            },
            remotes: { // 远程引用的应用名以及 别名的映射， 使用时 以 key 值作为 name
                hostgzh: 'host@http://localhost:8081/hostEntry.js'
            },
        }),
    ],
}