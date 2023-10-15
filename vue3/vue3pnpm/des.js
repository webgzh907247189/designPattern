// https://zhuanlan.zhihu.com/p/422740629


npm install pnpm -g


// 使用 pnpm 初始化 项目
pnpm init -y


使用 pnpm-workspace.yaml
使用 pnpm i  xxx  -w 代表安装在根目录  (-w 代表的含义是  workspace-root)

// --filter 后面跟 子包的名字
pnpm i  @babel/core cus-utils --filter remove-console

====
// 安装 @vue/shared 在 reactivity 目录下
// -r 递归的意思
pnpm i @vue/shared  --filter reactivity
// pnpm i @vue/shared  --filter @vue/reactivity

安装当前目录的 @vue/shared  在  reactivity 包里面
npm install @vue/shared@workspace  --filter reactivity

// 在 xx 目录启动 server命令
-C xx server 



vite prod rollup, dev 用的 esbuild


打包的格式有哪些
node 中的 cjs
es6  esm-bundler    esm-browser
global iife (umd 格式暂时去除了)