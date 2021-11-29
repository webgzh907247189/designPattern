const { runLoaders } = require('./loader-runner');
const path = require('path');
const fs = require('fs');
// const entryFile = path.resolve(__dirname, 'src/index.js')

const entryFile = './index.js';
let request = `inline-loader1!inline-loader2!${entryFile}`
let rules = [
    {
        test: /\.js$/,
        use: ['normal-loader1', 'normal-loader2']
    },
    {
        test: /\.js$/,
        enforce: 'post',
        use: ['post-loader1', 'post-loader2']
    },
    {
        test: /\.js$/,
        enforce: 'pre',
        use: ['pre-loader1', 'pre-loader2']
    },
]

let parts = request.replace(/^-?!+/, '').split('!')
let resource = parts.pop(); // 弹出最后一个元素 entryFile = src/index.js

let inlineLoaders = parts;
let preloaders = [], postloaders = [], normalloaders = [];

for (let index = 0; index < rules.length; index++) {
    const rule = rules[index];
    if(rule.test.test(resource)){
        if(rule.enforce === 'pre'){
            preloaders.push(...rule.use)
        }else if(rule.enforce === 'post'){
            postloaders.push(...rule.use)
        }else {
            normalloaders.push(...rule.use)
        }
    }
}
// console.log(inlineLoaders, preloaders, 'resource', postloaders , normalloaders);

let loaders = [...postloaders, ...inlineLoaders, ...normalloaders, ...preloaders]
let resolveLoader = loader => path.resolve(__dirname, 'testLoader', loader)

loaders = loaders.map(resolveLoader)

runLoaders({
    resource,
    loaders,
    context: { name: 'test' }, // 上下文
    readResource: fs.readFile.bind(this),
}, (err, result) => {
    console.log(err)
    console.log(result) // 运行的结果
    // console.log(result.resouceBuffer.toString('utf8')) // 原始文件
})


// post1 -- picth
// post2 -- picth
// inline1 -- picth
// inline2 -- picth
// normal1 -- picth
// normal2 -- picth
// pre1 -- picth
// pre2 -- picth
// pre2
// pre1
// normal2
// normal1
// inline2
// inline1
// post2
// post1
// null


// {
//     result: //pre2//pre1//normal2//normal1//inline2//inline1//post2//post1,
//     resourceBuffer: <Buffer e9 9d a2 e8 af 95 ef bc 9a 0a 31 2e 20 77 65 62 57 6f 72 6b 65 72 20 e4 bd bf e7 94 a8 20 2d 3e 20 73 65 6c 66 2e 63 6c 6f 73 65 28 29 20 e6 88 96 e8 ... 4624 more bytes>,
//     cacheable: true,
//     fileDependencies: [ './index.js' ],
//     contextDependencies: []
// }




// {
//     result: 'undefined//pre2//pre1//normal2//normal1//inline2//inline1//post2//post1',
//     resourceBuffer: undefined
// }