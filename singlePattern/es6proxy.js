/**
 * https://zhangzhao.name/2018/01/18/%E5%A6%82%E4%BD%95%E8%AE%A9%20(a%20==%201%20&&%20a%20==%202%20&&%20a%20==%203)%20%E8%BF%94%E5%9B%9E%20true/?utm_medium=social&utm_source=wechat_session
 * 
 */
{	
	let obj = {a: 0}
	let a = new Proxy(obj,{
		get(traget){
			return obj.a++
		}
	})

	console.log(a.a,a) // 0 {a: 1}
}

{
	var a = new Proxy({ i: 1 }, {
	  get(target) { return () => target.i++ }
	});

	console.log(a)
	if (a == 1 && a == 2 && a == 3) {
	  console.log('Hello World!');
	}
}

{
	var i = 1
	Object.defineProperty(window, 'a', {
	  get() { return i++ }
	})
	console.log(a === 1,a)

	if (a === 1 && a === 2 && a === 3) {
	  console.log('Hello World!');
	}
}


{
	var a = { i: 1 }
	Object.defineProperty(a, 'value', {
	  enumerable: false,
	  configurable: false,
	  get() { return a.i },
	  set() { a.i++ }
	})
	a.value = 10
	console.log(a.i) // 2
}

{

}