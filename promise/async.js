async function getDate(){
	return await Promise.all([fetch('/api/post',{
			method: 'post',
			credentials: 'include',
			headers: {
				'Accept': 'application/json, text/plain,*/*',
			 	'Content-type': 'application/x-www-form-urlencoded'
			},
			body: JSON.stringify({a: 1,b: 2})
		}).then(function(res) {
			return res.json();
		})
		.then(data => {
				console.log('fetch测试',typeof(data))
		        console.log(data)
		        return data
		    }
		),fetch('/api/data',{
			method: 'get',
			credentials: 'include',
			headers: {
				'Accept': 'application/json, text/plain,*/*',
			 	'Content-type': 'application/x-www-form-urlencoded'
			}
		}).then(function(res) {
			return res.json();
		})
		.then(data => {
				console.log('fetch测试',typeof(data))
		        console.log(data)
		        return data
		    }
		)])
}


async function getD(){
	const [fetch1,fetch2] = await getDate()
	console.log(fetch1,'fetch11111111111111111111',fetch2)
}
getD()














/**
 * async 默认返回一个promise
 * https://mp.weixin.qq.com/s/TMRSvxXlMi8P8k6HBIwMeQ
 */
{
	let result = await func()
	// => 等价于
	func().then(result => {
	})
}

{
	async function func () {
		return 1  
	}
	// => 等价与
	function func () {
		return new Promise(resolve => resolve(1))
	}
}













{	
	function a(item){
		new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve(item)
				console.log(item)
			},1000)
		})
	}
	async function process(arrList){
		for await (let item of arrList){
			a(item)
		}
	}

	process([1,2,3,4])

	//1 2 3 4 循环里面4个promise,等待1s 之后，全部resolve
}



{
	[1, 2, 3].map(item => item ** 2) //[1,4,9]

	await Promise.all([1, 2, 3].map(async item => item ** 2))     
	// [1,4,9]
}


{
	[1, 2, 3].reduce((accumulator, item) => accumulator + item, 0)  //6

	// 因为result 是一个 promise， 所以使用 result，要先 await 一下
	await [1, 2, 3].reduce(async (accumulator, item) => await accumulator + item, 0)  
	//6
}


{
	[1, 2, 3].forEach(item => {
		console.log(item ** 2)
	})

	Array.prototype.forEachSync = async function (callback, thisArg) {
	  	for (let [index, item] of Object.entries(this)) {
			await callback(item, index, this)
		}
	}

	await [1, 2, 3].forEachSync(async item => {
		console.log(item ** 2)
	})
	// 1  4  9
}


{
	[1, 2, 3].filter(item => item % 2 !== 0) //[1, 3]


	/**
	 * 可以直接在内部调用 map方法，因为我们知道 map会将所有的返回值返回为一个新的数组。
	 * 这也就意味着，我们 map可以拿到我们对所有 item进行筛选的结果， true或者 false。 
	 * 接下来对原数组每一项进行返回对应下标的结果即可。
	 */
	Array.prototype.filterSync = async function(cb,thisArg){
		let result = await Promise.all(this.map(cb))

		return this.filter((item,index) => result[index])
	}

	await [1, 2, 3].filterSync(item => item % 2 !== 0)
}


{
	Array.prototype.someSync = async function(cb,thisArg){
		for(let [key,item] of this.entries()){
			if(await cb(item)){
				return true
			}
		}
		return false
	}
	await [1, 2, 3].someSync(async item => item === 2)
}


{
	Array.prototype.everySync = async function(cb,thisArg){
		for(let [key,item] of this.entries()){
			if(!await cb(item)){
				return false
			}
		}
		return true
	}
	await [1, 2, 3].everySync(async item => item === 2)
}
//https://mp.weixin.qq.com/s/TMRSvxXlMi8P8k6HBIwMeQ



{
	let timeout = ms => new Promise((resolve)=>{
		setTimeout(()=>{
			resolve()
		},ms)	
	})

	let ajax1 = () => timeout(2000).then(()=>{
		console.log(1)
		return 1
	})

	let ajax2 = () => timeout(1000).then(()=>{
		console.log(2)
		return 2
	})

	let ajax3 = () => timeout(2000).then(()=>{
		console.log(3)
		return 3
	})

	let meregpromise = async (arr) =>{
	     let arr1 = []

		for(let item of arr){			
			// arr1.push(await item())
			arr1 = [...arr1,(await item())]
		}

		return Promise.all(arr1)
	}

	meregpromise([ajax1,ajax2,ajax3]).then((data)=>{
		console.log('done')

		console.log(data)
	})
	//1
	//2
	//3
	//done
	//[1,2,3]
}




/**
 * https://mp.weixin.qq.com/s/b_SojysoGA_Z7WLJrilizg
 */
{
	//通过新函数来提供永久的绑定，还会覆盖call apply
	function returnThis () {
		return this
	}

	let boss1 = { name: 'boss1'}
	let boss1returnThis = returnThis.bind(boss1)
	boss1returnThis() // boss1

	let boss2 = { name: 'boss2' }
	boss1returnThis.call(boss2) // still boss1
}


{
	function callback (cb) {
		cb()
	}

	callback(() => { console.log(this) }) // window

	let boss1 = {
		name: 'boss1',
		callback: callback,
		callback2 () {
			callback(() => { console.log(this,'22') })
		}
	}

	boss1.callback(() => { console.log(this) }) // still window

	boss1.callback2(() => { console.log(this,'111') }) // boss1
}


{
	let returnThis = () => this

	returnThis() // window

	new returnThis() // TypeError

	let boss1 = {
		name: 'boss1',
		returnThis () {
			let func = () => this
			return func()
		}
	}

	returnThis.call(boss1) // still window

	let boss1returnThis = returnThis.bind(boss1)
	boss1returnThis() // still window

	boss1.returnThis() // boss1

	let boss2 = {
	  	name: 'boss2',
	  	returnThis: boss1.returnThis
	}
	boss2.returnThis() // boss2
}




/**
 * 函数组合 
 */
{
	function after(count,fn){
		let obj = Object.create(null)
		return function(key,data){
			obj[key] = data

			if(Object.keys(obj).length == count){
				fn(obj)
			}
		}
	}

	function fn(r){
		console.log('r',r)
	}

	let out = after(2,fn)

	out('name','xxx')
	out('sex','男')
}


{
	const list = [1, 2, 3]
	const square = num => {
	  	return new Promise((resolve, reject) => {
			setTimeout(() => {
		  	resolve(num * num)
			}, 1000)
	  	})
	}
	
	let promise = Promise.resolve()
	function test(i = 0) {
	  	if (i === list.length) return
	  	promise = promise.then(() => square(list[i])).then(res => console.log(res))
	  	test(i + 1)
	}
	test()
}

{
	const list = [1, 2, 3]
	const square = num => {
	  	return new Promise((resolve, reject) => {
			setTimeout(() => {
		  	resolve(num * num)
			}, 1000)
	  	})
	}
	
	list.reduce(async (_, x) => {
		await _
		const res = await square(x)
		console.log(res)
	}, undefined)
}


{
	const list = [1, 2, 3]
	const square = num => {
	  	return new Promise((resolve, reject) => {
			setTimeout(() => {
		  	resolve(num * num)
			}, 1000)
	  	})
	}
	
	list.reduce(async (result, x) => {
		await result
		const res = await square(x)
		console.log(res)
		return result;
	}, Promise.resolve())
}