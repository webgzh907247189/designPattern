import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

function asyncGetRouter(name) {
	return (resolve) => require([`@/component/${name}.vue`], resolve)
}


export default new Router({
	mode: 'history',
	routes: [{
			path: '/',
			name: 'Test',
			component: asyncGetRouter('test')
		}
	]
})
