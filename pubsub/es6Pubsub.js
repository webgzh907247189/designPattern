let pubsub = {
	listSet: new Set(),
	listener(){
		let [key,fn] = Array.from(arguments)
		this.listSet.add(fn)
	},
	trigger(){
		new Prxoy(target,{
			
		})
	}

}