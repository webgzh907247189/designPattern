const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: '../../src/index.js',
    target: ['web', 'es5'],
    output: {
        chunkFilename: 'chunk.[fullhash].js',
        path: path.resolve(__dirname, '../../dist')
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new UglifyJsPlugin({
            sourceMap: true,
            parallel: true,
        }),
        new HtmlWebpackPlugin({
			filename: 'index.html',
			template: '../../index.html'
		}),
    ]
}