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
			let [key] = [...arguments]

			let listFns = this.list[key]
			if(listFns.length == 0 || !listFns){
				return
			}

			for(let itemFn of listFns){
				itemFn.apply(this,arguments)
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