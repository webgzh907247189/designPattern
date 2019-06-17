import Vue from 'vue'
import Router from 'vue-router'
import Router1 from './vue-router'
Vue.use(Router)

Vue.use(Router1)
new Router1({
	mode: 'hash',
	routes: [{
			path: '/home',
			name: 'home',
			component: asyncGetRouter('home')
		},
		{
			path: '/about',
			name: 'about',
			component: asyncGetRouter('about')
		}
	]
})


function asyncGetRouter(name) {
	return (resolve) => require([`@/component/${name}.vue`], resolve)
}


export default new Router({
	mode: 'hash',
	routes: [{
			path: '/home',
			name: 'home',
			component: asyncGetRouter('home')
		},
		{
			path: '/about',
			name: 'about',
			component: asyncGetRouter('about')
		}
	]
})
