const babelCore = require('@babel/core');
const loadUtils = require('loader-utils');

function fileLoader(source){
    // loader 生成 filename

    // this ->  loaderContext loader上下文对象
    // 生成文件名
    const fileName = loadUtils.interpolateName(this, '[hash].[ext]', {
        content: source,
    });

    // 向输出目录写入文件
    this.emitFile(fileName, source)
    return `module.exports = "${fileName}"`;
}

// 使用二进制处理数据
// 默认情况下，loader 得到的是一个字符串， 声明 raw true，告诉webpack 不要把原文件内容转成字符串
fileLoader.raw = true;

module.exports = fileLoader;