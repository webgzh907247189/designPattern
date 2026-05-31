let path = require('path')
let fs = require('fs')
let { runLoaders } = require('loader-runner')

let loadDir = path.resolve(__dirname, './')
let request = 'inline-loader1!inline-loader2!./index.js'

let inlineLoaders = request.split('!') // ['inline-loader1', 'inline-loader2', './index.js']
let resource = inlineLoaders.pop() //  './index.js'


let resolveLoader = loader => path.resolve(loadDir, loader)
inlineLoaders = inlineLoaders.map(resolveLoader)


console.log(resource, inlineLoaders ,'inlineLoaders')
let rules = [
    {
        enforce: 'pre',
        test: /\.js$/,
        use: ['pre-loader1', 'pre-loader2']
    },
    {
        test: /\.js$/,
        use: ['normal-loader1', 'normal-loader2']
    },
    {
        enforce: 'post',
        test: /\.js$/,
        use: ['post-loader1', 'post-loader2']
    }
]


let preLoaders = []
let postLoaders = []
let normalLoaders = []

for (let index = 0; index < rules.length; index++) {
    const rule = rules[index];
    if(rule.test.test(resource)){
        if(rule.enforce === 'pre'){
            preLoaders.push(...rule.use)
        }else if(rule.enforce === 'post'){
            postLoaders.push(...rule.use)
        }else{
            normalLoaders.push(...rule.use)
        }
    }
}

preLoaders = preLoaders.map(resolveLoader)
postLoaders = postLoaders.map(resolveLoader)
normalLoaders = normalLoaders.map(resolveLoader)


// 合并 loader 注意 loader 顺序
// post + inline + normal + pre
let loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders]
runLoaders({
    resource: path.join(__dirname, resource), // 加载资源的绝对路径
    loaders, // loaders 的 数组， 也是 绝对路径的 数组
    readResource: fs.readFile, // fs.readFile 读取文件
}, (err, result) => {
    console.log(err, result, 'err, result')
})
