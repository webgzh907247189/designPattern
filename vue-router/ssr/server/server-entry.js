import createApp from '../client/main'


// 服务端渲染  每个人都应该有自己的vue实列
// 导出给node使用

// context是renderToString的第一个参数
export default (context)=>{
	// 最好使用promise
	// const {app,router} = createApp()
	// router.push(context.url) //渲染当前的页面
	// return app

	return new Promise((resolve,reject)=>{
		const {app,router,store} = createApp()
		router.push(context.url) //渲染当前的页面
		// 解决异步组件问题
		router.onReady(()=>{
			// 获取当前跳转到到 匹配到组件
			let matchs = router.getMatchedComponents()

			if(matchs.length === 0){
				return reject({
					code: 404
				})
			}

			// matchs 匹配到到组件，在服务端执行(可能是多个组件，所以使用Promise.all 处理)
			Promise.all(matchs.map((item)=>{
				if(item.asyncDate){
					return item.asyncDate(store)
				}
			})).then(()=>{
				// item.asyncDate 会改变state

				// console.log(store.state,'store.state')
				context.state = store.state
				resolve(app)
			})			
		},reject)
	})
}

