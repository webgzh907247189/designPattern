import Vue from 'vue'
import Router from 'vue-router'
// import Router1 from './vue-router'
// Vue.use(Router)

Vue.use(Router)
// new Router1({
// 	// mode: 'hash',
// 	routes: [{
// 			path: '/home',
// 			name: 'home',
// 			component: asyncGetRouter('home')
// 		},
// 		{
// 			path: '/about',
// 			name: 'about',
// 			component: asyncGetRouter('about')
// 		}
// 	]
// })


function asyncGetRouter(name) {
	return (resolve) => require([`@/component/${name}.vue`], resolve)
}

// function getRoute(){
//     const pathList = require.context('./module', false, /\.js$/);

//     const pathKeysList = pathList.keys();
//     return pathKeysList.reduce((result, itemPath) => {
//         const resultPathObj = result;

//         const itemModule = itemPath.slice(2, -3);
//         resultPathObj[itemModule] = pathList(itemPath).default || {};
//         return resultPathObj;
//     }, Object.create(null));
// }
// const routerObj = getRoute();

import Home from '@/component/home'
import About from '@/component/about'
import Test from '@/component/test'
import TestChild from '@/component/testChild'

const router1 = new Router({
	mode: 'hash',
	routes: [{
			path: '/home',
			name: 'home',
			component: Home
		},
		{
			path: '/about',
			name: 'about',
			component: About
		},
		{
			path: '/test',
			name: 'test',
			component: Test,
			children: [
				{
					path: 'testChild',
					name: 'testChild',
					component: TestChild
				}
			]
		},
	]
})
router1.beforeEach((to,form, next) => {
	console.log(to,form, next)
	setTimeout(() => {
		console.log('1111')
		next()
	}, 1000)	
})
router1.beforeEach((to,form, next) => {
	console.log(to,form, next)
	setTimeout(() => {
		console.log('2222')
		next()
	}, 1000)
})

export default router1

// 分层后进行分块然后提交给合成线程进行光栅化成为位图，然后drawquad传给浏览器进程绘制
// 浏览器渲染流程： 构建Dom树 -> 计算css属性-> 构建布局树-> 分层 -> 光栅化 -> 绘制
// 重排就是要重新计算css - > 构建布局树，重绘则不需要

// 合适的进行分层
// documentFrame离线更新
// 批量更新样式
// 使用will-change生成独立的帧


{
	var s = {
		name: '1',
		children: [
			{name: '2'},
			{name: '22', children: [
				{name: '33'},
				{name: '44'},
				{name: '55', children: [
					{name: '66', children: [
						{name: '77'},
					]},
					{name: 'tt'}
				]}
			]}
		]
	}

	function getList(obj){
		const name = obj.name;
		const list = obj.children ? obj.children: [];
		return getName(list, name)
	}
	function getName(list = [], name){
		let result = []
		for(let i=0; i<list.length; i++){
			const item = list[i]
			if(item.children){
				const resultChildren = getName(item.children, `${name}/${item.name}`)
				result = [...result, ...resultChildren]
				continue
			}
			result.push(`${name}/${item.name}`)
		}
		return result;
	}
	console.log(getList(s))
}

{
	var arr = [1,2,4,5,6]
	function getRandom(arr){
		return arr.sort((a,b) => {
			return Math.random() - 0.5
		})
		
	}
	console.log(getRandom(arr))
}