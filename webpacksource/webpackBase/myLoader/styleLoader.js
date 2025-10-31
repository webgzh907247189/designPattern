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

// style-loader 。
// require(!!css-loader!less-loader!./index.less)

// 因为 css-loader 返回的是 "module.exports = 'xxx'" 字符串
// 此时被 styleLoader.pitch 劫持了，并且被赋值 style.innerHTML = require("module.exports = 'xxx'" )


// Pitching Loader 返回非 undefined 值时，就会实现熔断效果

/**
 * @remainingRequest 剩余请求
 * @precedingRequest 前置请求
 * @data 数据对象    pitch 函数中往 data 对象上添加数据，之后在 normal 函数中通过 this.data 的方式读取已添加的数据。
 */
styleLoader.pitch = function(remainingRequest, precedingRequest, data){
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



// https://blog.csdn.net/lcl130/article/details/125214788
// https://mp.weixin.qq.com/s/Z79QhAlP8tBQn3mXQ11byQ
// https://www.jianshu.com/p/f47556e726de
// https://www.cnblogs.com/skychx/p/webpack-hash-chunkhash-contenthash.html
// https://juejin.cn/post/6844903806090608647#heading-19
// https://juejin.cn/post/6844904182915432455#heading-8
// https://juejin.cn/post/7033301123440050190
// https://zhuanlan.zhihu.com/p/106796295
// https://zhuanlan.zhihu.com/p/104205895
