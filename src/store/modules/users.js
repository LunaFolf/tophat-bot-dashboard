import User from '../models/user.js'

const state = {}

const actions = {
  storeUsers ({ commit }, users) {
    commit('storeUsers', users)
  }
}

const mutations = {
  storeUsers (users) {
    User.insertOrUpdate({ data: users })
  }
}

export default {
  state,
  actions,
  mutations,
  namespaced: true
}
