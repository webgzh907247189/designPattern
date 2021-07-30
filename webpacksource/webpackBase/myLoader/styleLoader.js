const loadUtils = require('loader-utils');

const styleLoader = function(source){
    // style loader 导出一个 脚本

    let str = `
        let style = document.createElement('style')
        style.innerHTML = ${JSON.stringify(source)}

        document.head.appendChild(style);
    `
    return str;
}

// 在 styleLoader 上面添加 pitch 方法
// style-loader.pitch -> css-loader.pitch  ->  less-loader.pitch

// remainingRequest(剩余的请求) => css-loader!less-loader ./index.less 

// style-loader 
// require(!!css-loader!less-loader!./index.less)

// 因为 css-loader 返回的是 "module.exports = 'xxx'" 字符串
// 此时被 styleLoader.pitch 劫持了，并且被赋值 style.innerHTML = require("module.exports = 'xxx'" )


styleLoader.pitch = function(remainingRequest){
    let str = `
        let style = document.createElement('style')
        style.innerHTML = require(${loadUtils.stringifyRequest(this, '!!' + remainingRequest)})

        document.head.appendChild(style);
    `
    return str;
}

module.exports = styleLoader;