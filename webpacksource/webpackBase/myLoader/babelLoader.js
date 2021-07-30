const babelCore = require('@babel/core');
const loadUtils = require('loader-utils');

module.exports = function (source){
    const options = loadUtils.getOptions(this);
    // console.log(options, 'options');

    // 异步 调用cb 代表完成
    let cb = this.async();
    babelCore.transform(source, {
        ...options,
        sourceMap: true,
        filename: this.resourcePath.split('/').pop(),
    },function(err, result){
        cb(err, result.code, result.map)
    })
}