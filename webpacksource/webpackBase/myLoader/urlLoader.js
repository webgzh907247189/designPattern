const babelCore = require('@babel/core');
const loadUtils = require('loader-utils');
const mime = require('mime');

function urlLoader(source){
    const { limit } = loadUtils.getOptions(this);

    if(limit && limit >= source.length){
        // console.log(mime.getType);
        return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
    }else{
        return require('./fileLoader').call(this, source)
    }
}

// 使用二进制处理数据
// 默认情况下，loader 得到的是一个字符串， 声明 raw true，告诉webpack 不要把原文件内容转成字符串
urlLoader.raw = true;

module.exports = urlLoader;