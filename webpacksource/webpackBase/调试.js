1. chrome 调试

node --inspect-brk ./node_modules/webpack-cli/bin/cli.js



2. lanuch.json
// {
//     // Use IntelliSense to learn about possible attributes.
//     // Hover to view descriptions of existing attributes.
//     // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
//     "version": "0.2.0",
//     "configurations": [ 
//         {
//             "type": "node",
//             "request": "launch",
//             "name": "vue-cli",
//             "skipFiles": [
//                 "<node_internals>/**"  // 忽略 node源码的
//             ],
//             "program": "${workspaceFolder}/node_modules/@vue/babel-preset-app/index.js"
//         }
//     ]
// }


3. 启动 webpack 调试
const webpack = require('webpack');
const options = require('./webpack.config.dev');
const compiler = webpack(options)

// 编译回掉函数
compiler.run((err, status) => {
    // status 包含很多信息
    console.log(status);
})