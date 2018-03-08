/**
 * https://juejin.im/post/59f1c484f265da431c6f8940#heading-1
 * http://taobaofed.org/blog/2015/11/16/es7-decorator/		(bable 转换后 的代码，其中有一句是 descriptor = decorator(target, key, descriptor) || descriptor; )
 */
{
	@desFn
	class Hero {
		constructor(props){
		}
	}
	function desFn(target,name,descriptor) {
		target.age = 'test'
		// return target   报错
	}

	console.log(Hero.age)  //test
}


{
	class Hero {
		constructor(name,enemy = null){
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
		descriptor.value = (...argums)=>{
			console.log(argums)  //argums 是一个数组 
			return fn.apply(null,argums)
		}

		/**
		 * 下面写法是错误的 (因为arguments的原因)
		 */
		// descriptor.value = ()=>{
		// 	console.log(arguments)
		// 	return fn.apply(target,...arguments)
		// }

		return descriptor
	}

	let p1 = new Hero('张三')
	let p2 = new Hero('李四')
	p1.enemy = p2
	p2.enemy = p1

	p1.die()
}

{
	let players = []
	class Hero {
		constructor(name,enemies,state,teamColor){
			this.friends = [];    //保存队友列表
		    this.enemies = [];    // 保存敌人列表
		    this.state = 'live';  // 玩家状态
		    this.name = name;     // 角色名字
		    this.teamColor = teamColor; // 队伍的颜色
		}

		win(){
			console.log(`${this.name}赢了`)
		}

		lose(){
			console.log(`${this.name}输了`)
		}

		die(){
			// this.lose()
			// this.enemy.win(this.enemy)
		}
	}

}

/**
 * https://www.cnblogs.com/Chen-XiaoJun/p/6193403.html
 * http://taobaofed.org/blog/2015/11/16/es7-decorator/
 * http://www.cnblogs.com/tugenhua0707/p/5198407.html#_labe9
 * https://segmentfault.com/a/1190000007343993
 *
 *
 * https://segmentfault.com/a/1190000010581422
 */