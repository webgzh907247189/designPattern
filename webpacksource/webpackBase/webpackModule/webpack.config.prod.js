const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


// https://juejin.cn/post/6844904201089204232
// webpack 打包分析

// n最主要的原因是处理 esModule的default + common引入common，没有default的问题，esModule引入esModule，default在各自模块内部处理，使用的时候直接 moduleName.default就可以了。
// common引入esModule和es引入es一样。
// 只有es引入common,commonJs中是没有default的，但是在es中使用import的变量时，我们会默认为它就是 default，所以才用 .n处理了一下



/*
* mode & 1 value是模块ID直接用__webpack_require__加载
* mode & 2 把所有的属性合并到命名空间ns上
* mode & 4 已经是ns对象了，可以直接返回值
* mode & 8|1 行为类似于require
import('xxxx').then(r => r)之后一定是个es6模块，
进行互相组合
*/

/**
 * esmodule 和 cjs 的区别
 * esmodule 值的引用
 * cjs 是 值的拷贝
 * 
 * 
 * 看打包之后的结果， 针对 esmodule 的打包 获取值 都是通过 函数来获取，保证获取到最新的值
 *  (function(module, __webpack_exports__, __webpack_require__) {
 *      "use strict";
 *      __webpack_require__.r(__webpack_exports__);
 *      __webpack_require__.d(__webpack_exports__, "age", function() { return age; });
 *      __webpack_exports__["default"] = ('--name--');
 *      var age = '--age--';
 *  })
 * 
 */
module.exports = {
    // 当前工作目录
    context: process.cwd(),
    mode: 'none',
    devtool: false,
    entry: './ecsrc/eindex.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[hash:5].js',
        
        // 打包 库 的时候使用
        // libraryTarget: 'window', // 导出的方式
        // library: 'gzhtest', // 导出库的名字

        // commonjs2 与 commonjs 的区别，前者是整体导出(module.export)，后者是属性导出(export.xx=xx)
        // libraryExport: 'add' // 指定导出的是哪个子模块
    },
    module: {
        rules: [{
            oneOf: [
                
                
                {
                    test: /\.js$/,
                    use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime'
                            ]
                        }
                    },
                    ],
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
                    ]
                },
                {
                    test: /\.(png|jpeg)/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 1,
                            outputPath: '/img/', // 输出的目录
                            publicPath: '', // ??? 指定引入时的目录

                            // img、font中是没有chunkHash的，仍然需要用到hash
                            // name: './assets/imgs/[name].[contentHash].[ext]'
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
            ],
        }]
    },
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackplugin({
            template: '../index.html',

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
    ]
}