/**
 * 代理模式
 * 
 * 代理的优点：
 * 代理对象可以代替本体被实例化，并使其可以被远程访问；
 * 它还可以把本体实例化推迟到真正需要的时候；对于实例化比较费时的本体对象，或者因为尺寸比较大以至于不用时不适于保存在内存中的本体，我们可以推迟实例化该对象；
 * @param       {[type]}                 argument [description]
 * @return      {[type]}                          [description]
 * http://www.cnblogs.com/tugenhua0707/p/5198407.html#_labe3
 */

{
	class TeaMilkGirl {
		constructor(name){
			this.name = name
		}
	}

	class Ceo {
		constructor(name,gift){
			this.name = name
		}

		sendMarriageRing(girl,gift){
			console.log(`hi，${this.name}送${girl}一个礼物:${gift}`)
		}
	}

	class ProxyObj {
		constructor(girl){
			this.girl = girl
		}

		sendGift(gift){
			new Ceo('强东').sendMarriageRing(this.girl.name,gift)
		}
	}

	let proxy = new ProxyObj(new TeaMilkGirl('奶茶妹'))
	proxy.sendGift('两瓶红牛')

	// hi，强东送奶茶妹一个礼物:两瓶红牛
}






{
	let imgSrc = (function () {
		let imgNode = document.createElement('img')
		document.body.append(imgNode)
		console.log('11111111')
		let img = new Image();
		img.onload = function(){
			console.log('666666666')
			console.log(this.src)
			imgNode.src = this.src
		}
		return {
			setSrc(src){
				console.log('333333333333')
				imgNode.src = "http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif";
				console.log('444444444444')
				img.src = src
				console.log('5555555555555555')
			}
		}
	})()

	console.log('2222222222')
	imgSrc.setSrc('https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png')
}


{
	let imgSrc = (function (){
		let imgNode = document.createElement('img')
		document.body.append(imgNode)
		return{
			setSrc(src){
				imgNode.src = src
			}
		}
	})()

	let proxy = (function(){
		let img = new Image();
		img.onload = function(src){
			imgSrc.setSrc(this.src)
		}
		return {
			setSrc(src){
				imgSrc.setSrc("http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif");
				img.src = src
			}
		}
	})()

	proxy.setSrc("https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png")
}

/**
 * 第一种方案是使用一般的编码方式实现图片的预加载技术，首先创建imgNode元素，然后调用imgSrc.setSrc该方法的时候，先给图片一个预加载图片，
 * 当图片加载完的时候，再给img元素赋值，
 * 
 * 第二种方案是使用代理模式来实现的，imgSrc 函数只负责创建img元素，代理函数Proxy 负责给图片设置loading图片，当图片真正加载完后的话，
 * 调用imgSrc中的imgSrc.setSrc方法设置图片的路径；
 * 
 * 他们之间的优缺点如下：
 * 
 * 第一种方案一般的方法代码的耦合性太高，一个函数内负责做了几件事情，比如创建img元素，和实现给未加载图片完成之前设置loading加载状态等多项事情，
 * 未满足面向对象设计原则中单一职责原则；并且当某个时候不需要代理的时候，需要从imgSrc 函数内把代码删掉，这样代码耦合性太高。
 *
 * 第二种方案使用代理模式，其中imgSrc 函数只负责做一件事，创建img元素加入到页面中，其中的加载loading图片交给代理函数proxy 去做，
 * 当图片加载成功后，代理函数ProxyImage 会通知及执行myImage 函数的方法，同时当以后不需要代理对象的话，我们直接可以调用本体对象的方法即可；
 *
 *
 * 从上面代理模式我们可以看到，代理模式和本体对象中有相同的方法setSrc,这样设置的话有如下2个优点：
 * 用户可以放心地请求代理，他们只关心是否能得到想要的结果。假如我门不需要代理对象的话，直接可以换成本体对象调用该方法即可。
 * 在任何使用本体对象的地方都可以替换成使用代理。
 */



{
	let mult = function(){
		console.log('我执行了乘法')
		return Array.from(arguments).reduce((result,item)=>{
			return result *= item*1
		},1)
	}

	let plus = function(){
		console.log('我执行了加法')
		return Array.from(arguments).reduce((result,item)=>{
			return result += item*1
		},0)
	}

	let proxy = function(fn){
		let cache = {}
		return function(){
			let args = [...arguments]
			// if(cache[args]){
			// 	return cache[args]
			// }
			// return cache[args] = fn.apply(this,args)
			
			// return cache[args] = cache[args] && cache[args] || fn.apply(this,args)
			
			return cache[args] = cache[args] || fn.apply(this,args)
		}
	}

	let proxyMult = proxy(mult)
	let a = proxyMult(1,2,3,4)
	console.log(a)  //24

	let b = proxyMult(1,2,3,4)
	console.log(b)  //缓存 24

	let proxyPlus = proxy(plus)
	let c = proxyPlus(1,2,3,4)
	console.log(c)  // 10

	let d = proxyPlus(1,2,3,4)
	console.log(d)  // 缓存10
}