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

	Array.prototype.filterSync = async function(cb,thisArg){
		let result = await Promise.all(this.map(cb))

		return this.filter((_,index) => result[index])
	}

	await [1, 2, 3].filterSync(item => item % 2 !== 0)
}
//https://mp.weixin.qq.com/s/TMRSvxXlMi8P8k6HBIwMeQ