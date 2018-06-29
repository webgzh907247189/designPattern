/**
 * https://segmentfault.com/a/1190000008394749
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