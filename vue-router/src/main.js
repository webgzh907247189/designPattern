import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import fastclick from 'fastclick'
fastclick.attach(document.body)

Vue.prototype.axios = axios

new Vue({
	el: '#app',
	router,
    template: '<App/>',
	components: {
		App
	}
})