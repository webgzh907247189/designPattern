const path = require('path')
const HtmlWebPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index:  path.resolve(__dirname, '../indexServerWork.js'),
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: 'js/[name].bundle.js',
        publicPath: '/',
        chunkFilename: 'js/[name].chunk.js'
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebPlugin({
            filename: 'index.html',
            template: './index.html', //允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
            inject: true,
            minify: {
                collapseInlineTagWhitespace: false,
                collapseWhitespace: true  //压缩html模板(生产)
            }
        })
    ],
    devServer: {
        host: 'localhost',
        port: 8000,
        hot: true,
        historyApiFallback: true,
        inline: true,
        disableHostCheck: true,
        proxy: {
            '/api/*': {
                target: `http://localhost:3000`
            }
        } 
    }
}