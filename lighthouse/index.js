/**
 * 生成站点报告
 * 
 * https://juejin.im/book/5b936540f265da0a9624b04b/section/5bb6218ee51d450e7762f873
 * 
 * 掘金小册 (前端性能优化原理与实践)
 */

// npm install -g lighthouse
// lighthouse https://juejin.im/books --view


let fs = require('fs')
fs.readdir('./',function(err,files){
    console.log(files)
})