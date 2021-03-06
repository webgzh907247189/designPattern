{
	let arrayLike = {  
		'0': 'a',  
		'1': 'b',  
		'2': 'c',
		length: 3
	};  

	let arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']
	let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
	console.log(arr1,arr2)
}

{
	let strArr = Array.from('hello')  // ['h', 'e', 'l', 'l', 'o']  

	let namesSet = new Set(['a', 'b'])  
	let nameArr = Array.from(namesSet) // ['a', 'b']  
	console.log(strArr,nameArr)
}

{
	let arrayLike = {  
		'0': 'a',  
		'1': 'b',  
		'2': 'c',
		length: 3
	};  

	let objArr = Array.from([1, 2, 3], (x) => x * x)  // [1, 4, 9]  
	console.log(objArr)   
}


{
	let obj = {
		list: [],

		// 订阅
		listener: function (key,fn) {
			this.list[key] = [...(this.list[key] || []),fn]


			// this.list[key] = this.list[key] || []

			// this.list[key].push(fn)
			// this.list[key] = [...this.list[key],fn]
		},

		//发布
		trigger: function(){
			// let key = Array.prototype.shift.apply(arguments)
			// let [key] = Array.from(arguments)
			let [key,...args] = [...arguments]

			let listFns = this.list[key]
			if(listFns.length == 0 || !listFns){
				return
			}

			for(let itemFn of listFns){
				itemFn.apply(this,args)
			}
		}
	}

	obj.listener('eat',(food)=>{
		console.log(`晚上吃的是${food}`)
	})
	obj.listener('drink',(water)=>{
		console.log(`晚上喝的是${water}`)
	})

	obj.trigger('eat','面条')
	obj.trigger('drink','椰子水')
}




{
	let obj = {
		list: [],

		// 订阅
		listener: function (key,fn) {
			this.list[key] = [...(this.list[key] || []),fn]


			// this.list[key] = this.list[key] || []

			// this.list[key].push(fn)
			// this.list[key] = [...this.list[key],fn]
		},

		//发布
		trigger: function(){
			// let key = Array.prototype.shift.apply(arguments)
			// let [key] = Array.from(arguments)
			let [key,...args] = [...arguments]

			let listFns = this.list[key]
			if(listFns.length == 0 || !listFns){
				return
			}

			for(let itemFn of listFns){
				itemFn.apply(this,args)
			}
		}
	}

	let initEvent = function(o){
		for(let item in obj){
			o[item] = obj[item]
		}
	}

	let initObj = {}
	initEvent(initObj)

	initObj.listener('eat',(food)=>{
		console.log(`晚上吃的是${food}`)
	})
	initObj.listener('drink',(water)=>{
		console.log(`晚上喝的是${water}`)
	})

	initObj.trigger('eat','面条')
	initObj.trigger('drink','椰子水')
}



{
 	let obj = {
		list: [],

		// 订阅
		listener: function (key,fn) {
			/**
            * nextTick 的 flushCallback 每次执行 都进行拷贝一次，是有含义的
            * 
            * this.list[key] = [...(this.list[key] || []),fn]
            * 编译之后相当于 concat
            * 
            * const listFns = this.list[key] || [];this.list[key] = listFns.concat(fn);
            * 此时因为在 fn2 函数里面开始 执行 obj.listener('drink'， xx) 此时  let listFns = this.list[key] 已经确定了，指向引用地址 bbb
            * 由于进行 concat 操作，导致 新的订阅函数(obj.listener('drink'， xx)) 被推入 listFns 函数，指向一块新的引用地址ccc，但是循环里面用的还 是上次的引用地址，所以没有出现循环引用的问题 
            * 
            * 
            * this._events[eventName] ? this._events[eventName].push(callback) : this._events[eventName] = [callback];
            * 此时因为在 fn2 函数里面开始 执行 obj.listener('drink'， xx) 此时  let listFns = this.list[key] 已经确定了，指向引用地址 bbb
            * 由于进行push，导致 引用地址 bbb 被添加一个新的函数(obj.listener('drink'， xx)), 所以会出现循环引用的问题
            */

            // 写法1 -> 不太出现循环引用问题
            // this.list[key] = [...(this.list[key] || []),fn]

            // 写法2 -> 可能会出现循环引可能用问题
			this.list[key] ? this.list[key].push(fn) : this.list[key] = [fn];


			// this.list[key] = this.list[key] || []

			// this.list[key].push(fn)
			// this.list[key] = [...this.list[key],fn]
		},

		//发布
		trigger: function(){
			// let key = Array.prototype.shift.apply(arguments)
			// let [key] = Array.from(arguments)
			let [key,...args] = [...arguments]

			let listFns = this.list[key]
			if(listFns.length == 0 || !listFns){
				return
			}
			// 防止在一个事件监听器中监听同一个事件，接而导致死循环 ？？？？
			// 同一个事件监听同一个事件，造成这个数组对应的key的数组
			// 每执行一次，数组增加一次，所以数组会持续的增加
			let resultList = this.arrayClone(listFns,listFns.length)
			for(let itemFn of resultList){
				itemFn.apply(this,args)
			}
		},

		arrayClone(arr, i) {
			let copy = new Array(i);
			while (i--){
			  copy[i] = arr[i];
			}
			return copy;
		},

		// 监听一次
		once: function(key,fn){
			// 先绑定，调用后删除
			function wrap() {
                fn.apply(this,[...arguments]);
                this.removeListener(key, wrap);
            }
			// 自定义属性 为了删除
			// 为了取消订阅 ->  不然没办法过滤
            wrap.listen = fn;
            this.listener(key, wrap);
		},

		//取消订阅
		removeListener: function(){
			let [key,fn] = Array.from(arguments)
			let fns = this.list[key]

			if(!fns){
				return;
			}
			
			/**
			 * [if description]
			 * 如果没有传fn,则取消订阅所有函数
			 * @DateTime    2018-01-17T00:57:53+0800
			 */
			if(!fn){
				fns.length = 0
			}else{

				/**
				 * 下面写法错误 (在once情况下出错，原因 ->  ) 
				 */
				// Array.from(fns,(item,index)=>{
				// 	item == fn && fns.splice(index,1)
				// })


				this.list[key] = fns.filter(itemFn => fn !== itemFn && fn !== itemFn.listen)
			}
		}
	}

	function fn1(food){
		console.log(`晚上吃的是${food}`)
	}

	function fn2(water){
		console.log(`晚上喝的是${water}`)
	}

	function fn3(food){
		console.log(`我只会监听一次... 参数是${food}`,this)
	}

	function fn4(food){
		console.log(`once测试`,)
	}

	obj.listener('eat',fn1)
	obj.listener('eat',(foods)=>{
		console.log(`今晚的晚餐是${foods}`)
	})
	obj.listener('drink',fn2)

	obj.once('eat',fn3)
	obj.once('eat',fn4)

	// obj.trigger('eat','面条')
	obj.removeListener('eat',fn1)
	obj.trigger('eat','全家')

	obj.trigger('drink','椰子水')

	/**
	 *	今晚的晚餐是全家
	 * 	我只会监听一次...  参数是全家 {list: Array(0), listener: ƒ, trigger: ƒ, once: ƒ, removeListener: ƒ}
	 *  once测试
	 *  晚上喝的是椰子水
	 */
}



{
	// 效率更高的从数组中去除一个元素 (同位赋值 替换)
	function spliceOne(list, index) {
		for (; index + 1 < list.length; index++){
			list[index] = list[index + 1];
		}
		list.pop();
	}
		
	let arr = [1,4,5,'z','f',{name: 'zz'}]
	spliceOne(arr,1)
}
{
	let arr = [1,4,5,'z','f',{name: 'zz'}]
	let popItem = arr.copyWithin(1,2).pop()
	console.log(arr,'result',popItem)
	// [1, 5, "z", "f", {name: 'zzz'}]         "result"       {name: "zz"}
}


{
	// 代替 unshift 操作
	let arr = [1,4,5,'z','f',{name: 'zz'}]
	let arrLength = arr.length;

	for(let i = arrLength; i>= 0; i--){
		arr[i] = arr[i - 1]
	}
	console.log(arr)
	arr[0] = '代替 unshift 操作'
	console.log(arr,arr.length)
}


{
	let gards = [[70,71,72,73],[90,92],[89,90,91]]
	function getAverage(arr){
		let sum = 0;
		let itemAverage = []
		for(let i = 0; i < arr.length; i++){
			let itemArr = arr[i];
			for(let k = 0; k < itemArr.length; k++){
				sum += itemArr[k]
			}
			itemAverage.push(sum / itemArr.length)
			sum = 0
		}

		return itemAverage;
	}
	console.log(getAverage(gards));


	{
		console.log(Reflect.apply(Object.prototype.toString, '1', []));
		console.log(Object.prototype.toString.call('1'))
	}

	let gards1 = [[70,71,72,73],[90,92],[89,90,91]]
	function getCount(arr){
		// let getMaxLength = Math.max.apply(null, arr.reduce((result,item) => [...result, item.length], [arr.length]))
		let getMaxLength = Reflect.apply(Math.max, Math, arr.reduce((result,item) => [...result, item.length], [arr.length]))
		// Reflect.apply(func, thisArg, args)

		let sum = 0;
		let itemAverage = []
		for(let i = 0; i < getMaxLength; i++){
			let itemList = []
			for(let k = 0; k < getMaxLength; k++){
				(arr[k] || [])[i] && itemList.push(arr[k][i]);
				sum += (arr[k] || [])[i] || 0;
			}
			itemAverage.push(sum / itemList.length)
			sum = 0
			itemList = []
		}

		return itemAverage;
	}
	console.log(getCount(gards1));
}









/**
 * 单次监听器 的 另一种 实现方式
 */
{
	let obj = {
	   	list: [],

	   	// 订阅
	   	listener: function (key,fn) {
			this.list[key] = [...(this.list[key] || []),fn]
	   	},

	   	//发布
	   	trigger: function(){
			let [key,...args] = [...arguments]

		   	let listFns = this.list[key]
		   	if(listFns.length == 0 || !listFns){
			   return
		   	}

		   	for(let itemFn of listFns){
				itemFn.apply(this,args)
		   	}
	   	},

	   	// 监听一次
	   	once: function(key,fn){
			this.listener(key, _onceWrap(this, key, fn))

			function _onceWrap(target, type, listener) {
				// 拓展this  ->   { fired: 标识位，是否应当移除此监听器,  wrapFn: 包装后的函数，用于移除监听器 }

				let state = { fired: false, wrapFn: undefined, target, type, listener };
				let wrapped = onceWrapper.bind(state);

				// 真正的监听器
				wrapped.listener = listener;
				state.wrapFn = wrapped;
				// 返回包装后的函数
				return wrapped;
			}

			function onceWrapper(...args) {
				if (!this.fired) {
					// 监听器会先被移除，然后再调用
					this.target.removeListener(this.type, this.wrapFn);
					this.fired = true;
					Reflect.apply(this.listener, this.target, args);
				}
		    }
	   	},

	   	//取消订阅
	  	removeListener: function(){
			let [key,fn] = Array.from(arguments)
		   	let fns = this.list[key]

		   	if(!fns){
				return;
		   	}
		   
		   	if(!fn){
				fns.length = 0
		   	}else{
				this.list[key] = fns.filter(itemFn => fn !== itemFn && fn !== itemFn.listen)
		   	}
	   	}
   	}

   	function fn1(food){
		console.log(`晚上吃的是${food}`)
   	}

    function fn3(food){
	    console.log(`我只会监听一次... 参数是${food}`,this)
    }

    function fn4(food){
	    console.log(`once测试`,)
    }

    obj.listener('eat',fn1)
    obj.listener('eat',(foods)=>{
	    console.log(`今晚的晚餐是${foods}`)
    })

    obj.once('eat',fn3)
    obj.once('eat',fn4)

    obj.removeListener('eat',fn1)
    obj.trigger('eat','全家')


   /**
	*	今晚的晚餐是全家
	* 	我只会监听一次...  参数是全家 {list: Array(0), listener: ƒ, trigger: ƒ, once: ƒ, removeListener: ƒ}
	*  晚上喝的是椰子水
	*/
}

/**
 * https://cnodejs.org/topic/571e0c445a26c4a841ecbcf1  (通过源码解析 Node.js 中 events 模块里的优化小细节)
 * 
 * https://www.cnblogs.com/tugenhua0707/p/4687947.html
 * 
 * https://juejin.im/post/5b125ad3e51d450688133f22  (node的events模块)
 * 
 * https://juejin.im/post/5c55512af265da2deb6a7dc8  (NodeJS Events模块源码学习)
 */


 {
	class EventEmitter {
		constructor() {
		  this.events = {};
		}

		// 实现订阅
		on(type, callBack) {
		  if (!this.events) this.events = Object.create(null);
	  
		  if (!this.events[type]) {
			this.events[type] = [callBack];
		  } else {
			this.events[type].push(callBack);
		  }
		}

		// 删除订阅
		off(type, callBack) {
		  if (!this.events[type]) return;
		  this.events[type] = this.events[type].filter(item => {
			return item !== callBack;
		  });
		}

		// 只执行一次订阅事件
		once(type, callBack) {
		  function fn() {
			callBack();
			this.off(type, fn);
		  }
		  this.on(type, fn);
		}

		// 触发事件
		emit(type, ...rest) {
		  this.events[type] && this.events[type].forEach(fn => fn.apply(this, rest));
		}
	  }
	  // 使用如下
	  const event = new EventEmitter();

	  function ss(){
		  console.log('???')
	  }
	  
	  event.once("dbClick", ss);
	  event.once("dbClick", ss);

	  event.emit('dbClick')
 }