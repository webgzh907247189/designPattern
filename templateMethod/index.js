{
	class Interview{
		constroctor(){

		}

		init(){
			this.writtenTest()
			this.technicalInterview()
			this.leader()
			this.waitNotice()
		}

		writtenTest(){
			console.log('笔试')
		}

		technicalInterview(){
			console.log('聊天面试')
		}

		leader(){
			console.log('leader面试')
		}

		waitNotice(){
			console.log('入职通知')
		}
	}

	class BaiDuInterview extends Interview{
		constructor(){
			super()
		}

		writtenTest(){
			console.log('百度笔试')
		}

		technicalInterview(){
			console.log('百度聊天面试')
		}

		leader(){
			console.log('百度leader面试')
		}

		waitNotice(){
			console.log('百度入职通知')
		}
	}

	let baiduInter = new BaiDuInterview()
	baiduInter.init()
}

/**
 * https://www.jianshu.com/p/342966fdf816
 */