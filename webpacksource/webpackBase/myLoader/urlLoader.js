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
urlLoader.raw = true;

module.exports = urlLoader;