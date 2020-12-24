import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/mime',
    name: 'Mime',
    component: () => import('../views/mime/index.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/profile/index.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
