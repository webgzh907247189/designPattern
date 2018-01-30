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
	
}