const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackplugin = require('optimize-css-assets-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const MyDonePlugin = require('./myPlugin/Doneplugin');
const Asyncplugin = require('./myPlugin/Asyncplugin');
const FileListplugin = require('./myPlugin/FileListplugin');
const InlineSourceplugin = require('./myPlugin/InlineSourceplugin');

// tree-shaking  scope-hosting

//  happypack 打包 多线程打包
const happypack = require('happypack');
module.exports = {
    // 当前工作目录
    context: process.cwd(),
    mode: 'production',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[hash:5].js',
    },
    optimization: {
        minimizer: [
            // 压缩了css 导体 webpack默认的js 没有压缩，所以需要手动在压缩一次
            new optimizeCssAssetsWebpackplugin(),
            new uglifyjsWebpackPlugin({
                cache: true,
                parallel: true,
            }),
        ],


        // 切割代码
        // 分割代码块
        // splitChunks: {
        //     // 缓存组
        //     cacheGroups: {
        //         // 公共的模块
        //         // 存在优先级的问题，默认先走上面
        //         common: {
        //             chunks: 'initial',
        //             minSize: 0,
        //             minChunks: 2,
        //         },
        //         vender: {
        //             test: /node_modles/,
        //             chunks: 'initial',
        //             minSize: 0,
        //             minChunks: 2,
        //             priority: 2,
        //         }
        //     },
        // }

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
            // {
            //     test: /\.html$/,
            //     use: 'html-withimg-loader',
            // },

            // loader 默认从右向左执行， 从下向上执行
            // loader 类型： 
            // 1. pre 前置loader
            // 2. normal loader
            // 3. 内联 loader
            // 4. 后置 loader


            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'eslint-loader',
            //         options: {
            //             // 配置此处目的: 让 eslint-loader 前置执行， 配置(enforce 前置执行) (post 后置执行)
            //             enforce: 'pre'
            //         }
            //     }
            // },

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
                },

                // {
                //     // loader: 'babel-loader',
                //     loader: 'babelLoader',
                //     options: {
                //         presets: [
                //             '@babel/preset-env'
                //         ],
                //         plugins: [
                //             '@babel/plugin-transform-runtime'
                //         ]
                //     }
                // },
                {
                    loader: 'happypack/loader?id=js',
                }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                // css loader 解析 @import 这种语法
                // style-loader 把style 插入到 head 中
                // loader 特点单一
                // loader 顺序从右到左， 从下到上
                // loader 可以写成对象
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insertAt: 'top',
                    //     }
                    // },

                    // 抽离css文件
                    miniCssExtractPlugin.loader,
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
                        limit: 100,
                        outputPath: '/img/',
                    }
                }
            },
        ]
    },
    // 'source-map' 生成单独的 source-map 文件
    // 'eval-source-map' 不产生单独的 source-map 文件，但是可以显示 行列
    devtool: 'source-map',
    externals: {
        // vue: 'Vue',
        'vue-router': 'VueRouter',
    },
    plugins: [
        // "preprod": "rm -rf ./dist",
        new CleanWebpackPlugin(),

        // 在每个模块进行注入
        new webpack.ProvidePlugin({
            '$1': 'jquery'
        }),
        new HtmlWebpackplugin({
            template: './index.html',

            // 产生 ? 携带的 hash 字符
            hash: true,
            minify: {
                // collapseWhitespace: true
            }
        }),
        new miniCssExtractPlugin({
            // 此处加不加 / 影响很大
            filename: 'css/main.[hash].css',
        }),
        new CopyWebpackPlugin([
            {from: './doc', to: './'},
        ]),
        new webpack.BannerPlugin('test--webpack'),

        new webpack.IgnorePlugin(/\.\/locale/,/moment/),

        new MyDonePlugin(),
        new Asyncplugin(),
        new FileListplugin({
            filename: 'list.md',
        }),
        // new InlineSourceplugin({
        //     match: /\.(css)$/
        // }),

        new happypack({
            id: 'js',
            use: [{
                loader: 'babelLoader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ],
                    plugins: [
                        '@babel/plugin-transform-runtime'
                    ]
                }
            }],
        }),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'mainfast.json')
        })
    ]
}




// webpack 默认0 配置，找的node_modules 下面的webpack-cli 配置