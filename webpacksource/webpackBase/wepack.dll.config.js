const path = require('path');
const webpack = require('webpack');
const DllPlugin = require('./myPlugin/dll/dll')

module.exports = {
    mode: 'development',
    entry: {
        vuedll: ['isarray']
    },
    output: {
        filename: '_dll_[name].js', // 产生的文件名
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]', // 产生的文件 导出的全局变量名字
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', 'mainfast.json'),
        })
    ]
}