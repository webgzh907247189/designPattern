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
			// 防止在一个事件监听器中监听同一个事件，接而导致死循环
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