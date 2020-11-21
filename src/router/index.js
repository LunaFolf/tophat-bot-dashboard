import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import store from '../store'

Vue.use(VueRouter)

function isAuthed (to, from, next) {
  if (store.getters['authentication/isAuthed']) next()
  else next({ name: 'Dashboard' })
}

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/search-results',
    name: 'SearchResults',
    component: () => import(/* webpackChunkName: "search" */ '../views/SearchResults/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "authentication" */ '../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    redirect: { name: 'Dashboard' }
  },
  {
    path: '/warns',
    name: 'Warns',
    component: () => import(/* webpackChunkName: "warns" */ '../views/Warns/index.vue'),
    beforeEnter: isAuthed
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users/index.vue'),
    beforeEnter: isAuthed
  },
  {
    path: '/users/:id',
    name: 'UsersView',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users/view.vue'),
    beforeEnter: isAuthed
  },
  {
    path: '/applications',
    name: 'Applications',
    component: () => import(/* webpackChunkName: "applications" */ '../views/Applications.vue'),
    beforeEnter: isAuthed
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
