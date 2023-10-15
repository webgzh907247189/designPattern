查看 vue-cli 版本   大于 @vue/cli 4.5.3 就可以选择 vue3
vue --version


npx tsc --init
生成一个 tsconfig.json

// rollup   打包工具   打包之后 只能是 esmoudle 语法
// rollup-plugin-typescript2 解析 ts 插件
// @rollup/plugin-node-resolve  解析 第三方模块
// @rollup/plugin-replace   替换插件
// rollup-plugin-serve  启动本地服务


声明式 框架封装部分逻辑
命令式 管住过程

vue 
编译时， 把  模版变成 render 函数， render 函数执行返回 vnode
运行时， 把  vnode 变成真实 Dom




vue 中为了解耦， 将渲染拆分为2个模块 (使用了 渲染器)
1. 运行时(runtime-core) 不依赖 平台的(browser -> runtime-dom, 小程序, test -> runtime-test)， 使用的是 vnode
2. 针对不同的平台，vue 就是针对浏览器的