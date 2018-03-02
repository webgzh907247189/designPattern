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
 * https://www.baidu.com/s?wd=es6%E7%9A%84%E7%BB%A7%E6%89%BF&rsv_spt=1&rsv_iqid=0x982c81160000d1c8&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&tn=baiduhome_pg&rsv_enter=1&rsv_sug3=14&rsv_sug1=16&rsv_sug7=100&rsv_t=0b96ApvjVg6R%2B9H6sfk1K7N9r0w5Xar5OIbAJ68dlA3qPSweqYYuv%2BSAYV%2B%2B6iEkOiCd
 *
 * https://segmentfault.com/a/1190000007678185  (promise的reject之后，then还会执行)
 */