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
		let img = new Image();

		console.log('闭包内先执行','000')
		img.onload = function(){
			console.log('调用执行','4444')
			console.log(this.src)
			imgNode.src = this.src
			console.log('调用执行','555')
		}
		return {
			setSrc(src){
				console.log('调用执行','111')
				imgNode.src = "http://img.lanrentuku.com/img/allimg/1212/5-121204193Q9-50.gif";
				console.log('调用执行','2222')
				img.src = src
				console.log('调用执行','3333')
			}
		}
	})()

	imgSrc.setSrc('https://img.alicdn.com/tps/i4/TB1b_neLXXXXXcoXFXXc8PZ9XXX-130-200.png')
}