/**
 * https://segmentfault.com/a/1190000008394749
 *
 * https://segmentfault.com/a/1190000011447164
 *
 * https://segmentfault.com/blog/dongzhe3917875
 */

{
	let compose = function (...args) {
		let argslength = args.length;
		let result

		return function fn(...relayArgs){
			result = args[argslength -1].apply(this,relayArgs)

			if(argslength <= 1){
				return result
			}else{
				argslength --
				return fn.call(this,result)
			}
		}
	}

	let greeting = (firstName, lastName) => `hello, ${firstName} ${lastName}`;

	let toUpper = str => str.toUpperCase();

	let fn = compose(toUpper, greeting)
	console.log(fn('  jack', 'smith   '))
	// ‘HELLO，JACK SMITH’
	

	let trim = str => str.trim()
	let fnTest = compose(trim, toUpper, greeting)
	console.log(fnTest('jack', 'smith'))
}


/**
 * lodash
 */
{
	let flow = function(funs){
		let fulength = funs.length
		let fuIndex = fulength
		while(fuIndex--){
			if(typeof funs[fuIndex] != 'function'){
				throw new Error('存在非法function')
			}
		}

		return function(...args){
			let index = 0
			let result = fulength ? funs[index].apply(this,args) : funs[0]

			while(++index < fulength){
				result = funs[index].call(this,result)
			}
			return result
		}
	}

	let greeting = (firstName, lastName) => `hello, ${firstName} ${lastName}`;

	let toUpper = str => str.toUpperCase();

	let trim = str => str.trim()

	let fn = flow([greeting, toUpper, trim])
	console.log(fn('  jack  ', 'smith  '))


	/**
	 * 反转调用 (从右到左执行)
	 */
	let flowright = function(funs){
		return flow(funs.reverse())
	}

	let fnRight = flowright([trim, toUpper, greeting])
	console.log(fnRight('  jack  ', 'smith  '))
}


/**
 * promise
 */
{
	let compose = function(...args){
		let resultArgsFirst = args.pop()
		return function(...relayArgs){
			return args.reverse().reduce((fnResult,itemFn)=>{
				return fnResult.then((data)=>{
					return itemFn.call(null,data)
				})
			},Promise.resolve(resultArgsFirst.apply(null,relayArgs)))
		}
	}

	let greeting = (firstName, lastName) => `hello, ${firstName} ${lastName}`;
	let toUpper = str => str.toUpperCase();
	let trim = str => str.trim()

	let fns = compose(trim, toUpper, greeting)
	let result = fns('  jack  ', 'smith  ')
	console.log(result)   //promise
}


/**
 * generator
 */
{
	function *itearStep(args){
		let result

		for(let i=args.length-1; i>=0; i--){
			if(result){
				result = yield  args[i].call(null,result)
			}else{
				result = yield
			}
		}
	}

	let compose = function(...args){
		let g = itearStep(args)
		g.next()

		return function(...relayArgs){

			return args.reduce((result,itemFn)=>{
				return g.next(result).value
			},args.pop().apply(null,relayArgs))
		}
	}


	let greeting = (firstName, lastName) => ` hello, ${firstName} ${lastName}`;
	let toUpper = str => str.toUpperCase();
	let trim = str => str.trim()

	let fns = compose(trim, toUpper, greeting)
	let result = fns('  jack  ', 'smith  ')
	console.log(result)  // HELLO,   JACK   SMITH
}



/**
 * AOP
 */
{
	Function.prototype.before = function(fn){
		let that = this
		return function(...relayArgs){
			let result = that.apply(null,relayArgs)
			return fn.call(null,result)
		}
	}

	Function.prototype.after = function(fn){
		let that = this
		return function(...relayArgs){
			let result = fn.apply(null,relayArgs)
			return that.call(null,result)
		}
	}

	let compose = function(...args){
		let lastFn = args.pop()
		let countdownSecondFn = args.pop()

		if(args.length){
			return args.reverse().reduce((result,fn)=>{

				// return result.before(fn)
				return fn.after(result)

			},lastFn.before(countdownSecondFn))
		}

		return lastFn.before(countdownSecondFn)
	}

	let greeting = (firstName, lastName) => ` hello, ${firstName} ${lastName}`;
	let toUpper = str => str.toUpperCase();
	let trim = str => str.trim()
	let test = str => `${str} + 1`

	let fns = compose(toUpper, greeting)
	let result = fns('  jack  ', 'smith  ')
	console.log(result)  // HELLO,   JACK   SMITH

	let fnTest = compose(trim, toUpper, greeting)
	let resultTest = fnTest('  jack  ', 'smith  ')
	console.log(resultTest)  // HELLO,   JACK   SMITH
}




/**
 * 函数组合
 */
{	
	let compose = function(...args){
		return function(...relayArgs){
			return args.reverse().reduce((result,fn)=>{
				return fn.call(null,result)
			},args.shift().apply(null,relayArgs))	
		}
	}

	let greeting = (firstName, lastName) => ` hello, ${firstName} ${lastName}`;
	let toUpper = str => str.toUpperCase();
	let trim = str => str.trim()
	let test = str => `${str} + 1`

	let fns = compose(test, trim, toUpper, greeting)
	let result = fns('  jack  ', 'smith  ')
	console.log(result)  // HELLO,   JACK   SMITH
}

{	
	let compose = function(...args){
		return args.reverse().reduce((result,fn)=>{
			return (...relayArgs)=>{
				return fn.call(null,result.apply(null,relayArgs))
			}
		},args.shift())	
	}

	let greeting = (firstName, lastName) => ` hello, ${firstName} ${lastName}`;
	let toUpper = str => str.toUpperCase();
	let trim = str => str.trim()
	let test = str => `${str} + 1`

	let fns = compose(test, trim, toUpper, greeting)
	let result = fns('  jack  ', 'smith  ')
	console.log(result)  // HELLO,   JACK   SMITH
}




/**
 * https://segmentfault.com/blog/dongzhe3917875
 * promise 微信
 */
