/**
 * https://juejin.im/post/5bc125505188255c6d0db0df?utm_source=gold_browser_extension
 * https://yq.aliyun.com/ziliao/116807
 * 
 * 通过剖析commonJs源码

 * 懂得了模块加载的整个流程

 * 第一步：解析出一个绝对路径
 * 第二步：如文件没添加后缀，则添加.js、.json、.node作为后缀，然后通过fs.existsSync来判断文件是否存在
 * 第三步：到缓存中找该模块是否被加载过
 * 第四步：new一个模块实例
 * 第五步：把模块存到缓存当中
 * 第六步：根据后缀名，加载这个模块

	知道如何实现由里到外一层层查找node_modules
	知道针对.js和.json是怎么解析的

	.js是通过拼接字符串，形成一个闭包形式的字符串
	.json则是通过JSON.parse转为JSON对象


	知道如何执行字符串，并且不受外部变量污染

	nodejs中通过vm虚拟机来执行字符串
	前端则是通过new Function()来执行字符串

	知道为什么模块中的this指向的是this.exports而不是global
	通过call把指针指向了this.exports

 */

/**
 * var f = new Function('x', 'y', 'return x+y'); 
 * f( 3, 4 ) // 7 
 */


// 1.引入核心模块
let fs = require('fs')
let path = require('path')
let vm = require('vm')	    // * 24.引入vm虚拟机来执行字符串


function req(p) {
  	// 10.因为Module._resolveFilename存在找不到文件
  	//    找不到文件时会抛出错误，所以我们这里捕获错误
	try { 
		// 4.通过Module._resolveFilename解析出一个绝对路径
		let filename = Module._resolveFilename(p)


		// // * 12.判断是否有缓存，如果有缓存的话，则直接返回缓存
		// if(Module._cache[filename]){
		//   	// * 因为实例的exports才是最终暴露出的内容
		//  	return Module._cache[filename].exports
		// }


		// // * 13.new一个Module实例
		let module = new Module(filename)

		// * 14.加载这个模块
		module._load(filename)


		// * 25.把module存到缓存
		// Module._cache[filename] = module


		// * 26.返回module.exprots
		return module.exports
	} catch (e) {
		console.log(e)
	}
}


function Module(id){
	this.id = id;
	this.exports = {} // 将来暴露模块的内容
}

// * 15.加载
Module.prototype._load = function(filename){
	// * 16.获取后缀名
	let extension = path.extname(filename)
	// * 17.根据不同后缀名 执行不同的方法
	Module._extensions[extension](this)
}
  
// * 21.因为处理js文件时，需要包裹一个闭包，我们写一个数组
Module.wrapper = [
  "(function(exports,require,module){",
  "\n})"
]

// * 22.通过Module.wrap包裹成闭包的字符串形式
Module.wrap = function(script){
  return Module.wrapper[0] + script + Module.wrapper[1]
}

// 8.支持的后缀名类型
Module._extensions = {
  	".js":function(module){
  		let str = fs.readFileSync(module.id,'utf8')
	    // * 23.通过Module.wrap函数把内容包裹成闭包
	    let fnStr = Module.wrap(str)

	    let fn = vm.runInThisContext(fnStr)
	    // 让产生的fn执行，并且把this指向更改为当前的module.exports
	    fn.call(module.exports,this.exports,req,module) // fn.call(this.exports,this.exports,req,module)
	},
  	".json":function(module){
		let str = fs.readFileSync(module.id,'utf8')

    	// * 19.通过JSON.parse处理，并且赋值给module.exports
    	let json = JSON.parse(str)
    	module.exports = json
	}
}

// 5.解析出绝对路径，_resolveFilename是Module的静态方法
Module._resolveFilename = function (relativePath) {
	// 6.返回一个路径
	let p = path.resolve(__dirname,relativePath)

	//   这种情况主要考虑用户自行添加了后缀名
  	//   如'./module.js'
	let exists = fs.existsSync(p)
  	if(exists) return p

  	// 9.如果relativePath传入的如'./module'，没有添加后缀
  	// 那么我们给它添加后缀，并且判断添加后缀后是否存在该文件
  	
  	let keys = Object.keys(Module._extensions)

  	let r = false
  	for(let item of keys){
  		let realPath = relativePath + item  // 拼接后缀

  		let exists = fs.existsSync(realPath)

	    if(exists){
	     	r = realPath
	      	break
	    }
  	}

  	if(!r){ // 如果找不到文件，则抛出错误
    	throw new Error('file not exists')
  	}
  	return r
}

module.exports = exports = req