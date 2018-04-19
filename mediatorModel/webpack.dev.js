const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')
const babelPolyfill = require('babel-polyfill')
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin')


let childProcess = require('child_process')
let devPort = '8000'

const commonDevModules = [
    'babel-polyfill',
    `webpack-dev-server/client?http://localhost:${devPort}`,
    'webpack/hot/only-dev-server'
]

module.exports = {
    entry: {
        common: commonDevModules,
        index: './index1.js',
        test: './test.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/',
        chunkFilename: 'js/[name].chunk.js'
    },
    devtool: 'inline-source-map', //里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
    resolve:{
        extensions: ['.js','.web.js','.jsx','.json', '.scss'],
        alias: {
            style: __dirname + '/src/style/',
            component: __dirname + '/src/component/',
            util: __dirname + '/src/util/'
        },
        mainFiles: ['index','index.web'], //解析目录时要使用的文件名
        modules: [path.resolve(__dirname, "src"), "node_modules"], //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
        mainFields: ["browser","main","jsnext:main", "module"]
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    externals: {
        jquery: "window.jQuery" //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),

        new openBrowserWebpackPlugin({
            url: `http://localhost:${devPort}`
        }),
        new webpack.ProgressPlugin(function(percentage, msg) {
            let percent = Math.floor(percentage * 100) + '%'
            process.stdout.write(percent+'\r')  // 实时更新编译进度?\r) (\r表示return，光标回到当前行首。所以能实现单行刷新的进度条效果。)
        }),
        new HtmlWebPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true,
            minify: {
                collapseInlineTagWhitespace: false,
                collapseWhitespace: true  //压缩html模板(生产)
            }
        })
    ],
    devServer: {
        host: 'localhost',
        port: devPort,
        hot: true,
        historyApiFallback: true,  //??     ??http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu
        // compress: true,

        inline: true,
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
        } 
    }
}