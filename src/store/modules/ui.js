const state = {
  sidebarOpen: true,
  showPeek: false,
  peekHistory: []
}

const getters = {
  sidebarOpen: state => state.sidebarOpen,
  showPeek: state => state.showPeek,
  peekHistory: state => state.peekHistory
}

const actions = {
  toggleSidebar ({commit}, open) {
    commit('toggleSidebar', open)
  },
  setPeek ({commit}, open) {
    commit('setPeek', open)
  },
  peekGoBack ({commit}) {
    commit('peekGoBack')
  }
}

const mutations = {
  toggleSidebar (state, open) {
    if (open !== undefined) state.sidebarOpen = open
    else state.sidebarOpen = !state.sidebarOpen
  },
  setPeek (state, layout) {
    if (layout && layout !== true) {
      state.peekHistory.push(layout)
      state.showPeek = layout
    }
    else {
      state.peekHistory = []
      state.showPeek = false
    }
  },
  peekGoBack (state) {
    if (state.peekHistory.length  <= 1) state.showPeek = false
    else {
      state.peekHistory.pop()
      state.showPeek = state.peekHistory[state.peekHistory.length - 1]
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true
}
