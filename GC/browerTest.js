// {	
// 	/**
// 	 * demo1
// 	 */
// 	function b(){
// 		let a = []
// 		for(let i=0; i<50; i++){
// 			a[i] = new Array(10000).join('*')
// 		}
// 		// debugger
// 		return function(){
// 			debugger
// 			console.log(a,'1111')
// 			eval('')
// 		}
// 	}

// 	let c = b()

// 	c()
// 	/**
// 	 * a 无法被GC回收，因为 eval 在这里，a可能被引用，也可能没有被引用
// 	 *
// 	 * liu  觉得可以回收
// 	 */
// }




// {	
// 	/**
// 	 * demo2
// 	 */
// 	function b(){
// 		let a = []
// 		for(let i=0; i<50; i++){
// 			a[i] = new Array(10000).join('*')
// 		}
// 		// debugger
// 		return function(){
// 			debugger
// 			console.log(a,'1111')
// 			eval('')
// 		}
// 	}

// 	let c = []

// 	c.push(b())
// 	/**
// 	 * a 无法被GC回收，因为 eval 在这里，a可能被引用，也可能没有被引用
// 	 *
// 	 */
// }



// {	
// 	/**
// 	 * demo3
// 	 */
// 	function b(){
// 		let a = new Array(10000000).join('*')
// 		// debugger
// 		return function(){
// 			debugger
// 			// console.log(a,'1111')
// 			eval('')
// 		}
// 	}

// 	let c = b()

// 	c()
// 	/**
// 	 * a 无法被GC回收，因为 eval 在这里，a可能被引用，也可能没有被引用
// 	 */
// }



// {	
// 	/**
// 	 * demo4
// 	 */
// 	function b(){
// 		let a = new Array(10000000).join('*')
// 		// debugger
// 		return function(){
// 			debugger
// 			// console.log(a,'1111')
// 			window.eval('')
// 		}
// 	}

// 	let c = b()

// 	c()
// 	/**
// 	 * a 在debugegr的适合查看发现是可以被回收的
// 	 * 但是在performance里面查看   貌似   没有被 回收
// 	 */
// }



// {	
// 	/**
// 	 * demo5
// 	 */
// 	function test() {
// 	  	let a = [];
// 	  	for (var i = 0; i < 50; i++) {
// 	    	a[i] = new Array(1000000).join('*');
// 	  	}
// 	  	return function() {
// 	  		debugger
// 	    	eval("");
// 	  	}
// 	}
// 	let temp = [];
// 	setInterval(function() {
// 	  	temp.push(test());
// 	}, 3000);
// 	/**
// 	 *  a 不会被回收   performance里面查看   貌似   没有被 回收
// 	 */
// }