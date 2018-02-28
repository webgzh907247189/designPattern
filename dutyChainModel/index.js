/**
 * 职责链模式的优点是：
 * 		1. 解耦了请求发送者和N个接收者之间的复杂关系，不需要知道链中那个节点能处理你的请求，所以你只需要把请求传递到第一个节点即可。
 *   	2. 链中的节点对象可以灵活地拆分重组，增加或删除一个节点，或者改变节点的位置都是很简单的事情。
 *    	3. 我们还可以手动指定节点的起始位置，并不是说非得要从其实节点开始传递的.
 *
 * 缺点：职责链模式中多了一点节点对象，可能在某一次请求过程中，大部分节点没有起到实质性作用，他们的作用只是让
 * 请求传递下去，从性能方面考虑，避免过长的职责链提高性能。
 */
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


{
	function Fn1() {
	    console.log(1);
	    return "nextSuccessor";
	}

	function Fn2() {
	    console.log(2);
	    let self = this;
	    setTimeout(function(){
	    	console.log(self) // this.successor -> chainFn2
	        self.next();
	    },1000);
	}

	function Fn3() {
	    console.log(3);
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

		next(){
			this.successor.passRequest.apply(this.successor,arguments)
		}
	}

	let chainFn1 = new Chain(Fn1);
	let chainFn2 = new Chain(Fn2);
	let chainFn3 = new Chain(Fn3);

	// 然后指定节点在职责链中的顺序
	chainFn1.setNextSuccessor(chainFn2);
	chainFn2.setNextSuccessor(chainFn3);

	chainFn1.passRequest()    // 按照顺序打印1 2 3
}

//http://91porn.io/forum.php?x=52486