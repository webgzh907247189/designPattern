const babelCore = require('@babel/core');
const loadUtils = require('loader-utils');

function fileLoader(source){
    // loader 生成 filename
    const fileName = loadUtils.interpolateName(this, '[hash].[ext]', {
        content: source,
    });

    this.emitFile(fileName, source)
    return `module.exports = "${fileName}"`;
}

// 使用二进制处理数据
fileLoader.raw = true;

module.exports = fileLoader;