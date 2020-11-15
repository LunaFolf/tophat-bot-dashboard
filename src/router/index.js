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
    component: () => import(/* webpackChunkName: "warns" */ '../views/Warns/index.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users/index.vue')
  },
  {
    path: '/users/:id',
    name: 'UsersView',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users/view.vue')
  },
  {
    path: '/applications',
    name: 'Applications',
    component: () => import(/* webpackChunkName: "applications" */ '../views/Applications.vue')
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
