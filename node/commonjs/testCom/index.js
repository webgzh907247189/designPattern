const a = require('./a');
console.log('in main, a.a1 = %j, a.a2 = %j', a.a1, a.a2);



/**
 * CommonJS 模块加载过程是同步阻塞性地加载，
 * 在模块代码被运行前就已经写入了 cache，同一个模块被多次 require 时只会执行一次，重复的 require 得到的是相同的 exports 引用。
 */

 /**
  * 在模块 a 代码执行之前就已经创建了 Module 实例写入了缓存，此时代码还没执行，exports 是个空对象。
  * 代码 exports.a1 = true; 修改了 module.exports 上的 a1 为 true, 这时候 a2 代码还没执行。
  * 
  * 
  * 进入b模块，require a.js 时发现缓存上已经存在了，获取 a 模块上的 exports 。打印 a1, a2 分别是true，和 undefined。
  * 运行完 b 模块，继续执行 a 模块剩余的代码，exports.a2 = true; 又往 exports 对象上增加了a2属性，此时 module a 的 export对象 a1, a2 均为 true。
  * 
  * 再回到 main 模块，由于 require('./a.js') 得到的是 module a export 对象的引用，这时候打印 a1, a2 就都为 true。
  */

  

// in b, a.a1 = true, a.a2 = undefined
// in a, b.done = "??"
// in main, a.a1 = true, a.a2 = true