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
	[1, 2, 3].map(item => item ** 2) //[1,4,9]

	await Promise.all([1, 2, 3].map(async item => item ** 2))     
	// [1,4,9]
}

{
	[1, 2, 3].reduce((accumulator, item) => accumulator + item, 0)  //6

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
