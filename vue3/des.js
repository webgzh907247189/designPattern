查看 vue-cli 版本   大于 @vue/cli 4.5.3 就可以选择 vue3
vue --version


npx tsc --init
生成一个 tsconfig.json

// rollup   打包工具   打包之后 只能是 esmoudle 语法
// rollup-plugin-typescript2 解析 ts 插件
// @rollup/plugin-node-resolve  解析 第三方模块
// @rollup/plugin-replace   替换插件
// rollup-plugin-serve  启动本地服务