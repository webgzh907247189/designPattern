


let path = require('path')
let fs = require('fs')
let { runLoaders } = require('../loader-runner')

let loaders = ['pitchloader1', 'pitchloader2']

let loadDir = path.resolve(__dirname, './')
let resolveLoader = loader => path.resolve(loadDir, loader)
loaders = loaders.map(resolveLoader)

runLoaders({
    resource: path.resolve(__dirname, '../test.js'), // 加载资源的绝对路径
    loaders, // loaders 的 数组， 也是 绝对路径的 数组
    readResource: fs.readFile, // fs.readFile 读取文件
}, (err, result) => {
    console.log(err, result, 'err, result')
})

