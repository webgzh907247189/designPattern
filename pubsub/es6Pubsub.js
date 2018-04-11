/**
 * 使用ES6 实现发布订阅
 * @type {Object}
 * https://juejin.im/post/5a7d6ecc5188257a5911b9bb?utm_source=gold_browser_extension#heading-10
 * https://www.cnblogs.com/WhiteHorseIsNotHorse/p/7016010.html   ??receiver
 */

{
	let pubsub = {
		listSet: new Set(),
		listener(){
			let [fn] = Array.from(arguments)
			this.listSet.add(fn)
			return this
		},
		trigger(target){
			let _this = this
			return new Proxy(target,{
				set(target,key,value){
					let result = Reflect.set(target,key,value)
					for(let item of _this.listSet){
						item()
					}
					return result
				}
			})
		}
	}
	let obj = {name: '111',sex: '男'}
	function print() {
		console.log(`${proxyResult.name},${proxyResult.sex}`)    //张三,男
	}
	function print1(){
		console.log(`我是二号位: ${proxyResult.name},${proxyResult.sex}`)  //我是二号位: 张三,男
	}

	pubsub.listener(print).listener(print1)

	let proxyResult = pubsub.trigger(obj)
	console.log(proxyResult)   //Proxy {name: "111", sex: "男"}[[Handler]]: Object[[Target]]: Object[[IsRevoked]]: false 

	proxyResult.name = '张三'
	console.log(proxyResult,obj) // Proxy {name: "姓名", sex: "男"}                 {name: "姓名", sex: "男"}
}