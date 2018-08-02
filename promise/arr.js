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




{
	/**
	 * 直接使用 Boolean
	 */
	let arrContainsEmptyVal = [3, 4, 5, 2, 3, undefined, null, 0, ""];
	let arr = arrContainsEmptyVal.filter(Boolean)


	let brr = arrContainsEmptyVal.filter((item)=>{
		return item
	})

	console.log(arr,brr)  // [3, 4, 5, 2, 3]     [3, 4, 5, 2, 3]
}


{	
	/**
	 * 这样的写法会改边原数据
	 * @type {Array}
	 */
	let users = [
	  { username: "Kelly", isVIP: true, balance: 20 },
	  { username: "Tom", isVIP: false, balance: 19 },
	  { username: "Stephanie", isVIP: true, balance: 30 }
	];


	let arr = users.map((item)=>{
		item.balance = item.isVIP ? item.balance+10 : item.balance
		return item
	})

	console.log(users,arr) 
	// [
	//   { username: "Kelly", isVIP: true, balance: 30 },
	//   { username: "Tom", isVIP: false, balance: 19 },
	//   { username: "Stephanie", isVIP: true, balance: 40 }
	// ];
	// [
	//   { username: "Kelly", isVIP: true, balance: 30 },
	//   { username: "Tom", isVIP: false, balance: 19 },
	//   { username: "Stephanie", isVIP: true, balance: 40 }
	// ];
}
{
	let users = [
	  { username: "Kelly", isVIP: true, balance: 20 },
	  { username: "Tom", isVIP: false, balance: 19 },
	  { username: "Stephanie", isVIP: true, balance: 30 }
	];


	let arr = users.map((item)=>{
		return item.isVIP ? {...item,balance: item.balance + 10} : item
	})

	console.log(users,arr) 
	// [
	//   { username: "Kelly", isVIP: true, balance: 20 },
	//   { username: "Tom", isVIP: false, balance: 19 },
	//   { username: "Stephanie", isVIP: true, balance: 30 }
	// ];
	// [
	//   { username: "Kelly", isVIP: true, balance: 30 },
	//   { username: "Tom", isVIP: false, balance: 19 },
	//   { username: "Stephanie", isVIP: true, balance: 40 }
	// ];
}



{	
	/**
	 * 使用some 结合includes判断
	 */
	let randomStr = "hdjrwqpi";
	[...randomStr].some((item)=>{
		return ["a", "e", "o", "i", "u"].includes(item);
	})
	//true
}



{
	function genNumArr(length,limit){
		let arr = []
		let i = 0
		while(i < length){
			i++
			arr = [...arr,Math.floor(Math.random() * limit)]
		}
		return arr
	}
	genNumArr(10,100)  //生成的位0-100的数
}
{
	function genNumArr(length,limit){
		return Array.from({length},()=>{
			return Math.floor(Math.random() * limit)
		})
	}
	genNumArr(10,100)  //生成的位0-100的数
}
{	
	/**
	 * 生成指定大小的随机数
	 * [0,1) * 10 -> [0,10)
	 * 所以要加1 
	 */
	function genNumArr(length,min,max){
		return Array.from({length},()=>{
			return Math.floor(Math.random() * (max - min + 1)) + min
		})
	}
	genNumArr(10,100,110)  //生成的位0-100的数
}




{
	const nestedArr = [1, 2, [3, 4, [5, 6]]];

	function concatFlat(arr){
		return arr.reduce((result,item)=>{
			return result.concat(Array.isArray(item) ? concatFlat(item) : item)
		},[])
	}

	let arr = concatFlat(nestedArr)
	console.log(arr,nestedArr)
}	

{
	const objLikeArr = [["name", "Jim"], ["age", 18], ["single", true]];

	var obj = objLikeArr.reduce((result,item)=>{
		return result[item[0]] = item[1],result
	},Object.create(null))
	console.log(obj) //{name: "Jim", age: 18, single: true}
}






{
	const deepAttr = { a: { b: { c: 15 } } };
	function pluckDeep(str){
		let strArr = str.split('.')
		return function(obj){
			return strArr.reduce((result,item)=>{
				// result = result[item]
				// return result
				return result = result[item],result
			},obj)
		}
	}

	pluckDeep("a.b.c")(deepAttr);
}
{	
	const deepAttr = { a: { b: { c: 15 } } };
	function getValue(target,key){
	    let obj = new Proxy(target,{
	        get(target,key){
	            return key.split('.').map((item,index)=>{
	                return target && (target = target[item]) || undefined
	            }).pop()
	        }
	    })
	    return obj[key]
	}
	getValue(deepAttr,'a.b.c.d.h')
}	
{	
	const deepAttr = { a: { b: { c: 15 } } };
	function getValue(target,key){      
	    let obj = new Proxy(target,{
	        get(target,key){
	            return key.split('.').reduce((result,item)=>{
	                return result && (result = result[item]) || undefined
	            },target)
	        }
	    })
	    return obj[key]
	}
	getValue(deepAttr,'a.b.c.d.h')
}







/**
 * 将用户中的男性和女性分别放到不同的数组里
 */
{
	let users = [
	  { name: "Adam", age: 30, sex: "male" },
	  { name: "Helen", age: 27, sex: "female" },
	  { name: "Amy", age: 25, sex: "female" },
	  { name: "Anthony", age: 23, sex: "male" },
	];


	users.reduce((result,item)=>{
		result = item.sex == 'male' ? [[...result[0],item],result[1]] : [result[0],[...result[1],item]]
		return result
	},[[],[]])


	users.reduce((result,item)=>{
		return item.sex == 'male' ? [[...result[0],item],result[1]] : [result[0],[...result[1],item]]
	},[[],[]])	


	users.reduce((result,item)=>{
		return result = item.sex == 'male' ? [[...result[0],item],result[1]] : [result[0],[...result[1],item]],result
	},[[],[]])	
}


{
	
}