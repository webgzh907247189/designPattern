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


// Pitching Loader 返回非 undefined 值时，就会实现熔断效果

// stringifyRequest 把绝对路径转为相对路径
// 因为 webpack 打包的 结果 就是 已相对路径来打包的每个模块
// pitch 返回的 js 字符串 给了 webpack， webpack 把他 转为一个 抽象语法树
// 然后分析 里面的 require import
/**
 * @remainingRequest 剩余请求
 * @precedingRequest 前置请求
 * @data 数据对象    pitch 函数中往 data 对象上添加数据，之后在 normal 函数中通过 this.data 的方式读取已添加的数据。
 */
styleLoader.pitch = function(remainingRequest, precedingRequest, data){
    // 加上 !! 的原因是 防止 死循环， 加上 !! 只会走 inline-loader
    // 加上 !! !!less-loader!./index.less
    // 假设没有加上 !! ， !!less-loader!style-loader!less-loader!./index.less
    let str = `
        let style = document.createElement('style')
        style.innerHTML = require(${loadUtils.stringifyRequest(this, '!!' + remainingRequest)})

        document.head.appendChild(style);
    `
    return str;
}

module.exports = styleLoader;


// a -> b -> c
// remainingRequest  ->  /Users/fer/webpack-loader-demo/loaders/c-loader.js!/Users/fer/webpack-loader-demo/src/data.txt #剩余请求
// precedingRequest  ->  /Users/fer/webpack-loader-demo/loaders/a-loader.js #前置请求
// {} #空的数据对象
