
{
	let arr = []
	console.log(arr.__proto__ == Object.getPrototypeOf(arr))  //true
	console.log(Array.prototype == Object.getPrototypeOf(arr))//true


	console.log( Object.getPrototypeOf(arr).__proto__ === Array.prototype.__proto__ )  //true
	console.log( Object.getPrototypeOf(arr).__proto__ === Object.prototype )  //true
	console.log( Object.getPrototypeOf(arr).__proto__.__proto__ === null )  //true
}


{
	let arr = []
	console.log( Object.getOwnPropertyNames(arr) )//["length"]

	let obj = {}
	console.log( Object.getOwnPropertyNames(obj) )//[]
}


{
	let obj = {name: '111'}

	let a = Object.getOwnPropertyNames(obj)[0]
	let b = Object.getOwnPropertyDescriptor(obj,a)

	console.log(a,b)  // name   {value: "111", writable: true, enumerable: true, configurable: true}
}

/**
 * https://juejin.im/post/5b38527951882574a672615d
 * 
 * Object.getOwnPropertyNames(obj)  获取所有的keys  返回的是数组  与 Object.keys() 返回的也是数组
 *
 * Object.getOwnPropertyDescriptor(obj,item)  获取obj 的 key 属性值  返回的是对象
 */
{
	let obj = {name: 'zzz'}
	obj.__proto__ = null

	Object.getOwnPropertyNames(obj).forEach((item)=>{
		let itemDesc = Object.getOwnPropertyDescriptor(obj,item)
		itemDesc.value = 'AAAAAAAAAAAAAA'
		Object.defineProperty(obj,item,itemDesc)
	})
	console.log(obj)   //{name: "AAAAAAAAAAAAAA"}

	Object.getOwnPropertyDescriptor(obj,'name')  //{value: "AAAAAAAAAAAAAA", writable: true, enumerable: true, configurable: true}
}


{
	let obj = {
		eat(){
			return '吃饭'
		}
	}

	let o = {
		__proto__: obj,
		eat(){
			return `${super.eat()} | 喝水`
		}
	}

	console.log(o.eat())  // 吃饭 | 喝水
}

{
	let fn = function (argument) {
		// body...
	}
	console.log(fn.name)  //fn



	let fn1 = function a(argument) {
		// body...
	}
	console.log(fn1.name)  //a
}
