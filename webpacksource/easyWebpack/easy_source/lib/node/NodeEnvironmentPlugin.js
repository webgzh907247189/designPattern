let fs = require('fs');

module.exports = class NodeEnvironmentPlugin{
    constructor(options){
        this.options = options
    }
    apply(compiler){
        compiler.inputFileSystem = fs // 读文件
        compiler.outputFileSystem = fs // 写文件
    }
}