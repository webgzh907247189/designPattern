const fs = require('fs');
const loadUtils = require('loader-utils');
const validateOptions = require('schema-utils');

module.exports = function(source){
    // 清除缓存 使用this.cacheable(false); 效果一样
    this.cacheable && this.cacheable();

    const options = loadUtils.getOptions(this);
    // console.log(options, 'options');

    let schema = {
        type: 'object',
        properties: {
            text: {
                type: 'string'
            },
            filename:  {
                type: 'string'
            },
        }
    }

    validateOptions(schema, options, 'banner-loader');

    // 异步 调用cb 代表完成
    let cb = this.async();
    if(options.filename){

        // 把 这个文件加到 watch 里面去, 添加文件依赖
        this.addDependency(options.filename)

        fs.readFile(options.filename, 'utf-8', (err, data)=> {
            // console.log(`/**${data}**/${source}`, 'data');
            cb(err, `/**${data}**/${source}`)
        })
    }else {

        // 就算 这里是 同步的， 此处也需要 使用异步的回调
        cb(err, `/**${options.text}**/${source}`)
    }
}