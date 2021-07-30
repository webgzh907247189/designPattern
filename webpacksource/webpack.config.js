const path = require('path');

module.exports = {
    // 当前工作目录
    context: process.cwd(),
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    }
}