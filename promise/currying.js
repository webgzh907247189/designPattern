/**
 * 函数柯里化   (函数式编程有两个最基本的运算：合成和柯里化)
 * 所谓"柯里化"，就是把一个多参数的函数，转化为单参数函数
 * 有了柯里化以后，我们就能做到，所有函数只接受一个参数
 */

{	
	// 柯里化之前
	function add(x, y) {
	  return x + y;
	}

	// 柯里化之后
	function addX(y) {
	  return function (x) {
	    return x + y;
	  };
	}

	addX(2)(1) // 3
}









{
	function curry (fn) {
	  const args1 = Array.prototype.slice.call(arguments, 1)
	  console.log(args1,'args1')    //[1] "args1"
	
	  return function () {
	    const args2 = Array.from(arguments)
		console.log(args2,'args2')  // [2] "args2"
	
	    const arr = args1.concat(args2)
		console.log(arr,'arr')  //  [1, 2] "arr"

	    return fn.apply(this, arr)
	  }
	}

	const sum = (a, b) => {
	  return a + b
	}
	curry(sum, 1)(2)   // 3
}


{
	function curry (fn) {
	  const [,args1] = [...arguments]
	  console.log(args1,'args1')    //1 "args1"
	
	  return function () {
		// const args2 = Array.from(arguments)
		// console.log(args2,'args2')  // [2] "args2"

		// const arr = [args1,...args2]
		// console.log(arr,'arr')  //  [1, 2] "arr"



		const [args2] = [...arguments]
		console.log(args2,'args2')  // 2 "args2"
		const arr = [args1,args2]
		console.log(arr,'arr')  //  [1, 2] "arr"

		return fn.apply(this, arr)
	  }
	}

	const sum = (a, b) => {
	  return a + b
	}
	curry(sum, 1)(2)   // 3
}






{	
	function thunk(fn){
		return function(...arguments){
			let args = arguments
			console.log(args,'args')  // [1, 2] "args"

			return function(cb){
				console.log(cb,'cb') // ƒ out(result){console.log(result,'111')}  "cb"

				// return fn.apply(this,args,cb())
				
				let result = fn.apply(this,args)
				cb(result) 
			}
		}
	}

	function sum (a, b) {
		return a + b
	}

	function out(result){
		console.log(result,'111')  //3 '111'
	}

	const sumThunk = thunk(sum)
	let aa = sumThunk(1, 2)(out)
	console.log(aa,'aa') 
}


/**
 * https://zhuanlan.zhihu.com/p/33229274
 * https://juejin.im/post/5a687dd7518825732f7ee8e5
 * http://blog.csdn.net/haodawang/article/details/78177566
 */