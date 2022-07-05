const babylon = require('babylon')
const { Tapable } = require('tapable')


module.exports = class Parser {
    constructor(){

    }

    parse(source){
        return babylon.parse(source, {
            sourceType: 'module', // 源代码是一个模块
            plugins: ['dynamicImport'], // 动态倒入
        })
    }
}