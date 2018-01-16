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

			for(let itemFn of listFns){
				itemFn.apply(this,args)
			}
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
				Array.from(fns,(item,index)=>{
					item == fn && fns.splice(index,1)
				})
			}
		}
	}

	function fn1(food){
		console.log(`晚上吃的是${food}`)
	}
	obj.listener('eat',fn1)
	obj.listener('eat',(foods)=>{
		console.log(`今晚的晚餐是${foods}`)
	})

	function fn2(water){
		console.log(`晚上喝的是${water}`)
	}
	obj.listener('drink',fn2)


	// obj.trigger('eat','面条')
	obj.removeListener('eat',fn1)
	obj.trigger('eat','全家')

	obj.trigger('drink','椰子水')
}


/**
 * https://www.cnblogs.com/tugenhua0707/p/4687947.html
 */