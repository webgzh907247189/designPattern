let fs = require('fs');

function createLoaderobject(loader){
    let normal = require(loader)
    let pitch = normal.pitch

    // 决定loader 的参数是字符串 还是 buffer
    let raw = normal.raw

    return {
        path: loader, // 存放此 loader的 绝对路径
        normal,
        pitch,
        raw,
        data: {}, // 每个loader 都有自己的data， 可以定义在 pitch 里面，参考 styleLoader.js
        pitchExecuted: false, // 表示是否 执行 loader 的pitch 的方法了
        normalExecuted: false, // 表示是否 执行 loader 的 normal 的方法了
    }
}

function runLoaders(options, finallBack){
    // resource 资源，  loaders loader 组成的数组， context loader的上下文, readResource 读写文件的方法
    let { resource, loaders = [], context = {}, readResource = fs.readFile } = options 

    let loaderObjects = loaders.map(createLoaderobject)
    let loaderContext = context
    loaderContext.resource = resource // 要加载的资源
    loaderContext.readResource = readResource // 读取文件的方法
    loaderContext.loaderIndex = 0;
    loaderContext.callback = null; // 回掉
    loaderContext.async = null; // 异步变成同步
    loaderContext.loaders = loaderObjects

    // 所有的loader 加上 resource 拼接成的字符串
    Object.defineProperty(loaderContext, 'request', {
        get(){
            // loader1!loader2!loader3!index.js
            //  path: loader -> 存放此 loader的 绝对路径
            return loaderContext.loaders.map(loader => loader.path).concat(loaderContext.resource).join('!')
        }
    })

    // 剩余请求 从下一个开始算
    Object.defineProperty(loaderContext, 'remainingRequest', {
        get(){
            // !loader3!index.js
            //  path: loader -> 存放此 loader的 绝对路径
            return loaderContext.loaders.slice(loaderContext.loaderIndex + 1)
            .map(loader => loader.path).concat(loaderContext.resource).join('!')
        }
    })

    // 从当前的 loader 开始一直到结束， 加上要加载的资源
    Object.defineProperty(loaderContext, 'currentRequest', {
        get(){
            // loader2!loader3!index.js
            //  path: loader -> 存放此 loader的 绝对路径
            return loaderContext.loaders.slice(loaderContext.loaderIndex)
            .map(loader => loader.path).concat(loaderContext.resource).join('!')
        }
    })

    // 之前的 loader
    Object.defineProperty(loaderContext, 'previousRequest', {
        get(){
            // loader1!loader2!
            //  path: loader -> 存放此 loader的 绝对路径
            return loaderContext.loaders.slice(0, loaderContext.loaderIndex)
            .map(loader => loader.path).join('!') // ??.concat(loaderContext.resource)
        }
    })

    // data
    Object.defineProperty(loaderContext, 'data', {
        get(){
            // loader1!loader2!
            //  path: loader -> 存放此 loader的 绝对路径
            return loaderContext.loaders[loaderContext.loaderIndex].data;
        }
    })

    let processOptions = {
        resourceBuffer: null,
        readResource,
    }

    iteratePitchingLoaders(processOptions, loaderContext, (err, result) => {
        finallBack(err, {
            result,
            resourceBuffer: processOptions.resourceBuffer
        })
    })
}

exports.runLoaders = runLoaders;

function iteratePitchingLoaders(processOptions, loaderContext, pitchCb){
    // 所有loader 的pitch 都执行完了，
    if(loaderContext.loaderIndex >= loaderContext.loaders.length){
        return processResource(processOptions, loaderContext, pitchCb)
    }

    let currentLoader = loaderContext.loaders[loaderContext.loaderIndex]

    // 为 true， 当前 pitch已经执行过了，执行下一个 loader
    if(currentLoader.pitchExecuted){
        loaderContext.loaderIndex++
        return iteratePitchingLoaders(processOptions, loaderContext, pitchCb)
    }
    let fn = currentLoader.pitch
    currentLoader.pitchExecuted = true

    // 此 loader 没有 pitch 函数， 执行 下一个
    // 执行 106 行，执行 loaderContext.loaderIndex++    执行 下一个loader
    if(!fn){
        // 执行下一个 loader
        return iteratePitchingLoaders(processOptions, loaderContext, pitchCb)
    }

    // 以同步 或者 异步 执行 pitch
    // loader picth 三个参数 (remainingRequest, previousRequest, data)
    // 
    runSyncOrAsync(fn, loaderContext, [loaderContext.remainingRequest, loaderContext.previousRequest, loaderContext.data], (err, ...args) => {
        // pitch 有返回值，索引减少1， 并且执行前一个 loader 的 normal
        if(args.length >0 && args.some(item => item)){
            loaderContext.loaderIndex--
            return iterateNormalLoaders(processOptions, loaderContext, args, pitchCb)
        }else{
            // 递归向后执行
            return iteratePitchingLoaders(processOptions, loaderContext, pitchCb)
        }
    })
}

function runSyncOrAsync(fn, loaderContext, args, runCallback){
    let isSync = true // 默认是同步执行

    loaderContext.callback = (...args) => {
        runCallback(null, ...args)
    }

    loaderContext.async = () => {
        isSync = false // 异步执行
        // 此处的 loaderContext.callback 是 136行的 代码，调用 loaderContext.async()  相当于 调用 runCallback
        // 相当于 往下执行一次
        return loaderContext.callback
    }

    // loader 的 pitch 函数执行 的返回值
    let args1 = Buffer.isBuffer(args) ? args.toString() : args;

    // loader pitch 函数的 this 就是 loaderContext 在这里指定的
    let result = fn.apply(loaderContext, args1)

    // 同步向下执行 loader
    if(isSync){
        runCallback(null, result)
    }
    // 如果是异步，让用户手动调用 this.async -> loaderContext.async 完成调用 loaderContext.callback
}

// 处理资源
function processResource(processOptions, loaderContext, pitchCb){
    // console.log(loaderContext.resource, 'loaderContext.resource');

    processOptions.readResource(loaderContext.resource, (err, buffer) => {
        // resourceBuffer 存放的是 资源的 原始内容
        processOptions.resourceBuffer = buffer.toString()

        // 每个 loader 执行 2次 iteratePitchingLoaders， 越界了 先减1 减回来
        loaderContext.loaderIndex--

        // 执行normal loader
        iterateNormalLoaders(processOptions, loaderContext, [buffer.toString()], pitchCb)
    })
}

// ??? 调试一下
function iterateNormalLoaders(processOptions, loaderContext, args, pitchCb){
    if(loaderContext.loaderIndex < 0){
        return pitchCb(null, ...args)
    }

    let currentLoader = loaderContext.loaders[loaderContext.loaderIndex]
    if(currentLoader.normalExecuted){
        // ???/
        loaderContext.loaderIndex --;
        return iterateNormalLoaders(processOptions, loaderContext, args, pitchCb)
    }

    // ?????? 能拿到这个 normal
    let fn = currentLoader.normal
    currentLoader.normalExecuted = true
    convertArgs(args, currentLoader.raw)

    // pitch 和 normal 执行的 都是靠 runSyncOrAsync，this 都是指向 loaderContext
    runSyncOrAsync(fn, loaderContext, args, (err, ...returnArgs) => {
        if(err) return pitchCb(err)
        return iterateNormalLoaders(processOptions, loaderContext, returnArgs, pitchCb)
    })
}

// 判断是不是需要buffer
function convertArgs(args, raw){
    if(raw && !Buffer.isBuffer(args)){
        args[0] = Buffer.from(args[0]);
    } else if(!raw && Buffer.isBuffer(args)){
        args[0] = args[0].toString('utf8');
    }
}