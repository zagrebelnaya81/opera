export default {
  state: {
    kasir: {},
  },
  getters: {
    kasir(state) {
      return state.kasir
    },
  },
  mutations: {
    setKasir(state, kasir) {
      state.kasir = kasir;
    }
  },
  actions: {
    setKasir({commit}, kasir) {
      commit(`setKasir`, kasir);
    },
    clearReports({commit}) {
      commit(`clearKasir`);
      commit(`clearSeniorKasir`);
      commit(`clearDistributors`);
      commit(`clearPriceCut`);
      commit(`clearEvents`);
      commit(`clearDetailed`);
    }
  }
}
