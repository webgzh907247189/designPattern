const babelCore = require('@babel/core');
const loadUtils = require('loader-utils');

// 当 这个 loader 返回一个值的时候 直接 return
// 当 返回 多个值 使用 this.callback(null, arg1, arg2, arg3)
// 这里 当 this 指向 loader-runner (loaderContext)

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