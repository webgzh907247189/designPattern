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







{
	const person = (sex, fn) => {
	  return new Promise((resolve, reject) => {
	    window.setTimeout(() => {
	      const data = {
	        name: 'keith',
	        height: 180
	      }
	      resolve(data)
	    }, 1000)
	  })
	}
	function *gen () {
	  const data = yield person('boy')
	  console.log(data)   // {name: 'keith', height: 180}
	}


	// function run(gen){
	// 	const g = gen()
	// 	let result = g.next()
	// 	if(result.done){
	// 		return result.value
	// 	}

	// 	result.value.then(data => {
	// 		  g.next(data)
	// 	})
	// }
	// run(gen)
	
	function run(gen){
		const g = gen()
		const next = (data)=>{
			let result = g.next(data)
			if(result.done){
				return result.value
			}

			result.value.then(data => {
				 next(data)
			})
		}
		next()
	}
	run(gen)
}

/**
 * https://zhuanlan.zhihu.com/p/33229274
 * 由于yield表达式可以暂停执行，next方法可以恢复执行，这使得Generator函数很适合用来将异步任务同步化。
 * 但是Generator函数的流程控制会稍显麻烦，因为每次都需要手动执行next方法来恢复函数执行，并且向next方法传递参数以输出上一个yiled表达式的返回值。
 * 于是就有了thunk(thunkify)函数和co模块来实现Generator函数的自动流程控制。
 * 
 * 通过thunk(thunkify)函数分离参数，以闭包的形式将参数逐一传入，再通过apply或者call方法调用，然后配合使用run函数可以做到自动流程控制。
 * 通过co模块，实际上就是将run函数和thunk(thunkify)函数进行了封装，并且yield表达式同时支持thunk(thunkify)函数和Promise对象两种形式，使得自动流程控制更加的方便。
 */




{
	const thunkify = fn => {
	  return function () {
	    const args = Array.from(arguments)
	    return function (callback) {
	      console.log(callback,'callback')
	      // next()
		// data => {
		//     let result = g.next(data)
		// 	console.log(result,'111111')
		//     if (result.done) return result.value
		//     result.value(next)
		// } "callback"

	      let called = false
	      // called变量限制callback的执行次数
	      args.push(function () {
	        if (called) return
	        called = true
	        callback.apply(this, arguments)
	      })
	      try {
	        fn.apply(this, args)
	      } catch (err) {
	        callback(err)
	      }
	    }
	  }
	}
	const run = gen => {
	  const g = gen()
	  const next = data => {
	    let result = g.next(data)
	    console.log(result,'111111')
	    //{value: f, done: false}，111111


	    if (result.done) return result.value
	    result.value(next)
	  }
	  next()
	}

	const person = (sex, fn) => {
	  window.setTimeout(() => {
	    const data = {
	      sex,
	      name: 'keith',
	      height: 180
	    }
	    fn(data)
	  }, 1000)
	}

	const personThunk = thunkify(person)
	function *gen () {
	  const data = yield personThunk('boy')
	  console.log(data)
	}
	run(gen) // {sex: 'boy', name: 'keith', height: 180}
}