const path = require('path');
const HtmlWebpackplugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCssAssetsWebpackplugin = require('optimize-css-assets-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // 当前工作目录
    context: process.cwd(),
    mode: 'development',
    devtool: false,
    entry: './src/lazy.js',
    output: {
        path: path.resolve(__dirname, 'distlazy'),
        filename: 'main.[hash:5].js',
    },
    optimization: {
        minimizer: [
            // 压缩了css 导体 webpack默认的js 没有压缩，所以需要手动在压缩一次
            new optimizeCssAssetsWebpackplugin(),

            // new TerserPlugin({}),
            new uglifyjsWebpackPlugin({
                cache: true,
                parallel: true,
            }),
        ],
    },
    resolve: {
    },
    // 专门解析 loader
    resolveLoader: {
        alias: {
            loader1: path.resolve(__dirname, 'myLoader/index'),
            babelLoader: path.resolve(__dirname, 'myLoader/babelLoader'),
            bannerLoader: path.resolve(__dirname, 'myLoader/bannerLoader'),
            myUrlLoader: path.resolve(__dirname, 'myLoader/urlLoader'),
        },
    },
    module: {
        // https://zhuanlan.zhihu.com/p/55682789
        // 文件中没有任何导入就可以使用noParse，noParse对于loader,plugin等等都没有任何影响
        // 一旦文件noParse了，那么externals也将不起作用了。

        // noParse: /lodash|jquery/, 使用 noParse进行忽略的 模块文件里面不能使用 import require
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
    // 'source-map' 生成单独的 source-map 文件
    // 'eval-source-map' 不产生单独的 source-map 文件，但是可以显示 行列
    devtool: 'source-map',
    externals: {
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
       
        
        // 忽略打包
        new webpack.IgnorePlugin(/\.\/locale/,/moment/),
    ]
}




// webpack 默认0 配置，找的node_modules 下面的webpack-cli 配置