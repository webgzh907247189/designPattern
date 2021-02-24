const { counter, add } = require('./a')
console.log(counter)  // 0
add();
console.log(counter) // 0


/**
 * CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
 */