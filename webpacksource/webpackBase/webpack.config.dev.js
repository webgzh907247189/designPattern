const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    // 当前工作目录
    context: process.cwd(),
    mode: 'development',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    devServer: {
        hot: true,

        port: 3001,
        progress: true,
        contentBase: './dist',
        // 3. 在server 中启动webpack
        // 2. mock
        before(app){
            app.get('/user',(req,res) => {
                res.json({name: 'test'});
            })
        },
        // 1. 代理
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                pathRewrite: {
                    '/api': '',
                }
            }
        }
    },
    resolve: {
        // modules: [path.resolve(__dirname, '../node_modules')], //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
        // mainFiles: [], // 入口文件的名字 //解析目录时要使用的文件名   ->    .index.web.js  index.rn.js
        // mainFields: [] // 入口  // 针对Npm中的第三方模块优先采用jsnext:main中指向ES6模块化语法的文件  package的 main module 字段
        // extensions: [], // 扩展名  ->   .js .css .vue
    },
    // 专门解析 loader
    resolveLoader: {
        alias: {
            loader1: path.resolve(__dirname, 'myLoader/index'),
            babelLoader: path.resolve(__dirname, 'myLoader/babelLoader'),
            bannerLoader: path.resolve(__dirname, 'myLoader/bannerLoader'),
            myUrlLoader: path.resolve(__dirname, 'myLoader/urlLoader'),
        },
        // 与上面的功能一样， 配置 loader 优先级
        // modules: ['node_modules', path.resolve(__dirname, 'myLoader')],
    },
    module: {
        // 与 expose-loader 冲突
        // noParse: /lodash|jquery/,
        rules: [
            {
                test: require.resolve('jquery'),
                use: {
                    loader: 'expose-loader',
                    options: {
                        exposes: ['$'],
                    },
                }
            },
            // @babel/core
            // babelCore.transform
            // 使用 babelCore 进行 transform code
            {
                test: /\.js$/,
                use: [{
                    loader: 'bannerLoader',
                    options: {
                        text: 'gzh',
                        filename: path.resolve(__dirname, 'doc/bannerLoaderText.js'),
                    },
                }, {
                    loader: 'babelLoader',
                    // loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                // css loader 解析 @import 这种语法
                // style-loader 把style 插入到 head 中
                // loader 特点单一
                // loader 顺序从右到左
                // loader 可以写成对象
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top',
                        }
                    },
                    'css-loader',
                    'loader1'
                ]
            },
            {
                test: /\.(png|jpeg)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        outputPath: '/img/',
                    }
                }
            },
            {
                test: /\.gif/,
                use: {
                    loader: 'myUrlLoader',
                    options: {
                        limit: 1000000,
                        outputPath: '/img/',
                    }
                }
            },
        ]
    },
    externals: {
        // vue: 'Vue',
        'vue-router': 'VueRouter',
        // 'react': 'React',
    },
    // watch: true,
    // watchOptions: {
    //     poll: 1000,
    //     aggregateTimeout: 500, // 一直输入代码
    //     ignored: /node_modules/ // 不需要监控的
    // },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'mainfast.json')
        }),
        // 在每个模块进行注入
        new webpack.ProvidePlugin({
            '$1': 'jquery'
        }),
        new HtmlWebpackplugin({
            template: './index.html',
        }),

        new webpack.NamedModulesPlugin(), // 打印更新的模块路径
        new webpack.HotModuleReplacementPlugin(),
    ]
}




// webpack 默认0 配置，找的node_modules 下面的webpack-cli 配置