{
	function order500(orderType,isPay,count) {
		if(orderType == 1 && isPay == true){
			console.log('亲爱的用户，您中奖了100元红包了')
		}else{
			return 'nextSuccessor'
		}
	}

	function order200(orderType,isPay,count){
		if(orderType == 2 && isPay == true){
			console.log('亲爱的用户，您中奖了20元红包了')
		}else{
			return 'nextSuccessor'
		}
	}

	function orderNormal(orderType,isPay,count){
		if(count > 0) {
	        console.log("亲爱的用户，您已抽到10元优惠卷");
	    }else {
	        console.log("亲爱的用户，请再接再厉哦");
	    }
	}

	class Chain{
		constructor(fn){
			this.fn = fn
			this.successor = null
		}

		setNextSuccessor(successor){
			return this.successor = successor
		}

		passRequest(){
			let result = this.fn.apply(this,arguments)
			if(result == 'nextSuccessor'){
				this.successor.passRequest.apply(this.successor,arguments)
			}
		}
	}


	let order500Chain = new Chain(order500)
	let order200Chain = new Chain(order200)
	let orderNormalChain = new Chain(orderNormal)

	order500Chain.setNextSuccessor(order200Chain)
	order200Chain.setNextSuccessor(orderNormalChain)

	order500Chain.passRequest(1,true,500)   // '亲爱的用户，您中奖了100元红包了'
	order500Chain.passRequest(2,true,500)   // '亲爱的用户，您中奖了20元红包了'
	order500Chain.passRequest(3,true,500);  // 亲爱的用户，您已抽到10元优惠卷
	order500Chain.passRequest(1,false,0);   // 亲爱的用户，请再接再厉哦
}