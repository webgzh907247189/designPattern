const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode:'development',
    entry: './src/index.js',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3001,
    },
    devtool: 'eval',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html'
        })
    ],
}