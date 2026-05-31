const babylon = require('babylon')
const { Tapable } = require('tapable')

module.exports = class Parser extends Tapable{
    parse(source){
        return babylon.parse(source, {
            sourceType: 'module', // 原代码 是 一个 模块
            plugins: ['dynamicImport'],
        })
    }
}


