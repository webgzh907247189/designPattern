const qs = require('qs')

console.log(qs.parse('foo[bar]=baz'));


/**
 * is-promise 事件我们可以学到什么
 * https://juejin.cn/post/6844904163600498702
 * 
 * 
 * 
 * package.json 的 type
 * 它决定当前 package.json 层级目录内文件遵循哪种规范，包含两种值，默认为 commonjs。
 * commonjs: js 和 cjs 文件遵循 CommonJS 规范，mjs 文件遵循 ESM 规范
 * module: js 和 mjs 文件遵循 ESM 规范，cjs 文件遵循 CommonJS 规范
 * 
 * 
 *
 *  
 * package.json 的 exports (******* exports 字段是 main 的补充，支持定制不同运行环境、不同引入方式下的入口文件 ******* 在支持 exports 的 Node.js 版本中，exports 会覆盖 main.js ****)
 * exports 一旦被指定，只能引用 exports 中显示导出的文件
 * 通常，我们用 main 字段指定包的入口文件，但也仅限于指定唯一的入口文件。
 * exports 字段是 main 的补充，支持定制不同运行环境、不同引入方式下的入口文件
 * 
 * 
 * 值得注意的是，在支持 exports 的 Node.js 版本中，exports 会覆盖 main.js
 * exports 一旦被指定，只能引用 exports 中显示导出的文件。
 * 
 *  exports 和 main 字段不一样，不支持省略 "./" -> (main 可以省略)
 * 
 * 
 * 
 * https://github.com/ds300/patch-package/issues/250
 * npx patch-package qs --exclude '^$'
 */



 /**
  * 下面这样配置 报错 ???? 可以解决 参考 babel (babel 的引入 精确到文件进行引入，看 打包 之后的 chunk.js 引用都是 精确到文件的，不需要直接引入整个包 import xx from 'xx')
  package.json

  "exports": {
    "import": "./esm/index.js",
    "require": "./lib/index.js"
   }

   引入文件
   const qsUtils = require('qs/lib/utils')

   error
    Package subpath './lib/utils' is not defined by "exports" in xxx
  */
