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
		let [key] = Array.from(arguments)

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