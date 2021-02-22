const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: '../../src/index.js',
    output: {
        filename: 'chunk.js',
        path: path.resolve(__dirname, '../../dist')
    },
    target: ['web', 'es5'],
    resolve: {
        modules: [path.resolve(__dirname, "src/testModules"), "node_modules"],
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
			filename: 'index.html',
			template: '../../index.html'
		}),
    ],
    devtool: 'cheap-module-source-map',
}