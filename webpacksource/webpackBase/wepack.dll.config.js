const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        vuedll: ['vue']
    },
    output: {
        filename: '_dll_[name].js', // 产生的文件名
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]', // 产生的文件 导出的全局变量名字
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', 'mainfast.json'),
        })
    ]
}