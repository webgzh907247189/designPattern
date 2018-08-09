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




/**
 * ?????????????????
 */
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
		},500)
	}

	count()
}