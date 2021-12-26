import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import fastclick from 'fastclick'
import store from './store/index1'
fastclick.attach(document.body)

Vue.prototype.axios = axios

import(/* webpackChunkName:"testgzh1" */'./test').then((data) => {
	window.data = data
})
new Vue({
	el: '#root',
	router,
	store,
    template: '<App/>',
	components: {
		App
	}
})