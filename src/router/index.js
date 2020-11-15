import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "authentication" */ '../views/Login.vue')
  },
  {
    path: '/warns',
    name: 'Warns',
    component: () => import(/* webpackChunkName: "warns" */ '../views/Warns.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/oauth2/discord',
    name: 'OAuthDiscord',
    component: () => import(/* webpackChunkName: "authentication" */ '../views/OAuth/Discord.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
