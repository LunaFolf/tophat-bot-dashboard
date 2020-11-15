import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import authentication from './modules/authentication.js'
import ui from './modules/ui.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    authentication, ui
  },
  plugins: [
    createPersistedState({
      paths: [
        'authentication', 'ui'
      ]
    })
  ]
})

export default store