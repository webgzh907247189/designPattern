const path = require('path');
const webpack = require('webpack')
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require("webpack-dashboard/plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const setTitle = require('node-bash-title');
setTitle('webpack  Server');

module.exports = smp.wrap({
    entry: './src/main.js',
    output: {
        filename: 'scripts/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.vue', '.js', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
        },
        modules: [path.resolve(__dirname,'node_modules')]    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [path.resolve('src')],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: ['cache-loader','babel-loader'],
                include: [path.resolve('src')],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    // 'style-loader',  //  与MiniCssExtractPlugin.loader 冲突
                    {
                        loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
                include: [path.resolve('src')],
                exclude: /node_modules/
            },
            {
				test: /\.scss$/,
				use: [{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					{
						loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
					},
					{
						loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
				],
				exclude: /node_modules/
			},
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: './assets/imgs/[name].[hash].[ext]'
                        },
                    }
                ],
                include: [path.resolve('src')],
                exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ],
                include: [path.resolve('src')],
                exclude: /node_modules/
            }
        ]
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
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), //  显示被替换模块的名称
        new WebpackDeepScopeAnalysisPlugin(),
        new MiniCssExtractPlugin({
            filename: "style/[name].[hash:5].css",
            chunkFilename: "style/[id].[hash:5].css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            loading: {
                html: 'hello'
            }
        }),
        new DashboardPlugin(),
        new WebpackBuildNotifierPlugin({
            title: "Webpack Build",
            suppressSuccess: true
        })
    ],
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        host: 'localhost',      // 默认是localhost
        port: '3001',             // 端口
        open: true,             // 自动打开浏览器
        hot: true,               // 开启热更新
        overlay: true,           // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        proxy: {
            /** 联调环境下 **/
            '/api/*': {
                target: 'http://localhost:4000'
            }

            /** 开发环境下 **/
            // '/api/*': {
            //     target: `http://localhost:${mockPort}`
            // }
        },
        before(app){
            app.get('/test',(req,res)=>{
                res.json({name: 'test'})
            })
        }
    }   
});