const webpack = require('webpack') //require('./source')
const webpackConfig = require('./webpack.config');

debugger
const compiler = webpack(webpackConfig)

compiler.run((err, stats) => {
    console.log(err)

    console.log(stats.toJson({
        entries: true,
        chunks: true,
        modules: true,
        _modules: true,
        assets: true,
    }))
})

// 比特，二进制
// 每个0或者1是一个bit，数据存贮最小单位
// 每8个位称为一个字节，网络传输最小单位
// buffer.length 返回的是  字节数