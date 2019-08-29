import Vue from 'vue'
import App from './App'
import createRouter from '../router'
import createStore from '../store'

// 服务端渲染  每个人都应该有自己的vue实列
export default ()=>{
	const router = createRouter()
	const store = createStore()
	const app = new Vue({
		router,
		store,
		render: h => h(App)
	})
	return {app,router,store}
}