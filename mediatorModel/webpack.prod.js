const webpack = require('webpack');
const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')


module.exports = {
    entry: {
        common: 'babel-polyfill',
        index: './index1.js',
        test: './test.js'
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.[chunkHash].js', //https://github.com/zhenyong/Blog/issues/1
        publicPath: '/',
        chunkFilename: 'js/[name].[chunkHash].js'
    },
    devtool: 'nosources-source-map', //('inline-source-map') 里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
    resolve:{
        extensions: ['.js','.web.js','.jsx','.json', '.scss'],  //默认解析扩展路径
        alias: {
            style: __dirname + '/src/style/',
            component: __dirname + '/src/component/'
        },
        mainFiles: ['index','index.web'], //解析目录时要使用的文件名
        modules: [path.resolve(__dirname, "src"), "node_modules"], //如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
        mainFields: ["browser","main","jsnext:main","module"]  //webpack先使用jsnext:main字段，在没有时使用main字段。这样就可以优化支持tree-shaking的库
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'         //'babel-loader?cacheDirectory'   babel的缓存编译结果
            }
        ]
    },
    externals: {
        jquery: "window.jQuery" //如果要全局引用jQuery，不管你的jQuery有没有支持模块化，用externals就对了。
    },
    plugins: [
        new webpack.DefinePlugin({   //可在production环境下帮助删除重复或相似文件，可以有效减少文件大小（用于打包文件优化，建议使用在生产环境）
            "process.env":{
                NODE_ENV:JSON.stringify('production')
            }
        }),
        new webpack.ProgressPlugin(function(percentage, msg) {
            let percent = Math.floor(percentage * 100) + '%'
            process.stdout.write(percent+'\r')  // 实时更新编译进度?\r (\r表示return，光标回到当前行首。所以能实现单行刷新的进度条效果。)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                // properties: false,  /* 兼容IE8 */
                // warnings: false,   // 在UglifyJs删除没有用到的代码时不输出警告
                // reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
                // drop_console: true // 删除所有的 `console` 语句  还可以兼容ie浏览器
            },
            mangle: {
                // screw_ie8: false,    /* 兼容IE8(把支持IE8的代码clear掉) */
                // keep_fnames: true
            },
            output: {
                // quote_keys: true,   /* 兼容IE8 */
                // comments: false,   // 删除所有的注释
                // beautify: false    // 最紧凑的输出(是否 最紧凑的输出  ->  美化输出)
            },
            // sourceMap: false  //生成SourceMap文件，会导致编译过程变慢，默认true (将错误信息的位置映射到模块)
        }),
        new HtmlWebPlugin({
            filename: 'detail.html',
            template: './index.html',
            inject: 'body',  // body等同true的效果   (所有JavaScript资源插入到body元素的底部)
            minify: {
                collapseInlineTagWhitespace: false,
                removeComments:true, //移除HTML中的注释
                collapseWhitespace: true  //压缩html模板(生产)
            },
            inlineSource: 'runtime.bundle.[a-z0-9]{20}.js$'
        })
    ]
}