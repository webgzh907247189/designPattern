/**
 * 函数节流
 * 是指一定时间内js方法只跑一次。比如人的眨眼睛，就是一定时间内眨一次。这是函数节流最形象的解释
 */
// let canRun = true
// window.onscroll = function(){
// 	if(!canRun){
// 		return
// 	}

// 	canRun = false
// 	setTimeout(function(){
// 		canRun = true
// 		console.log('开始执行了','111111111111')
// 	},300)
// }


/**
 * 函数防抖
 * 是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车。
 *
 * 如果方法多次触发，则把上次记录的延迟执行代码用clearTimeout清掉，重新开始。
 * ，用队列的方式也可以做到这种效果?????????
 */

let timer = null
window.onscroll = function(){
	clearTimeout(timer)

	timer = setTimeout(function(){
		console.log('开始执行了','111111111111')
	},300)
}
