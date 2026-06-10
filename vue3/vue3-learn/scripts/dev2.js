import { parseArgs } from 'util'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'
import esbuild from 'esbuild'


const require = createRequire(import.meta.url)
const __dirname = import.meta.dirname
// console.log('--', __dirname) // /Users/web/Documents/workspace/designPattern/vue3/vue3-learn/scripts


const { positionals, values: { format } } = parseArgs({
    allowPositionals: true,
    options: {
        farmat: {
            type: "string",
            short: "f",
            default: "esm"
        }
    }
})

// 没传递参数就 挂载在 _ 上面， 传递了参数就 挂载在 传递的参数上
const target = positionals[0] || 'reactivity' //打包的项目
const pkg = require(`../packages/${target}/package.json`)
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)

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