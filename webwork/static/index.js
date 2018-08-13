{
	function loop(){

		setTimeout(()=>{
			while(1){
				console.log(Math.random())
				return loop()
			}
		},500)
	}
	loop()


	setTimeout(()=>{
		console.log('111111111111')
	},0)
}


{
	function * _count(){
		while(1){
			yield console.log(Math.random())
		}
	}

	let result = _count()

	function count(){
		setTimeout(()=>{
			result.next()
			count()
		},500)
	}

	count()
}


// http://www.css88.com/archives/7724
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Atomics