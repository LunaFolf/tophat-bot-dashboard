import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from 'views/Dashboard.vue'
import Home from 'views/Home.vue'
import Preauth from 'views/PreAuth.vue'
import store from 'store'

import { hasPermissions } from 'utils/authentication'


Vue.use(VueRouter)

function isAuthed (to, from, next) {
  if (store.getters['authentication/isAuthed']) next()
  else next({ name: 'Dashboard' })
}

const routes = [
  {
    path: '/',
    name: 'Preauth',
    component: Preauth,
    beforeEnter: (to, from, next) => {
      if (!store.getters['authentication/isAuthed']) next()
      else next({ name: 'Dashboard' })
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (hasPermissions(['can.view.admin.statistics'])) next()
      else next({ name: 'Home' })
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.getters['authentication/isAuthed']) next()
      else next({ name: 'Preauth' })
    }
  },
  {
    path: '/search-results',
    name: 'SearchResults',
    component: () => import(/* webpackChunkName: "search" */ 'views/SearchResults/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "authentication" */ 'views/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    redirect: { name: 'Preauth' }
  },
  {
    path: '/warns',
    name: 'Warns',
    component: () => import(/* webpackChunkName: "warns" */ 'views/Warns/index.vue'),
    beforeEnter: isAuthed
  },
  {
    path: '/bans',
    name: 'Bans',
    component: () => import(/* webpackChunkName: "bans" */ 'views/Bans/index.vue'),
    beforeEnter: isAuthed
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ 'views/Users/index.vue'),
    beforeEnter: isAuthed
  },
  // {
  //   path: '/clan-members',
  //   name: 'ClanMembers',
  //   component: () => import(/* webpackChunkName: "users" */ 'views/Users/index.vue'),
  //   props: {
  //     filters: {
  //       clanMembers: true
  //     }
  //   },
  //   beforeEnter: isAuthed
  // },
  // {
  //   path: '/applications',
  //   name: 'Applications',
  //   component: () => import(/* webpackChunkName: "applications" */ 'views/Applications/index.vue'),
  //   beforeEnter: isAuthed
  // },
  {
    path: '/oauth2/discord',
    name: 'OAuthDiscord',
    component: () => import(/* webpackChunkName: "authentication" */ 'views/OAuth/Discord.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
