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
	console.log(result)  // HELLO,   JACK   SMITH + 1
}




/**
 * https://segmentfault.com/blog/dongzhe3917875
 * promise 微信
 */





{
	const formatDate = (date=new Date(), format='yyyy-MM-dd hh:mm:ss') => {

	  	// 指定格式字符 
	  	let cfg = {
	    	yyyy: date.getFullYear(),                             // 年 : 4位
	    	yy: date.getFullYear().toString().substring(2),       // 年 : 2位
	    	M: date.getMonth() + 1,                               // 月 : 如果1位的时候不补0
	    	MM: (date.getMonth() + 1 + '').padStart(2, 0),        // 月 : 如果1位的时候补0
	    	d: date.getDate(),                                    // 日 : 如果1位的时候不补0
	    	dd: (date.getDate() + '').padStart(2, 0),             // 日 : 如果1位的时候补0
	    	h: date.getHours(),                                   // 时
	    	hh: (date.getHours() + '').padStart(2, 0),            // 时
	    	mm: (date.getMinutes() + '').padStart(2, 0),          // 分
	    	ss: (date.getSeconds() + '').padStart(2, 0)           // 秒
	  	}
	   	return format.replace(/([a-z])(\1)*/ig, (item)=>{
	   		return cfg[item]
	   	})
	}

	let data1 = formatDate(new Date(), 'yyyy-M-dd') // "2018-7-04"
	let date2 = formatDate(new Date(), 'yyyy-MM-dd') // "2018-07-04"

	console.log(data1, date2)  //2018-7-04 2018-07-04
}












/**
 * https://juejin.im/post/5bdfef86e51d453bf8051bf8
 */

{
	const actions = {
	  	'1': ['processing','IndexPage'],
	  	'2': ['fail','FailPage'],
	  	'3': ['fail','FailPage'],
	  	'4': ['success','SuccessPage'],
	  	'5': ['cancel','CancelPage'],
	  	'default': ['other','Index'],
	}
	/**
	 * 按钮点击事件
	 * @param {number} status 活动状态：1开团进行中 2开团失败 3 商品售罄 4 开团成功 5 系统取消
	 */
	const onButtonClick = (status)=>{
	  	let action = actions[status] || actions['default'],
	      	logName = action[0],
	      	pageName = action[1]
	  	sendLog(logName)
	  	jumpTo(pageName)
	}
}



{
	const actions = new Map([
	  	[1, ['processing','IndexPage']],
	  	[2, ['fail','FailPage']],
	  	[3, ['fail','FailPage']],
	  	[4, ['success','SuccessPage']],
	  	[5, ['cancel','CancelPage']],
	  	['default', ['other','Index']]
	])

	/**
	 * 按钮点击事件
	 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
	 */
	const onButtonClick = (status)=>{
	  	let action = actions.get(status) || actions.get('default')
	  	sendLog(action[0])
	  	jumpTo(action[1])
	}
}



{
	const actions = new Map([
	  	['guest_1', ()=>{/*do sth*/}],
	  	['guest_2', ()=>{/*do sth*/}],
	  	['guest_3', ()=>{/*do sth*/}],
	  	['guest_4', ()=>{/*do sth*/}],
	  	['guest_5', ()=>{/*do sth*/}],
	  	['master_1', ()=>{/*do sth*/}],
	  	['master_2', ()=>{/*do sth*/}],
	  	['master_3', ()=>{/*do sth*/}],
	  	['master_4', ()=>{/*do sth*/}],
	  	['master_5', ()=>{/*do sth*/}],
	  	['default', ()=>{/*do sth*/}],
	])

	/**
	 * 按钮点击事件
	 * @param {string} identity 身份标识：guest客态 master主态
	 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
	 */
	const onButtonClick = (identity,status)=>{
	  	let action = actions.get(`${identity}_${status}`) || actions.get('default')
	  	action.call(this)
	}
}



{
	const actions = ()=>{
		const functionA = ()=>{/*do sth*/}
		const functionB = ()=>{/*do sth*/}
		return new Map([
			[{identity:'guest',status:1},functionA],
			[{identity:'guest',status:2},functionA],
			[{identity:'guest',status:3},functionA],
			[{identity:'guest',status:4},functionA],
			[{identity:'guest',status:5},functionB],
		])
	}

	const onButtonClick = (identity,status)=>{
	  	let action = [...actions()].filter(([key,value])=>(key.identity == identity && key.status == status))
	  	action.forEach(([key,value])=>value.call(this))
	}
}



{
	const actions = ()=>{
		const functionA = ()=>{/*do sth*/}
		const functionB = ()=>{/*do sth*/}
		const functionC = ()=>{/*send log*/}
		return new Map([
			[/^guest_[1-4]$/,functionA],
			[/^guest_5$/,functionB],
			[/^guest_.*$/,functionC],
		])
	}

	const onButtonClick = (identity,status)=>{
	  	let action = [...actions()].filter(([key,value])=>(key.test(`${identity}_${status}`)))
	  	action.forEach(([key,value])=>value.call(this))
	}
}


{
	// 尾递归优化过的 Fibonacci 数列实现如下
	function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
		if( n <= 1 ) {return ac2};
	
		return Fibonacci2 (n - 1, ac2, ac1 + ac2);
	}
	
	// Fibonacci2(100) // 573147844013817200000
	// Fibonacci2(1000) // 7.0330367711422765e+208


	// 非尾递归的 Fibonacci  容易爆栈
	function Fibonacci (n) {
		if ( n <= 1 ) {return 1};
	
		return Fibonacci(n - 1) + Fibonacci(n - 2);
	}
	
	// Fibonacci(10) // 89
	// Fibonacci(100) // 超时
	// Fibonacci(500) // 超时
}



{
	// function compose(...funcs) {
	// 	return args => funcs.reduceRight((result, f) => f(result), args);
	// }



	function compose(...fns){
		return fns.reduce((a,b)=> (...args)=> a(b(...args)));
	}

	// var s = () => trim(toUpper())
	// var f = () => s(test())
	// var d = () => f(greeting())

	// () => trim(toUpper(test(greeting())))
	// () => greeting() => test() => toUpper() => trim() 调用顺序
	
	function curry (fn, ...args) {
		if (args.length >= fn.length) {
			const realArgs = args.pop();
			return fn(realArgs, ...args);
		}
	
		return (...runArgs) => curry(fn, ...args, ...runArgs);
	};
	
	let greeting = (firstName, lastName) => ` hello, ${firstName} ${lastName}`;
	let toUpper = str => str.toUpperCase();
	let trim = str => str.trim()
	let test = (str1,str2,str3) => `${str1} + 1 + ${str2} + 2 + ${str3}`

	test = curry(test, '--222--','--333--')
	// test = curry(test)('--222--')('--333--')
	let fns = compose(trim, toUpper, test, greeting)
	let result = fns('  jack', 'smith')
	console.log(result)

	const importAll = (requireContext) => requireContext.keys();

	const getRequireObj = (pathList, sliceStart, sliceEnd, reqCtxPathList) => {
		return pathList.reduce((resultObj, itemPath) => {
			const objCombine = resultObj;
			const itemModule = itemPath.slice(sliceStart, sliceEnd);

			objCombine[itemModule] = reqCtxPathList(itemPath).default ?? {};
			return objCombine;
		}, Object.create(null));
	};
}