import minimist from 'minimist'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import esbuild from 'esbuild'
import { createRequire } from 'module'

const args = minimist(process.argv.slice(2))

// 没传递参数就 挂载在 _ 上面， 传递了参数就 挂载在 传递的参数上
const target = args._[0] || 'reactivity' //打包的项目
const format = args.f || 'iife' // 打包后的模块规范


// node esm 模式 __dirname 是不存在的
// const entry = resolve(__dirname)

// file 协议的绝对路径 fileEntry -> file:///Users/xxx/Documents/learn/vue3-learn/scripts/dev.js
// __filename -> /Users/jonas.ge/Documents/learn/vue3-learn/scripts/dev.js
// __dirname -> /Users/jonas.ge/Documents/learn/vue3-learn/scripts
const fileEntry = import.meta.url
const __filename = fileURLToPath(fileEntry)
const __dirname = dirname(__filename)


const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)
// console.log(import.meta.url, __filename, __dirname, entry)

const require = createRequire(import.meta.url)
const pkg = require(`../packages/${target}/package.json`)

console.log( pkg, ' pkg.buildOptions?.name');

esbuild.context({
    entryPoints: [entry], // 入口
    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`), // 出口
    bundle: true, // 目标包的依赖 也会打包到 一起
    platform: "browser", // 打包后给浏览器 使用
    sourcemap: true, // 可以挑事源代码
    format, // iife 需要用一个变量接收一下 (function(){ xxx })(), 否则外界 拿不到必包内部的变量 -> package.json 里面的 buildOptions.name
    globalName: pkg.buildOptions?.name,
}).then((ctx) => {
    console.log('start dev~')

    // 监控入口文件进行持续的打包处理
    return ctx.watch();
})