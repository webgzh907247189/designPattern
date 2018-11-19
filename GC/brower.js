{
	function b(){
		let a = 1
		debugger
		return function(){
			debugger
			console.log(a,'1111')
			eval('')
		}
	}

	let c = b()

	c()
	/**
	 * a 无法被GC回收，因为 eval 在这里，a可能被引用，也可能没有被引用
	 */
}



{
	/**
	 * try catch(e){}  的 e <可能> 无法被GC回收
	 */
	try{
		console.log('fff',fff)
	}catch(e){
		debugger
		console.log('3',e)
	}
}