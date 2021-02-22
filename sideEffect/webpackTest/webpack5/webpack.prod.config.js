const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {strTest} = require('@webpackTest/commontest')

console.log(strTest) // commonTest
module.exports = {
    mode: 'production',
    entry: '../../src/index.js',
    target: ['web', 'es5'],
    output: {
        filename: 'chunk.[fullhash:5].js',
        path: path.resolve(__dirname, '../../dist')
    },
    optimization: {
        // usedExports: false
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/  }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
			filename: 'index.html',
			template: '../../index.html'
		}),
    ]
}