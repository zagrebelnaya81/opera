export default {
  state: {
    activeField: null,
    activeId: null
  },
  getters: {
    activeField(state) {
      return state.activeField
    },
    activeId(state) {
      return state.activeId
    }
  },
  mutations: {
    pushField(state, payload) {
      state.activeField = payload;
    },
    deleteField(state) {
      state.activeField = null;
    },
    pushActiveId(state, payload) {
      state.activeId = payload;
    },
    deleteActiveId(state) {
      state.activeId = null;
    }
  },
  actions: {
    fieldActivated({ commit }, payload) {
      commit(`pushField`, payload);
    },
    fieldDisabled({ commit }) {
      commit(`deleteField`);
    }
  }
}
