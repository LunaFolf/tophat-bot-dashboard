import User from '../models/user.js'
import { search as searchEndpoint } from '@/api/search.js'
import router from '@/router'

const state = {
  query: null,
  results: null,
  searching: false
}

const getters = {
  query: state => state.query,
  results: state => state.results,
  searching: state => state.searching
}

const actions = {
  setQuery ({ commit }, newQuery) {
    commit('setQuery', newQuery)
  },
  search ({ commit }) {
    commit('setSearching', true)
    searchEndpoint(state.query)
      .then(res => {
        User.insert({
          data: res.data.users
        })
        res.data.warns.forEach(warn => {
          User.insert({
            data: warn.User
          })
        })
        res.data.applications.forEach(app => {
          User.insert({
            data: app.User
          })
        })
        commit('store', res.data)
      })
      .finally(() => {
        commit('setSearching', false)
      })
  },
  store ({ commit }, results) {
    commit('store', results)
  }
}

const mutations = {
  setQuery (state, newQuery) {
    state.query = newQuery
    if (router.history.current.name !== 'SearchResults') router.push({ name: 'SearchResults' })
  },
  store (state, results) {
    state.results = results
  },
  setSearching (state, searching) {
    state.searching = searching
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
