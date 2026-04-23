const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

const { VueLoaderPlugin } = require('./cus-vue-loader');
module.exports = {
    mode: 'development',
    entry: './main.js',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                // use: 'vue-loader',
                use: path.resolve(__dirname, 'cus-vue-loader')
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                // use: 'vue-loader',
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true,
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
        })
    ],
}