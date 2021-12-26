module.exports = {
    presets: [
        // { "modules": false } 告诉 babel 不要把 es module 的 import 和 export 转换掉
        ["@babel/preset-env", { 
            modules: false, 
            // useBuiltIns: 'usage',
            // debug: true,
            // corejs: 3, 
            // targets: {
            //     "browsers": [">0.25%", "not ie 11", "not op_mini all"]
            // },
        }],
        // ["@babel/preset-typescript"]
    ],
    // plugins: [
    //     ['@babel/plugin-transform-runtime', { useESModules: true}],
    // ],
    env: {
        test: {
            presets: [
                ["@babel/preset-env",{ "targets": {  "node": "current" } }],
                '@babel/preset-typescript',
            ],
        }
    }
}





// 1. 代码规范 lint + prettier 
// 2. ci 流水线 ci
// 3. 技术栈选型 vue2 vue3 ts 打包工具

// 4. utils 单元测试 选型 changelog 打包  