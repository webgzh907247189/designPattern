const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: '../../src/index.js',
    output: {
        filename: 'chunk.js',
        path: path.resolve(__dirname, '../../dist')
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