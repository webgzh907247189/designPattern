console.log(Object.prototype.toString.call(''))


// 对象自定义给 名字
var obj = {}
Object.defineProperty(obj, Symbol.toStringTag,{value: 'module1'})
console.log(Object.prototype.toString.call(obj))