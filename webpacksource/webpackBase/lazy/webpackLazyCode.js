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
 * 
 * 
 * 
 * https://juejin.cn/post/6844904201089204232
 * webpack 打包分析
 * 
 * n最主要的原因是处理 esModule的default + common引入common，没有default的问题，esModule引入esModule，default在各自模块内部处理，使用的时候直接 moduleName.default就可以了。
 * common引入esModule和es引入es一样。
 * 只有es引入common,commonJs中是没有default的，但是在es中使用import的变量时，我们会默认为它就是 default，所以才用 .n处理了一下
 * 
 * require.e
 * 1. 传入一个chunkId,在installedChunks中找到当前模块的状态
 * 2. 如果状态是0，说明模块已经加载成功，直接让promise成功
 * 3. 如果状态不是0
 *      状态是个promise，则说明模块正在加载中
 *      如果是undefined，则表示模块未加载，此时创建一个promise，放入promises队列中，并将生成的promise作为installedChunkData的第三项，此时installedChunkData存放的是[reslove, reject, promise]
 * 
 * 4. 创建script标签，去请求文件（Jsonp）
 * 5. 返回promise
 * 
 * 
 * 
 * 首先触发 去远程下载的逻辑， 这个远程下载之前有一个promise 数组，里面放一个promise
 * 远程下载完成之后，出发了 push 的逻辑， push里面把 promise 变成 resolve 状态
 * 触发 then() 的逻辑
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

// 已经安装过的代码块， 0 表示已经加载完成  undefined，未加载   promise 加载中  null 预加载
var installedChunks = { main: 0 }
require.f.j = function (chunkId, promisesList) {
    var installedChunkData;
    var promise = new Promise((resolve, reject) => {
        debugger
        installedChunkData = installedChunks[chunkId] = [resolve, reject] // installedChunkData是一个数组，第一个是成功的回调，第二个是的回调
    })

    // 将新生成的promise放入promises队列中，并将新生成的promise当作installedChunkData数组的第三个参数
    installedChunkData[2] = promise
    promisesList.push(promise);

    var url = require.p + require.u(chunkId)
    require.l(url)
}


// 此处的 promises 全部成功，进入到 then 的执行逻辑
// 所以 while 里面的 resolve() 执行完成就会进入 then
require.e = function (chunkId) {
    let promises = []
    var installedChunkData = installedChunks[chunkId]
    // 表示没有加载过
    if(installedChunkData !== 0){
        // 正在加载的情况
        if(installedChunkData){
            promises.push(installedChunkData[2])
        }else{
            require.f.j(chunkId, promises)
        }
    }
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
