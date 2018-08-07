/**
 * arr  https://juejin.im/post/5b5a9451f265da0f6a036346#heading-0
 * 
 */
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
 * 这样写之后，相当于promise.all()
 * 同时发出多个异步任务
 * 
 * https://juejin.im/post/5b685ed1e51d4533f52859e8
 */
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

		for await (let item of arr){			
			arr1.push(item())
		}
		return Promise.all(arr1)
	}

	meregpromise([ajax1,ajax2,ajax3]).then((data)=>{
		console.log('done')

		console.log(data)
	})
	//2
	//1
	//3
	//done
	//[1,2,3]
}

/**
 * 这样写之后，相当于会单个的执行 依次的执行
 * 任务完成一个，再去完成下一个
 * 
 * https://juejin.im/post/5b685ed1e51d4533f52859e8
 */
{	
	let arr = []
	async function process(array) {
		let index = 0

	    for (let i of array) {
	        let result = await doSomething(i,index)
			console.log(result,'zz')
			index++

			arr.push(result)
	    }
		return arr
    }
	
	function doSomething(i,index){
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
                resolve(i)
            },(index+1)*1000)	
		})
	}
	
	process(['aa','bb','cc']).then((d)=>{

		console.log(d,'d')
	})

	console.log(arr,'arr')	

	// [] "arr"
	// aa zz
	// bb zz
	// cc zz
	// ["aa", "bb", "cc"] "d"
}
















{	
	let arrNumber = []

	let timeout = ms => new Promise((resolve)=>{
		setTimeout(()=>{
			resolve()
		},ms)	
	})

	let ajax1 = () => timeout(2000).then(()=>{
		console.log(1)
		return 1
	}).then((d)=>{
		console.log(d,'我先打印,涉及微任务，宏任务')
		return d
	})

	let ajax2 = (num) => timeout(1000).then(()=>{
		arrNumber.push(num)
		console.log(2)
		return 2
	})

	let ajax3 = (num) => timeout(2000).then(()=>{
		arrNumber.push(num)
		console.log(3)
		return 3
	})

	let compose = function(...args){
		let lastFn = args.pop()
		return function(...realArgs){
			return args.reverse().reduce((result,fn)=>{
				return result.then((data)=>{
					return fn.call(null,data)
				})
			},Promise.resolve(lastFn.apply(null,realArgs)))
		}
	}

	let result = compose(ajax3,ajax2,ajax1)
	result().then((d)=>{
		arrNumber.push(3)
		console.log('done',arrNumber)
	})
	// 1
	// 14 1 "我先打印,涉及微任务，宏任务"
	// 19 2
	// 25 3
	// 43 done (3) [1, 2, 3]
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

























/**
 * 递归写法
 */
{
	const num1 = [3, 4, 5, 6, 7];
	const num2 = [43, 23, 5, 67, 87, 3, 6];

	function zipWith(add){
		return function (arr1){
			return function(arr2){
				if(arr1.length == 0 || arr2.length == 0){
					return []
				}

				let [first1,...nextArr1] = arr1
				let [first2,...nextArr2] = arr2
				return [add(first1,first2),...zipWith(add)(nextArr1)(nextArr2)]
			}
		}
	}

	function add(x,y){
		return x+y
	}

	zipWith(add)(num1)(num2)
	// [46, 27, 10, 73, 94]
}



{

	const houses = [
      "Eddard Stark",
      "Catelyn Stark",
      "Rickard Stark",
      "Brandon Stark",
      "Rob Stark",
      "Sansa Stark",
      "Arya Stark",
      "Bran Stark",
      "Rickon Stark",
      "Lyanna Stark",
      "Tywin Lannister",
      "Cersei Lannister",
      "Jaime Lannister",
      "Tyrion Lannister",
      "Joffrey Baratheon"
    ];

	function filterName(f){
		return function([head,...nextArr]){
			return f(head) ? [head,...filterName(f)(nextArr)] : []
		}
	}

	function getName(item){
		return item.toLowerCase().includes('stark')
	}
	
	filterName(getName)(houses)
}



/**
 * 注意解构，存在差异性
 */
{
	const numList = [1, 3, 11, 4, 2, 5, 6, 7];

	function filterNumber([first,...nextArr]){
		return function(f){
			if(!first){
				return []
			}
						
			let result = f(first) ? [first, ...filterNumber(nextArr)(getNumber)] : filterNumber(nextArr)(getNumber)
			return result
		}
	}
	function getNumber(item){
		return item%2 == 1
	}
	
	let result = filterNumber(numList)(getNumber)
	result.splice(0,4) 
	//[1, 3, 11, 5]
}
{
	const numList = [1, 3, 11, 4, 2, 5, 6, 7];

	function filterNumber(number,[first,...nextArr]){
		return function(f){
			if(number == 0 || !first){
				return []
			}
			
			let result = f(first) ? [first, ...filterNumber(number - 1 ,nextArr)(getNumber)] : filterNumber(number,nextArr)(getNumber)
			return result
		}
	}
	function getNumber(item){
		return item%2 == 1
	}
	filterNumber(5,numList)(getNumber)
	// [1, 3, 11, 5, 7]
}
{
	const numList = [1, 3, 11, 4, 2, 5, 6, 7];

    const takeFirst = (limit, f, arr) => {
      if (limit === 0 || arr.length === 0) return [];
      const [head, ...tail] = arr;

      return f(head)
        ? [head, ...takeFirst(limit - 1, f, tail)]
        : takeFirst(limit, f, tail);
    };

    const isOdd = n => n % 2 === 1;

    takeFirst(40, isOdd, numList);
    // [1, 3, 11, 5, 7]
}





/**
 * 注意，这个例子只是为了好玩。
 * 生产环境中不要直接修改 JS 内置数据类型的原型链。原因是 V8 引擎有一个原型链快速推测机制，修改原型链会破坏这个机制，造成性能问题。
 */
{
	Number.prototype[Symbol.iterator] = function*() {
		for (let i = 0; i <= this; i++) {
	    	yield i;
	  	}
	};

	[...6]; // [0, 1, 2, 3, 4, 5, 6]
}