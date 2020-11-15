const state = {
  sidebarOpen: true
}

const getters = {
  sidebarOpen: state => state.sidebarOpen
}

const actions = {
  toggleSidebar ({commit}, open) {
    commit('toggleSidebar', open)
  }
}

const mutations = {
  toggleSidebar (state, open) {
    if (open !== undefined) state.sidebarOpen = open
    else state.sidebarOpen = !state.sidebarOpen
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}