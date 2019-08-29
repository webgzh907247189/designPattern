import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../src/component/home'
import App from '../ssr/client/App'

Vue.use(VueRouter)

export default () => {
    return new VueRouter({
        mode: 'history',
        routes: [{
                path: '/home',
                name: 'home',
                component: Home
            },
            // {
                // path: '/',
                // name: 'App',
                // component: App
            // }
        ]
    })
}