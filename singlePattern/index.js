/**
 * 单体模式提供了一种将代码组织为一个逻辑单元的手段，这个逻辑单元中的代码可以通过单一变量进行访问。
 *   (有es6的proxy需要结合，待完成？？？？？？？？？,单列的弹窗，cathay，虚拟代理合并http请求的理解???????????)
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
	 * 给target写内容,就 target (不需要return)
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
	@getName
	class Singleton {
		constructor(name){
			this.name = name
		}

		@getSingleName
		getSingleName(drink,eat){
			console.log(this.name,'使用装饰器了',drink,eat)
		}
	}
	function getName(target,name,descriptor){
		target.age = '222'
	}
	/**
	 * 给target写内容,就 target (不需要return)
	 * 给descriptor写你被人,就return   descriptor
	 */
	function getSingleName(target,name,descriptor){
		let fn = descriptor.value
		descriptor.value = function(...args){
			args = [...args,'吃饭']

			// console.log(args)   //["吃饭", "喝水"]
			return fn.apply(this,args)
		}
		return descriptor
	}

	/**
	 * 通过闭包使得ins保存在内存中, 每次运行getInstance(), 判断ins的值来做处理
	 */
	let getInstance = (function (name) {
		var ins = null
		return function(name){
			return ins = ins || new Singleton(name)	
		}
	})()

 	let a = getInstance('aa')
	a.getSingleName('喝水')
	console.log(a)   // {name: 'aa'}

	let b = getInstance('bb')
	console.log(b)   // {name: 'aa'}
	console.log(a == b) // true
}


{	
	let initDes = function(des){
		return function(target,name,descriptor){
			let fn = descriptor.value
			descriptor.value = function(...args){
				args = [...args,des]
				return fn.apply(this,args)
			}
			return descriptor
		}
	}

	class CreateDiv{
		constructor(html){
			this.html = html
			this.init()
		}

		@initDes('测试带参数的装饰器')
		init(decorationDes){
			let div = document.createElement('div')
			div.innerHTML = `${this.html +','+decorationDes}`
			document.body.append(div)
		}
	}


	let proxy = (function(){
		let ins = null
		return function(html){
			return ins = ins || new CreateDiv(html)
		}
	})()

	let a = proxy('插入aaa')
	let b = proxy('插入bbb')

	console.log('CreateDiv',a == b) //CreateDiv true
}



{	
	let createModalCount = function(count){
		return function(target,name,descriptor){
			let fn = descriptor.value
			descriptor.value = function (...args){
				args = [...args,count]
				fn.apply(this,args)
			}
			return descriptor
		}
	}

	class CreateModal{
		constructor(modalDes){
			this.html = modalDes
			this.createModal()
		}

		@createModalCount(1)
		createModal(count){
			console.log('创建了',`${count + '次'}`)
			let div = document.createElement('div')
			div.id = 'modal'
			div.innerHTML = this.html
			document.body.append(div)

			this.closeModal(div.id )
		}

		closeModal(id){
			let modal = document.getElementById(id)
			modal.onclick = function(){
				modal.style.display = 'none'
			}
		}

		showModal(){
			document.getElementById('modal').style.display = 'block'
			return this
		}
	}

	let proxy = (function(){
		let createDiv = null
		return function(modalDes){
			return createDiv = createDiv && createDiv.showModal() || new CreateModal(modalDes)
		}
	})()

	document.getElementById('root').onclick = function(){
		let a = proxy('我是modal的内容')
		console.log(a) // {html: "我是modal的内容"}
	}
}











{
	class CreateModal{
		constructor(modalDes){
			this.html = modalDes
			// this.modal = null
			this.createModal()
		}

		createModal(){
			console.log('创建了modalTest')
			let div = document.createElement('div')
			div.id = 'modal-test'
			div.innerHTML = this.html
			document.body.append(div)

			this.closeModal(div.id)
		}

		closeModal(id){
			let modal = document.getElementById(id)
			modal.onclick = function(){
				modal.style.display = 'none'
			}
		}

		showModal(){
			document.getElementById('modal-test').style.display = 'block'
			return this
		}
	}

	function getModal(desText){
		return this.modalTest = this.modalTest && this.modalTest.showModal() || new CreateModal(desText)
	}

	document.getElementById('test').onclick = function(){
		getModal('modal的内容aaa')
	}
}



// {	
// 	let initDes = function (text){
// 		return function(target,name,descriptor){
// 			let fn = descriptor.value
// 			descriptor.value = function (...args){
// 				args = [...args,text]
// 				fn.apply(this,args)
// 			}
// 			return descriptor
// 		}
// 	}

// 	class Create{
// 		constructor(fn,desText){
// 			console.log('创建了')
// 			this.html = desText
// 			this.fn = fn

// 			this.init()
// 		}

// 		@initDes('描述追加')
// 		init(...des){
// 			this.fn.apply(this,des)
// 		}
// 	}

// 	let proxy = (function(){
// 		let createResult = null
// 		return function(fn,desText){
// 			return createResult = createResult || new Create(fn,desText)
// 		}
// 	})()

// 	function createDiv(desText){
// 		let div = document.createElement('div')
// 		div.id = '111'
// 		div.innerHTML = `${this.html +','+ desText}`
// 		document.body.append(div)
// 	}

// 	function createIframe(desText){
// 		let iframe = document.createElement('iframe')
// 		iframe.id = '2222'
// 		iframe.innerHTML = `${this.html +','+ desText}`
// 		document.body.append(iframe)
// 	}

// 	document.getElementById('decouple-test').onclick = function(){
// 		let a = proxy(createDiv,'创建的div')
// 		console.log(a)

// 		let b = proxy(createIframe,'创建的Iframe')
// 		console.log(b)
// 	}
// }


{	
	let initDes = function (text){
		return function(target,name,descriptor){
			let fn = descriptor.value
			descriptor.value = function (...args){
				args = [...args,text]
				fn.apply(this,args)
			}
			return descriptor
		}
	}

	class Create{
		constructor(fn,desText){
			console.log('创建了')
			this.html = desText
			this.fn = fn

			this.init()
		}

		@initDes('描述追加')
		init(...des){
			this.fn.apply(this,des)
		}
	}

	let proxy = function(fn){
		let createResult = null

		console.log(createResult, ' createResultcreateResultcreateResult')
		return function(desText){
			return createResult = createResult || new Create(fn,desText)
		}
	}

	function createDiv(desText){
		let div = document.createElement('div')
		div.id = '111'
		div.innerHTML = `${this.html +','+ desText}`
		document.body.append(div)
	}

	function createIframe(desText){
		let iframe = document.createElement('iframe')
		iframe.id = '2222'
		iframe.innerHTML = `${this.html +','+ desText}`
		document.body.append(iframe)
	}

	
	document.getElementById('decouple-test').onclick = function(){
		let proxya = proxy(createDiv)
		let a = proxya('创建的div')
		console.log(a)

		let proxyb = proxy(createIframe)
		let b = proxyb('创建的Iframe')
		console.log(b)
	}
}



/**
 * 理解模块模式
 */
{	
	class CustomType{
		constructor(){
			this.name = 'web'
		}

		getName(){
			return this.name
		}

	}

	let obj = (function(){
		let privateA = 'privateName'

		let o = new CustomType()
		o.sex = 'nan'
		o.getPrivete = function(){
			return privateA
		}
		return o
	})()

	console.log(obj.sex,obj.getPrivete(),obj.name,obj.getName())  // 'nan' 'privateName' 'web' 'web'
}