/**
 * 使用ES6 实现发布订阅
 * @type {Object}
 * https://juejin.im/post/5a7d6ecc5188257a5911b9bb?utm_source=gold_browser_extension#heading-10
 * https://www.cnblogs.com/WhiteHorseIsNotHorse/p/7016010.html     ?? key fn
 * iterrator   {...obj}  babel  [...arr]
 */

{
	let pubsub = {
		listSet: new Set(),
		listener(){
			let [fn] = Array.from(arguments)
			this.listSet.add(fn)
			return this
		},
		trigger(target){
			let _this = this
			return new Proxy(target,{
				set(target,key,value){
					let result = Reflect.set(target,key,value)
					for(let item of _this.listSet){
						item()
					}
					return result
				}
			})
		}
	}
	let obj = {name: '111',sex: '男'}
	function print() {
		console.log(`${proxyResult.name},${proxyResult.sex}`)    //张三,男
	}
	function print1(){
		console.log(`我是二号位: ${proxyResult.name},${proxyResult.sex}`)  //我是二号位: 张三,男
	}

	pubsub.listener(print).listener(print1)

	let proxyResult = pubsub.trigger(obj)
	console.log(proxyResult)   //Proxy {name: "111", sex: "男"}[[Handler]]: Object[[Target]]: Object[[IsRevoked]]: false 

	proxyResult.name = '张三'
	console.log(proxyResult,obj) // Proxy {name: "姓名", sex: "男"}                 {name: "姓名", sex: "男"}
}

{
	let pubsub = {
		listSet: new Set(),
		listener(){
			let [key,fn] = Array.from(arguments)
			if(!this.listSet.size){
				this.listSet.add({key: [fn]})
				return
			}

			for(let item of this.listSet.keys()){
				if(item[key]){
					item[key].push(fn)
				}else{
					this.listSet.add({key: [fn]})
				}
			}
		},
		trigger(target){
			let _this = this
			return new Proxy(target,{
				set(target,key,value){
					let result = Reflect.set(target,key,value)
					for(let item of _this.listSet){
						// item()
						console.log(item)
					}
					return result
				}
			})
		}
	}
	let obj = {name: '111',sex: '男'}
	function print() {
		console.log(`${proxyResult.name},${proxyResult.sex}`)    //张三,男
	}
	function print1(){
		console.log(`我是二号位: ${proxyResult.name},${proxyResult.sex}`)  //我是二号位: 张三,男
	}

	pubsub.listener('eat',print)
	pubsub.listener('eat',print1)

	let proxyResult = pubsub.trigger(obj)
	console.log(proxyResult)   //Proxy {name: "111", sex: "男"}[[Handler]]: Object[[Target]]: Object[[IsRevoked]]: false 

	proxyResult.name = '张三'
	console.log(proxyResult,obj) // Proxy {name: "姓名", sex: "男"}                 {name: "姓名", sex: "男"}
}


{
	var myObject = {
	 	foo: 1,
	  	bar: 2,
	  	get baz() {
	    	return this.foo + this.bar;
	  	},
	}

	Reflect.get(myObject, 'foo') // 1
	Reflect.get(myObject, 'bar') // 2
	Reflect.get(myObject, 'baz') // 3
}
{
	var myObject = {
		foo: 1,
	  	bar: 2,
	  	get baz() {
	    	return this.foo + this.bar;
	  	},
	};

	var myReceiverObject = {
	  	foo: 4,
	  	bar: 4,
	};

	Reflect.get(myObject, 'baz', myReceiverObject) // 8
}








{	
	/**
	 * 注意，如果 Proxy 对象和 Reflect 对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为，而且传入了receiver，
	 * 那么Reflect.set会触发Proxy.defineProperty拦截。
	 */
	let p = {
		a: 'a'
	};

	let handler = {
		set(target, key, value, receiver) {
	    	console.log('set');
	    	Reflect.set(target, key, value, receiver)
	  	},
	  	defineProperty(target, key, attribute) {
	    	console.log('defineProperty');
	    	Reflect.defineProperty(target, key, attribute);
	  	}
	};

	let obj = new Proxy(p, handler);
	obj.a = 'A';
	// set
	// defineProperty
}
/**
 * Proxy.set拦截里面使用了Reflect.set，而且传入了receiver，导致触发Proxy.defineProperty拦截。
 * 这是因为Proxy.set的receiver参数总是指向当前的 Proxy 实例（即上例的obj），
 * 而Reflect.set一旦传入receiver，就会将属性赋值到receiver上面（即obj），导致触发defineProperty拦截。
 * 如果Reflect.set没有传入receiver，那么就不会触发defineProperty拦截。
 */
{
	let p = {
		a: 'a'
	};

	let handler = {
	  	set(target, key, value, receiver) {
	    	console.log('set');
	    	Reflect.set(target, key, value)
	  	},
	  	defineProperty(target, key, attribute) {
	    	console.log('defineProperty');
	    	Reflect.defineProperty(target, key, attribute);
	  	}
	};

	let obj = new Proxy(p, handler);
	obj.a = 'A';
	// set
}






{
	let myObject = {
	  	foo: 1,
	  	set bar(value) {
	    	return this.foo = value;
	  	},
	}

	Reflect.set(myObject, 'bar', 3)
	myObject.foo // 3
}
{
	let myObject = {
	  	foo: 4,
	  	set bar(value) {
	    	return this.foo = value;
	  	},
	};

	let myReceiverObject = {
	  	foo: 0,
	};

	/** 如果name属性设置了赋值函数，则赋值函数的this绑定receiver。 */
	Reflect.set(myObject, 'bar', 1, myReceiverObject);
	myObject.foo // 4
	myReceiverObject.foo // 1
}















{
	let obj = {name: 1,sex: 2}
	'sex' in obj                  //true
	Reflect.has(obj,'sex')       //true
}
{
	let obj = {name: 1,sex: 2}
	delete obj.name
	obj    // {sex: 2}
}
{
	let obj = {name: 1,sex: 2}
	Reflect.deleteProperty(obj,'name')
	obj     // {sex: 2}
}



















{	
	/**
	 * 可以用 in 实现，就可以用 includes 实现 
	 * 可以用 includes 实现， 就可以用 some 实现
	 *
	 * includes 可以指定从哪一位开始
	 */
	var arr = [1,2,3]
	arr.includes(11)   //false
	arr.includes(1,2)  //false (从哪一位开始)

	2 in arr           // true

	arr.some((item)=>{
		return item == 2
	})                 //true



	[NaN].includes(NaN)  // true
	[NaN].indexOf(NaN)   // -1
}