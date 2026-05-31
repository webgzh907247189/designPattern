const path = require('path')
const optimizeCssAssetsWebpackplugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

// 在Web环境中，如果使用loader加载ESM（ES module），那么这三个配置的加载顺序是browser→module→main
// 如果使用require加载CommonJS模块，则加载的顺序为main→module→browser。​(应该是module-> main)
module.exports = {
    target: 'web',
    mode: 'production', // development // production
    entry: './yalc/index',
    output: {
        path: path.join(__dirname, 'yalcdist'),
        filename: 'yalc.js'
    },
    resolve: {
        mainFields: ['module', 'main', 'browser', 'jsnext:main']
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    mangle: false,
                    // compress: {
                    //     arguments: false,
                    //     dead_code: true
                    // },
                    output: {
                        beautify: true, // 最紧凑的输出
                        comments: false, // 删除所有的注释
                    },
                },
                extractComments: false,
            }),
            // new UglifyJsPlugin({
            //     uglifyOptions: {
            //         mangle: false,
            //         output: {
            //             beautify: true, // 最紧凑的输出
            //             comments: false, // 删除所有的注释
            //         }
            //     },
            // })

            
        ],
        // minimize: true,
        usedExports: true,
        // providedExports: false,
        // concatenateModules: false, // https://zhuanlan.zhihu.com/p/260724544
        // sideEffects: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                modules: false,
                                targets: {
                                    "chrome": "90",
                                },
                                include: ['es.promise.finally'],
                                useBuiltIns: 'usage',
                                corejs: 3
                            }]
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime'
                        ]
                    }
                }],
                exclude: /node_modules/,
            },
        ]
    }
}

// https://segmentfault.com/a/1190000019438150
// 如果 npm 包导出的是 ESM 规范的包，使用 module
// 如果 npm 包只在 web 端使用，并且严禁在 server 端使用，使用 browser。
// 如果 npm 包只在 server 端使用，使用 main ??
// 如果 npm 包在 web 端和 server 端都允许使用，使用 browser 和 main ?
// 其他更加复杂的情况，如npm 包需要提供 commonJS 与 ESM 等多个规范的多个代码文件，请参考上述使用场景或流程图


// 不加 mainFields 限制
// {
//     "main": "dist/utils.cjs.js",
//     "module": "dist/utils.esm.js",
//     "unpkg": "dist/utils.iife.js",
//     "browser": "dist/utils.umd.js",
//     "jsnext:main": "dist/utils.esm.js",
// }
// require 的语法
// target: 'web'  browser 优先  (删除browser ，用 module; 删除 module，用 main)    优先级  browser module main
// target: 'node' module 优先 ？？？ (删除 module，优先使用 main， 删除 main 和 module， 不会使用 browser)

// import 导入 的语法
// target: 'web'  browser 优先  (删除browser ，用 module; 删除 module，用 main)    优先级  browser module main
// target: 'node' module 优先 ？？？ (删除 module，优先使用 main， 删除 main 和 module， 不会使用 browser)




// 加 mainFields 限制 mainFields: ['module', 'browser', 'main', 'jsnext:main']
// {
//     "main": "dist/utils.cjs.js",
//     "module": "dist/utils.esm.js",
//     "unpkg": "dist/utils.iife.js",
//     "browser": "dist/utils.umd.js",
//     "jsnext:main": "dist/utils.esm.js",
// }
// require 导入 的语法
// target: 'web'  完全以 mainFields 优先级为准
// target: 'node' 完全以 mainFields 优先级为准

// import 导入 的语法
// target: 'web'  完全以 mainFields 优先级为准
// target: 'node' 完全以 mainFields 优先级为准





// webpack4 web 环境
// module 有 tree-shaking
// main 没有 tree-shaking
// browser 没有 tree-shaking









// tree-shaking
// https://www.cnblogs.com/jianjie/p/14551770.html

// https://github.com/webpack/changelog-v5#commonjs-tree-shaking
// webpack 实现 tree-shaking 采用了两种不同的方案
// 1. usedExports 标记某些函数是否被使用， 之后通过 terser 来进行优化
// 2. sideEffects 跳过整个模块/文件，查看该文件是否有副作用


// 在 usedExports 设置为 true时，会有一段注释 unused harmony export mul (在生产环境下，可以用 terser 进行优化)
// minimize 设置为 false，mul 函数没有被移除