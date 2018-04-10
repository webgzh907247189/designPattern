/**
 * 使用ES6 实现发布订阅
 * @type {Object}
 * https://juejin.im/post/5a7d6ecc5188257a5911b9bb?utm_source=gold_browser_extension#heading-10
 */
let pubsub = {
	listSet: new Set(),
	listener(){
		let [key,fn] = Array.from(arguments)
		this.listSet.add(fn)
	},
	trigger(){
		new Prxoy(target,{
			
		})
	}

}