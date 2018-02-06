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
	}
	function getName(target,name,descriptor){
		return target.name = '111'
	}

	let getInstance = function (name) {
		return this.ins = this.ins || new Singleton(name)
	}

	let a = getInstance('aa')
	console.log(a)   // {name: 'aa', ins: null}

	let b = getInstance('bb')
	console.log(b)   // {name: 'aa', ins: null}
	console.log(a == b) // true
}


{

}