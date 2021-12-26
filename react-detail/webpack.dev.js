const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin')
// const PreloadWebpackPlugin = require('preload-webpack-plugin');

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const setTitle = require('node-bash-title');
setTitle('webpack  Server');

let devPort = '8002'
const commonDevModules = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${devPort}`,
    'webpack/hot/only-dev-server'
]

module.exports = smp.wrap({
    entry: {
        common: commonDevModules,
        index: './index.tsx',
        vendor: ['react','react-dom']
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/',
        chunkFilename: 'js/[name].chunk.js'
    },
    devtool: 'inline-source-map', //里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
    resolve:{
        extensions: ['.js','.tsx','.ts','.web.tsx','.jsx','.json', '.scss'],
        alias: {
            style: __dirname + '/src/style/',
            component: __dirname + '/src/component/',
            util: __dirname + '/src/util/',
            'react-dom': '@hot-loader/react-dom',
            mobx: path.resolve('node_modules/mobx/lib/mobx.es6.js')
        },
        mainFiles: ['index','index.web'], //解析目录时要使用的文件名
        modules: [path.resolve(__dirname, "src"), "node_modules"], //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
        mainFields: ["browser","main","jsnext:main", "module"]
    },
    module: {
        rules: [
            {   
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['cache-loader','babel-loader','ts-loader']   //可优化，因为ts不走babel编译也可以 (抽离antd没用到的css)
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: ['cache-loader','babel-loader'],         //'babel-loader?cacheDirectory'   babel的缓存编译结果
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: true,
                            // if hmr does not work, this is a forceful method.
                            reloadAll: false,
                        }
                    },
                    // 'style-loader',  //  与MiniCssExtractPlugin.loader 冲突
                    // {
                    //     loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
                    // },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase: true,
                            minimize: true,
                            localIdentName: '[name]_[local]-[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
                include: [path.resolve('src')],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,                 //less-loader需要依赖less才能实现。如果用的npm3.0+，less是不会随着less-loader自动安装的，需要手动安装
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            hmr: true,
                            // if hmr does not work, this is a forceful method.
                            reloadAll: false,
                        }
                    },
                    // {
                    //     loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
                    // },
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase: true,
                            minimize: true,
                            localIdentName: '[name]_[local]-[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240,
                        name: './assets/imgs/[name].[hash].[ext]'
                    }
                }
            }
        ]
    },
    externals: {
        jquery: "window.jQuery" //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new webpack.BannerPlugin('react demo'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        // new ExtractTextPlugin('styles.css'),
        // extractCSS,
        // extractLESS,

        new openBrowserWebpackPlugin({
            url: `http://localhost:${devPort}`
        }),
        new webpack.ProgressPlugin(function(percentage, msg) {
            let percent = Math.floor(percentage * 100) + '%'
            process.stdout.write(percent+'\r')  // 实时更新编译进度?\r) (\r表示return，光标回到当前行首。所以能实现单行刷新的进度条效果。)
        }),
        new MiniCssExtractPlugin({
            filename: "style/[name].[hash:5].css",
            chunkFilename: "style/[id].[hash:5].css"
        }),
        new HtmlWebPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['common','index', 'appTest','vendor','runtime'],   //允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
            inject: true,
            minify: {
                collapseInlineTagWhitespace: false,
                collapseWhitespace: true  //压缩html模板(生产)
            }
        }),
        // new PreloadWebpackPlugin({
        //     rel: 'prefetch'
        // }),
        new DashboardPlugin(),
        new WebpackBuildNotifierPlugin({
            title: "Webpack Build",
            suppressSuccess: true
        })
    ],
    devServer: {
        host: 'localhost',
        port: devPort,
        hot: true,
        historyApiFallback: true,  //??     ??http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu
        inline: true,
        overlay: true,
        disableHostCheck: true,
        proxy: {
            /** 联调环境下 **/
            // '/api/*': {
            //     target: 'http://localhost:4000'
            // }

            /** 开发环境下 **/
            // '/api/*': {
            //     target: `http://localhost:${mockPort}`
            // }
        }, 

        // *表示任意文件名，**表示任意一层子目录
        // proxy: [{
        //     context: ['**', '!**/*.html', '!**/*.js', '!**/*.css'],
        //     target: 'http://localhost:7001'
        // }]

        before(app){
            app.get('/testApi',(req,res)=>{
                res.json({name: 'test'})
            })
        }
    }
})