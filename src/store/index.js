import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import authentication from './modules/authentication.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authentication
  },
  plugins: [
    createPersistedState({
      paths: [
        'authentication'
      ]
    })
  ]
})

export default store