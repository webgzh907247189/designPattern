/**
 * https://zhangzhao.name/2018/01/18/%E5%A6%82%E4%BD%95%E8%AE%A9%20(a%20==%201%20&&%20a%20==%202%20&&%20a%20==%203)%20%E8%BF%94%E5%9B%9E%20true/
 * 
 * https://www.cnblogs.com/wwhhq/p/8196217.html
 * const proxiedObject = new Proxy(initialObj, handler);
 * handler对象基本上是一个包含一组“拦截”的对象，每当访问对象属性时都会被触发
 */
{	
	let obj = {a: 0}
	let proxyObj = new Proxy(obj,{
		get(target){
			return obj.a++
		},
		set(target,key,value){
			target[key] = '111'
		}
	})
	proxyObj.name = 'web'
	console.log(proxyObj.a,obj) // 0 {a: 1,name: '111'}
}

{
	let proxyObj = new Proxy({i: 1}, {
		get(target) { 
			return () => target.i++ 
		}
	});
	console.log(proxyObj) // {i: 1}

	if (proxyObj == 1 && proxyObj == 2 && proxyObj == 3) {
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
 //https://yangbo5207.github.io/wutongluo/ji-chu-jin-jie-xi-lie/liu-3001-zai-chrome-zhong-guan-cha-han-shu-diao-yong-zhan-3001-zuo-yong-yu-lian-3001-bi-bao.html
}