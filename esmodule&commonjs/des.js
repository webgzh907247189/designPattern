/**
 * https://es6.ruanyifeng.com/#docs/module-loader
 * 
 * CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
 * 
 * es6的加载
 * 加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。
 * 
 * 
 * 
 * 本质上，export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。
 * import { default as foo } from 'modules'; === import foo from 'modules';
 * 
 * 
 * 
 * 代码说明，ES6 模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。
 * ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块
 * 
 * 
 * 
 * ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异。
 * ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块，这是两者的一个重大差异。
 * 
 * 
 * package.json 的 type
 * 它决定当前 package.json 层级目录内文件遵循哪种规范，包含两种值，默认为 commonjs。
 * commonjs: js 和 cjs 文件遵循 CommonJS 规范，mjs 文件遵循 ESM 规范
 * module: js 和 mjs 文件遵循 ESM 规范，cjs 文件遵循 CommonJS 规范
 * 
 * exports 一旦被指定，只能引用 exports 中显示导出的文件
 * 
 * 
 * 增加 exports 映射是一个不兼容变更。
 * 默认情况下，开发者是可以访问到依赖包里的任何文件，包括那么包开发者原本只是期望内部使用的。
 * exports 映射确保了开发者只能引用到明确的入口文件
 * 
 * 
 * 
 * ES6 模块加载 CommonJS 模块
 * ES6 模块的import命令可以加载 CommonJS 模块，但是只能整体加载，不能只加载单一的输出项。
 * 因为 ES6 模块需要支持静态代码分析，而 CommonJS 模块的输出接口是module.exports，是一个对象，无法被静态分析，所以只能整体加载。(测试 qs 这个包 实际情况不一样,需要vite 测试一下 ？？？)
 * 
 * 
 * 
 * CommonJS 模块加载 ES6 模块
 * CommonJS 的require()命令不能加载 ES6 模块，会报错，只能使用import()这个方法加载。
 * require()不支持 ES6 模块的一个原因是，它是同步加载，而 ES6 模块内部可以使用顶层await命令，导致无法被同步加载
 */