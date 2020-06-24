// https://mp.weixin.qq.com/s/mbEb2fCCqVEXJCtX_5_8bg

// commonjs


// es module

/**
 * CommonJS 可以在运行时使用变量进行 require, 例如 require(path.join('xxxx', 'xxx.js'))，
 * 静态 import 语法（还有动态 import，返回 Promise）不行，因为 ES6 模块会先解析所有模块再执行代码。
 * 
 * 
 * require 会将完整的 exports 对象引入，import 可以只 import 部分必要的内容，
 * 这也是为什么使用 Tree Shaking 时必须使用 ES6 模块 的写法。import 另一个模块没有 export 的变量
 * 在代码执行前就会报错，而 CommonJS 是在模块运行时才报错。
 * 
 * 
 * ES6 模块和 CommonJS 模块有很大差异，不能直接混着写。
 * 这和开发中表现是不一样的，原因是开发中写的 ES6 模块最终都会被打包工具处理成 CommonJS 模块，
 * 以便兼容更多环境，同时也能和当前社区普通的 CommonJS 模块融合。
 */


 /**
  * 具处理 ES6 模块的时候，常看到打包之后出现 __esModule 属性，字面意思就是将其标记为 ES6 Module。
  * 这个变量存在的作用是为了方便在引用模块的时候加以处理。
  * 
  * 
  * CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
  * CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
  */