export default {
  state: {
    menu: [],
    openMenu: false,
    additionInfo: []
  },
  getters: {
    menu(state) {
      return state.menu
    },
    menuOpen(state) {
      return state.openMenu
    },
    additionInfo(state) {
      return state.additionInfo
    }
  },
  mutations: {
    setMenu(state, payload) {
      state.menu = payload
    },
    setAdditionInfo(state, payload) {
      state.additionInfo = payload
    },
    triggerMenu(state) {
      state.openMenu = !state.openMenu;
    }
  },
  actions: {
    async getMenu({commit, getters}) {
      try {
        const menu = await fetch(`/api/v1/menu?lang=${getters.documentLang}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
        .then(response => response.json())
        .catch(error => console.log(error))

        if (menu.data) {
          commit(`setMenu`, menu.data);

          return menu.data
        } else {
          throw menu;
        }
      } catch(error) {
        throw error
      }
    },
    async getAdditionInfo({commit, getters}) {
      try {
        const additionInfo = await fetch(`/api/v1/settings?lang=${getters.documentLang}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
        .then(response => response.json())
        .catch(error => console.log(error))

        if (additionInfo.data) {
          commit(`setAdditionInfo`, additionInfo.data);

          return additionInfo.data
        } else {
          throw additionInfo;
        }
      } catch(error) {
        throw error
      }
    }
  }
}
