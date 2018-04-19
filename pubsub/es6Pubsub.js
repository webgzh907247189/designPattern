/**
 * 使用ES6 实现发布订阅
 * @type {Object}
 * https://juejin.im/post/5a7d6ecc5188257a5911b9bb?utm_source=gold_browser_extension#heading-10
 * https://www.cnblogs.com/WhiteHorseIsNotHorse/p/7016010.html     ?? key fn
 * iterrator   {...obj} 
 *
 * 陆家嘴小才女4月底 && 老钱5月底
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

	2 in arr           // true   检测 arr[2] 是否存在

	arr.some((item)=>{
		return item == 2
	})                 //true



	[NaN].includes(NaN)  // true
	[NaN].indexOf(NaN)   // -1
}









{
	let arr = [1,2,3]
	let brr = [...arr]
	arr.push('aa')
	console.log(arr,brr)   //  [1, 2, 3, "aa"]  [1, 2, 3]
}



{
	let obj = {name: '11',sex: '男',a: {b: 11}}
	let o = {...obj,className: '一年级'}
	obj.a.b = 22
	console.log(o,'??',obj)
	//{name: "11", sex: "男", a: {b: 22}, className: "一年级"}
	//{name: "11", sex: "男", a: {b: 22}}
}
{	
	var _extends = Object.assign || function (target) { 
		for (var i = 1; i < arguments.length; i++) { 
			var source = arguments[i]; 
			for (var key in source) { 
				if (Object.prototype.hasOwnProperty.call(source, key)) { 
					target[key] = source[key];
				} 
			} 
		} 
		return target; 
	};

	var obj = { name: '11', sex: '男', a: { b: 11 } };
	var o = _extends({}, obj, { className: '一年级' });
	obj.a.b = 22;
	console.log(o, '??', obj);
	//{name: "11", sex: "男", a: {b: 22}, className: "一年级"}
	//{name: "11", sex: "男", a: {b: 22}}
}






/** iterrator */
{
	let obj = {name: '11',sex: '男',a: {b: 11}}
}


/** 无法中途跳出forEach循环，break命令或return命令都不能奏效。 */
{
	let arr = ['aa','bb','cc']
	arr.forEach((item) => {
		if(item == 'bb'){
			return
		}
		console.log(item)   //  aa  cc
	})

	arr.forEach((item) => {
		if(item == 'bb'){
			break
		}
		console.log(item)   //  报错
	})

	for(let item of arr){
		if(item == 'bb'){
			break
		}
		console.log(item) //  aa  跳出循环
	}
}



{
	const proto = {
		foo: 'hello'
	};

	const obj = {
	  	foo: 'world',
	  	find() {
	    	return super.foo;
	  	}
	};

	Object.setPrototypeOf(obj, proto);
	obj.find() 	// "hello"
}

/** uper.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world。 */
{
	const proto = {
	  	x: 'hello',
	  	foo() {
	    	console.log(this.x);
	  	},
	};

	const obj = {
	  	x: 'world',
	  	foo() {
	    	super.foo();
	  	}
	}

	Object.setPrototypeOf(obj, proto);
	obj.foo() // "world"
}

/** 目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。 */
{
    const obj = {
      	foo:function() {
        	return super.foo
      	}
    }   //报错

    const obj = {
      	foo() {
        	return super.foo
      	}
    }    //正常
}


/** 变量x是单纯的解构赋值，所以可以读取对象o继承的属性；变量y和z是扩展运算符的解构赋值，只能读取对象o自身的属性，所以变量z可以赋值成功，变量y取不到值 */
{
	const o = Object.create({ x: 1, y: 2 });
	o.z = 3;

	let { x, ...newObj } = o;
	let { y, z } = newObj;
	console.log(x,y,z)// 1   undefined   3
}

{
	let aClone = { ...a };
	// 等同于
	let aClone = Object.assign({}, a);


	let ab = { ...a, ...b };
	// 等同于
	let ab = Object.assign({}, a, b);


	let aWithOverrides = { ...a, x: 1, y: 2 };
	// 等同于
	let aWithOverrides = { ...a, ...{ x: 1, y: 2 } };
	// 等同于
	let x = 1, y = 2, aWithOverrides = { ...a, x, y };
	// 等同于
	let aWithOverrides = Object.assign({}, a, { x: 1, y: 2 });


	// 并不会抛出错误，因为 x 属性只是被定义，但没执行
	let aWithXGetter = {
	  	...a,
	  	get x() {
	    	throw new Error('not throw yet');
	  	}
	};

	// 会抛出错误，因为 x 属性被执行了
	let runtimeError = {
	  	...a,
	  	...{
	    	get x() {
	      	throw new Error('throw now');
	    	}
	  	}
	};




	/** 实践中可以用来运算对象求值之类的 */
	let runtimeError = {
      	 ...{},
      	 ...{
				name: '11',
		        get x() {
		          return this.name
		        }
      		}
    };
	console.log(runtimeError)   // {name: '11',x: '11'}


	let x = 1
	const obj = {
	  	...(x > 1 ? {a: 1} : {}),
	  	b: 2,
	};
	console.log(obj) // {b: 2}



	let x = 2
	const arr = [
	  	...(x > 1 ? ['a'] : []),
	  	'b',
	];
	console.log(arr)  // ['a','b']


	let emptyObject = { ...null, ...undefined }; // 不报错
}	




{
	function getArrRepeatIndex(arr,el){
		let repeatIndex = []
		let idx = arr.lastIndexOf(el)

		while(idx !== -1){
			repeatIndex = [...repeatIndex,idx]

			if(idx > 0){
				idx = arr.lastIndexOf(el,idx - 1)
			}else{
				idx = -1
			}
		}
		return repeatIndex
	}

	let arr = ['a','b','a','c','a','d'];
	getArrRepeatIndex(arr,'a')
}

{
	function getArrRepeatIndex(arr,el){
		let repeatIndex = []
		let idx = arr.lastIndexOf(el)
		
		while(idx !== -1){
			repeatIndex = [...repeatIndex,idx]
			idx = idx > 0 ? arr.lastIndexOf(el,idx - 1) : -1
		}
		return repeatIndex
	}

	let arr = ['a','b','a','c','a','d'];
	getArrRepeatIndex(arr,'a')
}