import { DateTime } from 'luxon'
import router from '../../router'

const initalState = {
  access_token: null,
  expiry: null,
  id: null,
  username: null,
  discriminator: null,
  tag: null,
  avatar: null,
  mfa_enabled: false
}

const state = {
  ...initalState
}

const getters = {
  authentication: state => state,
  isAuthed: state => !!state.access_token
}

const actions = {
  saveToken ({ commit }, { token, expiry }) {
    commit('saveToken', { token, expiry })
  },
  saveUser ({commit}, user) {
    commit('saveUser', user)
  },
  logout ({commit}) {
    commit('logout')
  }
}

const mutations = {
  saveToken (state, { token, expiry }) {
    state.access_token = token
    state.expiry = expiry || DateTime.local().plus({ days: 2 }).toISO()
  },
  saveUser (state, user) {
    state.id = user.id,
    state.username = user.username,
    state.discriminator = user.discriminator,
      state.tag = `${user.username}#${user.discriminator}`,
    state.avatar = user.avatar,
    state.mfa_enabled = user.mfa_enabled
  },
  logout (state) {
    for (var key in initalState) {
      state[key] = initalState[key]
    }
    router.push({ name: 'Logout' })
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
