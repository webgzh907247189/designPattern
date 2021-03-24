const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        source: './index.js',
        src: './test.js',
        testVdom: './testVdom.js',
        testVnode: './testVnode.js',
    },
    output: {
        filename: 'chunk[contentHash:5].js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
    },
    // module: {
    //     rules: [
    //         // { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    //     ]
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
			filename: 'index.html',
            template: './index.html',
            // inject: true,
		}),
    ],
    devtool: 'cheap-module-source-map',
}