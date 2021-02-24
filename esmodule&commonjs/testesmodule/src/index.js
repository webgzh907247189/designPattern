
import { counter, add, testObj } from './util'

import { add as add1 } from './testModule';
// import add1 from './testModule';
console.log(add1, '??');


// 由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错
// export通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例



// counter += 1;  ->  报错
// 因为变量 counter 指向的地址是只读的，不能重新赋值，这就 报错


// es6的加载
// 加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了没法引用 ES6 模块本身，因为它不是对象。

/**
 * CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
 * 
 * 
 * 
 * 代码说明，ES6 模块输入的变量counter是活的，完全反应其所在模块lib.js内部的变化。
 * ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块
 */
console.log(counter) // 0 
add();
console.log(counter) // 1

// testObj = [];

