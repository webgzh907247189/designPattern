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
		constructor(name,teamColor,...[friends = [],enemies = [],state = 'live']){
			this.friends = friends;     //保存队友列表
		    this.enemies = enemies;     // 保存敌人列表
		    this.state = state;         // 玩家状态
		    this.name = name;           // 角色名字
		    this.teamColor = teamColor; // 队伍的颜色
		}

		win(){
			console.log(`${this.name}赢了`)
		}

		lose(){
			console.log(`${this.name}输了`)
		}

		die(){
			let allDide = true
			this.state = 'dide'
			for(let item of this.friends){   // 查找每一个队友的生存情况
			 	if(item.state !== 'dide'){
			 		allDide = false
			 		break   //return 也可以
			 	}
			}

			if(allDide){        // 全部队友死亡
				this.lose()
				for(let item of this.enemies){  // 通知敌人胜利了
					item.win()
				}

				for(let item of this.friends){ // 通知队友失败了
					item.lose()
				}
			}
		}
	}

	let heroFactory = function(name,color){
		let newPlayer = new Hero(name,color)

		for(let item of players){ 

			let isFriendArr = {true: 'friends',false: 'enemies'}[item.teamColor === newPlayer.teamColor]
			newPlayer[isFriendArr] = [...newPlayer[isFriendArr],item]
			item[isFriendArr] = [...item[isFriendArr],newPlayer]

			/** 上面的为优化写法 */

			// if(item.teamColor === newPlayer.teamColor){
			// 	newPlayer.friends = [...newPlayer.friends,item]  // 相互添加队友列表
			// 	item.friends = [...item.friends,newPlayer]
			// }else{
			// 	newPlayer.enemies = [...newPlayer.enemies,item]  // 相互添加到敌人列表
			// 	item.enemies = [...item.enemies,newPlayer]
			// }
		}
		players = [...players,newPlayer] // 保证不重复添加队友(所以从二个开始添加)
		return newPlayer
	}

	let p1 = heroFactory('p1','red')
	let p2 = heroFactory('p2','red')
	let p3 = heroFactory('p3','blue')
	let p4 = heroFactory('p4','blue')

	p1.die()
	p2.die()
}


{
	let players = []
	class Hero {
		constructor(name,teamColor,...[state = 'live']){
		    this.state = state;         // 玩家状态
		    this.name = name;           // 角色名字
		    this.teamColor = teamColor; // 队伍的颜色
		}

		win(){
			console.log(`${this.name}赢了`)
		}

		lose(){
			console.log(`${this.name}输了`)
		}

		die(){
			this.state = 'dide'
			playerDirector.ReceiveMessage('playerDead',this);
		}

		remove(){
			playerDirector.ReceiveMessage('removePlayer',this);
		}

		changeTeam(){
			playerDirector.ReceiveMessage('changeTeam',this);
		}
	}

	let heroFactory = function(name,color){
		let newPlayer = new Hero(name,color)
		playerDirector.ReceiveMessage('addPlayer',newHero)
		return newPlayer
	}

	let playerDirector = (function(){
		let operations = {
			addPlayer(){},
			removePlayer(){},
			changeTeam(){}
		}

		return {
			ReceiveMessage(...argums){
				let [message] = argums
				operations[message].apply(this,argums)
			}
		}
	})()

	let p1 = heroFactory('p1','red')
	let p2 = heroFactory('p2','red')
	let p3 = heroFactory('p3','blue')
	let p4 = heroFactory('p4','blue')

	p1.die()
	p2.die()
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