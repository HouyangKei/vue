import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: process.env.BASE_URL+'/',
    name: 'home',
     component: () => import('../views/Home.vue')
  },
  {
    path: process.env.BASE_URL+'game',
    name: 'game',
    component: () => import('../views/game.vue')
  },
  {
    path: process.env.BASE_URL+'user/:id',
    name: 'user',
    component: () => import('../views/user.vue')
  }
]

const router = new VueRouter({
	mode: 'history',
  routes:routes
})

export default router
