/**
 * 单体模式提供了一种将代码组织为一个逻辑单元的手段，这个逻辑单元中的代码可以通过单一变量进行访问。
 * 
 * 单体模式的优点是：
 * 可以用来划分命名空间，减少全局变量的数量。
 * 使用单体模式可以使代码组织的更为一致，使代码容易阅读和维护。
 * 可以被实例化，且实例化一次。
 */

// https://juejin.im/post/5a6e78abf265da3e3f4cf085?utm_source=gold_browser_extension
// https://juejin.im/post/59df4f74f265da430f311909#heading-0
// http://www.cnblogs.com/tugenhua0707/p/5198407.html#_labe1
// https://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/001431917590955542f9ac5f5c1479faf787ff2b028ab47000


{	
	@getName
	class Singleton {
		constructor(name){
			this.name = name
			this.ins = null
		}

		@getSingleName
		getSingleName(eat,drink){
			console.log(this.name,'使用装饰器了',eat,drink)
		}
	}
	function getName(target,name,descriptor){
		target.age = '111'
	}
	/**
	 * 给target写内容,就return    target
	 * 给descriptor写你被人,就return   descriptor
	 */
	function getSingleName(target,name,descriptor){
		let fn = descriptor.value
		descriptor.value = function(...args){
			args = [...args,'喝水']

			// console.log(args)   //["吃饭", "喝水"]
			return fn.apply(this,args)
		}
		return descriptor
	}

	let getInstance = function (name) {
		return this.ins = this.ins || new Singleton(name)
	}

	let a = getInstance('aa')
	a.getSingleName('吃饭')
	console.log(a)   // {name: 'aa', ins: null}

	let b = getInstance('bb')
	console.log(b)   // {name: 'aa', ins: null}
	console.log(a == b) // true


	console.log(Singleton.age,a.age) // 111 undefined
}


{

}