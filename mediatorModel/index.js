/**
 * https://juejin.im/post/59f1c484f265da431c6f8940#heading-1
 * http://taobaofed.org/blog/2015/11/16/es7-decorator/
 */
{
	@desFn
	class Hero {
		constructor(props){
		}
	}
	function desFn(target,name,descriptor) {
		target.age = 'test'
		// return target
	}

	console.log(Hero.age)
}


{
	class Hero {
		constructor(name,enemy=null){
			this.name = name
			this.enemy = enemy 
		}

		@windes
		win(winer){
			console.log(`${winer.name}赢了`)
		}

		lose(){
			console.log(`${this.name}输了`)
		}

		die(){
			this.lose()
			this.enemy.win(this.enemy)
		}

	}
	
	/** 注意ES6中的arguments */
	function windes(target,name,descriptor) {
		let fn = descriptor.value 

		// descriptor.value = (...argums)=>{
		// 	console.log(argums) argums 是一个数组 

		// 	return fn.apply(target,argums)
		// }

		descriptor.value = ()=>{
			console.log(arguments)
			return fn.apply(target,...arguments)
		}

		return descriptor
	}

	let p1 = new Hero('张三')
	let p2 = new Hero('李四')
	p1.enemy = p2
	p2.enemy = p1

	p1.die()
}