let Event = (function () {
	let obj = {}

	let listen = function(){
		let [key,fn] = Array.from(arguments)
		obj[key] = [...(obj[key] || []),fn]
	}

	let trigger = function(){
		let [key,...args] = Array.from(arguments)

		let fns = obj[key]
		if(fns.length == 0 || !fns){
			return
		}	

		for(let item of fns){
			item.apply(this,args)
		}
	}

	let removeListener = function(){
		let [key,fnName] = Array.from(arguments)

		let fns = obj[key]

		if(!fns){
			return
		}

		// if(!fnName){
		// 	fns.length = 0
		// }
		fns.length = fnName && fns.length || 0
		

		Array.from(fns,(item,index)=>{
			item == fnName && fns.splice(index,1)
		})
	}

	return {
		listen,
		trigger,
		removeListener
	}
})()