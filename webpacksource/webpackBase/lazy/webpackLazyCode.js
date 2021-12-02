/**
 * require.e     ensure  保证 加载一个额外的模块
 * require.f.j   jsonp   使用 jsonp 加载 额外的代码块
 * requeire.l    load    加载
 * 
 * 默认情况来说   一个入口可以形成一个代码块
 * 切分代码块的几种方法: 1. 拆分多入口 2. import() 3. cacheGroups
 * 
 * 异步加载的基本流程
 * 1. 点击按钮
 * 2. 加载包含额外代码块的模块定义的js文件
 * 3. js文件加载回来后 js脚本会执行
 * 4，把新的模块定义合并到老的模块定义上面
 * 5. 走正常的加载逻辑，加载新的模块，让 Promise resolve
 */


// 放置着所有的模块定义 key模块ID 值是模块的定义
var modules = {}
// 已经加载的模块的缓存
var cache = {}
function require(moduleId) {
    debugger
    if(cache[moduleId]){
        return cache[moduleId]
    }
    var module = cache[moduleId] = { exports: {} }
    // 执行 模块定义的方法， 给 module.exports赋值， 导出的对象就是  module.exports
    modules[moduleId](module, module.exports, require)
    return module.exports
}
require.m = modules // 模块定义
require.c = cache // 模块的缓存

require.f = {}
require.p = '' // 地址
require.u = function (chunkId) {
    return '' + chunkId + '_main.js'
}
require.l = function(url) {
    let script = document.createElement('script');
    script.src = url
    document.head.appendChild(script)
}

// 已经安装过的代码块， 0 表示已经加载完成
var installedChunks = { main: 0 }
require.f.j = function (chunkId, promisesList) {
    var installedChunkData;
    var promise = new Promise((resolve, reject) => {
        debugger
        installedChunkData = installedChunks[chunkId] = [resolve, reject]
    })
    installedChunkData[2] = promise
    promisesList.push(promise);

    var url = require.p + require.u(chunkId)
    require.l(url)
}


// 此处的 promises 全部成功，进入到 then 的执行逻辑
// 所以 while 里面的 resolve() 执行完成就会进入 then
require.e = function (chunkId) {
    let promises = []
    require.f.j(chunkId, promises)
    return Promise.all(promises)
}


var chunkLoadingGlobal = window["webpackJsonp"] = []
var webpackJsonpCallback = function ([chunkIds, moreModules]) {
    debugger
    var moduleId,chunkId, i = 0,resolves = []
    for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i]
        resolves.push(installedChunks[chunkId][0]) // 把 promise 的resolve取出来，放到 resolves 数组中
        debugger
        installedChunks[chunkId] = 0 // 表示加载完成
        debugger
    }

    for (const moduleId in moreModules) {
        require.m[moduleId] = moreModules[moduleId]
    }

    while(resolves.length){
        debugger
        resolves.shift()(); // 执行 resolve 方法
    }
}
chunkLoadingGlobal.push = webpackJsonpCallback;

// 标记 esmodule 标示
require.r = function (exports) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module'})
    Object.defineProperty(exports, '__esmodule', { value: true})
}

require.d = function(exports, name, getter) {
    Object.defineProperty(exports, name, { enumerable: true, get: getter });
};


var app = document.getElementById('app');
app.addEventListener('click', function () {
    debugger
    require.e(/*! import() */ 0).then(require.bind(null, /*! ./aa */ "./src/aa.js")).then(function (data) {
    console.log(data, '???????');
  });
});
