import { getTypes, get } from 'api/applications.js'

const state = {
  types: [],
  applications: null
}

const getters = {
  types: state => state.types,
  applications: state => state.applications
}

const actions = {
  getApplications ({ commit }) {
    get().then(res => {
      commit('storeApplications', res.data.applications)
    })
  },
  pushApplications ({ commit }, applications) {
    if (typeof applications === 'object') applications = [applications]

    commit('pushApplications', applications)
  },
  getTypes ({ commit }) {
    getTypes().then(res => {
      commit('storeTypes', res.data.applicationTypes)
    })
  }
}

const mutations = {
  storeApplications (state, applications) {
    state.applications = applications
  },
  pushApplications (state, applications) {
    state.applications = applications.concat(state.applications)
  },
  storeTypes (state, types) {
    state.types = types
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
