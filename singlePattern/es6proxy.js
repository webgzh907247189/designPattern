/**
 * https://zhangzhao.name/2018/01/18/%E5%A6%82%E4%BD%95%E8%AE%A9%20(a%20==%201%20&&%20a%20==%202%20&&%20a%20==%203)%20%E8%BF%94%E5%9B%9E%20true/
 * 
 * https://www.cnblogs.com/wwhhq/p/8196217.html
 * const proxiedObject = new Proxy(initialObj, handler);
 * handler对象基本上是一个包含一组“拦截”的对象，每当访问对象属性时都会被触发
 */
{	
	let obj = {a: 0}
	let proxyObj = new Proxy(obj,{
		get(target){
			return obj.a++
		},
		set(target,key,value){
			target[key] = '111'
		}
	})
	proxyObj.name = 'web'
	console.log(proxyObj.a,obj) // 0 {a: 1,name: '111'}
}

{	
	/**
	 * Proxy 对象默认的 toString 和 valueOf 方法会返回这个被 getter 劫持过的结果
	 * @DateTime    2018-02-24T10:57:44+0800
	 */
	let proxyObj = new Proxy({i: 1}, {
		get(target) {
			console.log('111')
			return () => target.i++ 
		}
	});
	console.log(proxyObj,proxyObj.toString,proxyObj.valueOf) // {i: 1}, () => target.i++, () => target.i++

	if (proxyObj == 1 && proxyObj == 2 && proxyObj == 3) {
	  console.log('Hello World!');
	}
}

{	
	/**
	 * Proxy 对象默认的 toString 和 valueOf 方法会返回这个被 getter 劫持过的结果
	 */
	let proxy = new Proxy({name: 'zhansan'},{
		get(){
			return () => '1'
		}
	})

	console.log(proxy == 2,proxy == 1,proxy === 1)  //false true false
}

{
	let i = 1
	Object.defineProperty(window, 'a', {
		get() { return i++ }
	})
	// console.log(a === 1,a)   // true 2  (不注释会影响结果)

	if (a === 1 && a === 2 && a === 3) {
		console.log('Hello World!'); 	//Hello World
	}
}

{
	let val = function* () {
		let i = 1
		while(true){
			yield i++
		}
	}
	let g = val()

	Object.defineProperty(window, 'aa', {
		get() { return g.next().value }
	})

	if (aa === 1 && aa === 2 && aa === 3) {
		console.log('Hello World!');   // Hello World
	}
}



{	
	/**
	 * enumerable 判断是否可以枚举，configurable 判断当前属性是否之后再被更改描述符
	 * writable 判断是否可以继续赋值，value 判断这个结果的值
	 */
	let a = {}
	Object.defineProperty(a, 'value', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: "static"
	})

	console.log(a) // {value: 'static'}
}

{	
	/**
	 * get set 方法和 writable value 是不能共存的，否则就会抛出异常
	 * 有没有return 不影响结果
	 * 访问 a.value 时就会调用 get 方法，当我们通过 a.value = 'test' 时，就会执行 set 方法。
	 */
	let a = { i: 1 }
	Object.defineProperty(a, 'value', {
		enumerable: false,
		configurable: false,
		// get() { return a.i },
		get() { a.i },

		// set() { return a.i++ }
		set() {  a.i++ }
	})
	a.value = 10
	console.log(a.i,a) // 2  {i: 2}
}

{
	let obj = {NAME: '11111',sex: '男'}
	let q = function(obj,key){
		let keys = Object.keys(obj)
		if(keys.includes(key)){
			return obj[key]
		}

		Object.defineProperty(obj,key,{
			get(){
				let lowerKey = key.toLowerCase()
				let lowerKeys = keys.map((item)=>{
					return item.toLowerCase()
				})

				if(lowerKeys.includes(lowerKey)){
					let matchIndex = lowerKeys.findIndex((item)=>{
						return item === lowerKey
					})
					return this[keys[matchIndex]]
				}
			}
		})
		return obj[key]
	}
	q(obj,'NaME') // 11
}
	
{	
	let obj = {name: '11',sex: '男'}
	let q = new Proxy(obj,{
		get(target,key){
			let keys = Object.keys(target)
			let lowerKey = key.toLowerCase()
			let lowerKeys = keys.map((item)=>{
				return item.toLowerCase()
			})

			if(keys.includes(key)){
				return target[key]
			}else if(lowerKeys.includes(lowerKey)){
				let index = lowerKeys.findIndex((key)=>{
					return key === lowerKey
				})
				return target[keys[index]]
			}
		}
	})
	console.log(q.NaMe) // 11
}

/**
 * https://juejin.im/post/5a6e78abf265da3e3f4cf085?utm_source=gold_browser_extension
 * https://juejin.im/post/59df4f74f265da430f311909#heading-0
 * https://yangbo5207.github.io/wutongluo/ji-chu-jin-jie-xi-lie/liu-3001-zai-chrome-zhong-guan-cha-han-shu-diao-yong-zhan-3001-zuo-yong-yu-lian-3001-bi-bao.html
 * https://juejin.im/post/5a7d6ecc5188257a5911b9bb?utm_source=gold_browser_extension#heading-10
 */

















/**
 *  https://juejin.im/post/5b09234d6fb9a07acf569905
 */


/** 
 * 显然这两个并不是同一个对象，但是我通过改变enhancePerson的city属性却影响到了person的city属性，这就是我们通常会忽略掉的，
 * 如果你不设置Proxy的set方法，它会保持默认行为：
 * set (target, propKey, value) {
 *     target[propKey] = value
 * }
 */
{
	const person = {
		name: 'xiaoyun',
	    province: '江苏省',
	    city: '南京市'
	}

	const enhancePerson = new Proxy(person, {
	    get (target, name) {
		    switch (name) {
		        case 'address':
		        	return `${target['province']}-${target['city']}`
		        default:
		          	return target[name]
		    }
	    }
  	})
  	console.log(enhancePerson.address) // 江苏省-南京市

  	enhancePerson.city = '苏州市'
  	console.log(enhancePerson.city === person.city) // true


  	/**
  	 * 显然这两个并不是同一个对象，但是我通过改变enhancePerson的city属性却影响到了person的city属性，这就是我们通常会忽略掉的，
  	 * 如果你不设置Proxy的set方法，它会保持默认行为：
	 * set (target, propKey, value) {
	 *     target[propKey] = value
	 * }
  	 */
}


{
	const person = {
		name: 'xiaoyun',
	    province: '江苏省',
	    city: '南京市',
		get address () {
          return `${this.province}-${this.city}`
        }
	}

	const enhancePerson = new Proxy(person, {
	    get (target, name) {
		    switch (name) {
		        case 'address':
		        	return `${target['province']}-${target['city']}`
		        default:
		          	return target[name]
		    }
	    },

        ownKeys (target) {
          return Object.keys(target)
        }
  	})
  	console.log(enhancePerson.address) // 江苏省-南京市

  	enhancePerson.city = '苏州市'
  	console.log(enhancePerson.city === person.city) // true
	console.log(Object.keys(enhancePerson)) //["name", "province", "city", "address"]

	/**
	 * Proxy中的ownKeys拦截的方法太多，所以我们拦截ownKeys之后，会导致某些方法无法使用，并且拦截ownKeys返回的结果也有严格的要求：
	 *
	 * 返回的结果必须是一个数组
	 * 并且数组的元素必须是String或者Symbol类型
	 * 结果必须包含对象的所有不可配置、自身拥有的属性
	 * 如果对象不能扩展，则结果只能包含自身拥有的属性，不能含有其他属性

	 * 所以在拦截方法注意点很多，不然很容易出现问题。
	 */
}