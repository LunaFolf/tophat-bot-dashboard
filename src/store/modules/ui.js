const state = {
  sidebarOpen: true,
  showPeek: false
}

const getters = {
  sidebarOpen: state => state.sidebarOpen,
  showPeek: state => state.showPeek
}

const actions = {
  toggleSidebar ({commit}, open) {
    commit('toggleSidebar', open)
  },
  setPeek ({commit}, open) {
    commit('setPeek', open)
  }
}

const mutations = {
  toggleSidebar (state, open) {
    if (open !== undefined) state.sidebarOpen = open
    else state.sidebarOpen = !state.sidebarOpen
  },
  setPeek (state, layout) {
    if (layout && layout !== true) state.showPeek = layout
    else state.showPeek = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
