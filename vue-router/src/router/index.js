import Vue from 'vue'
// import Router from 'vue-router'
import Router1 from './vue-router'
// Vue.use(Router)

Vue.use(Router1)
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

function getRoute(){
    const pathList = require.context('./module', false, /\.js$/);

    const pathKeysList = pathList.keys();
    return pathKeysList.reduce((result, itemPath) => {
        const resultPathObj = result;

        const itemModule = itemPath.slice(2, -3);
        resultPathObj[itemModule] = pathList(itemPath).default || {};
        return resultPathObj;
    }, Object.create(null));
}
const routerObj = getRoute();

import Home from '@/component/home'
import About from '@/component/about'
export default new Router1({
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
		}
	]
})
