/**
 * 
 * https://segmentfault.com/a/1190000016453875  (适配器)
 *
 * 
 * jQuery中就有很多适配器的例子，包括最基础的$('selector').on，这个不就是一个很明显的适配器
 */

// 一个简单的伪代码示例
function on (target,event, callback) {
  	if (target.addEventListener) {

    	// 标准的监听事件方式
    	target.addEventListener(event, callback)
  	} else if (target.attachEvent) {

    	// IE低版本的监听方式
    	target.attachEvent(event, callback)
  	} else {

    	// 一些低版本的浏览器监听事件方式
    	target[`on${event}`] = callback
  	}
}





/**
 * 	Node中的这样的例子更是常见，因为早年是没有Promise的，所以大多数的异步由callback来完成，且有一个约定好的规则，Error-first callback
 */
const fs = require('fs')
fs.readFile('test.txt', (err, data) => {
	if (err){
		// 处理异常
  	}

  	// 处理正确结果
})



 
function readFile (fileName) {
  	return new Promise((resolve, reject) => {
    	fs.readFile(fileName, (err, data) => {
      		if (err) reject(err)
      		resolve(data)
    	})
  	})
}
await readFile('test.txt')




/**
 * 适配器
 * 这种Error-first callback是一个约定好的形式，所以我们可以很轻松的实现一个通用的适配器
 */

function promisify(fn){
	return function(...args){
		return new Promise((resolve,reject) => {
			fn(...args,(err, data)=>{
				if (err) reject(err)
      			resolve(data)
			})
		})
	}
}
function a(b,cb){
	console.log('1111',b)  // 1111 test.txt
	return cb('',b)
}

var readFile = promisify(a)
readFile('test.txt').then((d)=>{
	console.log(d,'d') // test.txt d
})

// 1111 test.txt
// test.txt d