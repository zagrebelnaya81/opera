export default {
  state: {
    reportSeniorKasir: null,
    reportSeniorKasirSortType: `date`
  },
  getters: {
    reportSeniorKasir(state) {
      return state.reportSeniorKasir
    },
    reportSeniorKasirSort(state) {
      if (state.reportSeniorKasir) {
        if (state.reportSeniorKasirSortType == `date`) {
          const arr = [];

          state.reportSeniorKasir.events.sort((a, b) => {
            return new Date(Date.parse(a.dateTime)) > new Date(Date.parse(b.dateTime)) ? 1 : -1
          }).forEach(event => {
            const index = arr.findIndex(item => item[0].date == event.date);

            if (index != -1) {
              arr[index].push(event);
            } else {
              arr.push([event])
            }
          });

          return arr
        } else if (state.reportSeniorKasirSortType == `time`) {
          const arr = [];

          state.reportSeniorKasir.events.sort((a, b) => {
            return parseInt(a.time.split(`:`).join(``)) > parseInt(b.time.split(`:`).join(``)) ? 1 : -1
          }).forEach(event => {
            const index = arr.findIndex(item => item[0].time == event.time);

            if (index != -1) {
              arr[index].push(event);
            } else {
              arr.push([event])
            }
          });

          return arr
        } else if (state.reportSeniorKasirSortType == `name`) {
          const arr = [];

          state.reportSeniorKasir.events.sort((a, b) => {
            return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1
          }).forEach(event => {
            const index = arr.findIndex(item => item[0].title == event.title);

            if (index != -1) {
              arr[index].push(event);
            } else {
              arr.push([event])
            }
          });

          return arr
        } else if (state.reportSeniorKasirSortType == `hall`) {
          const arr = [];

          state.reportSeniorKasir.events.sort((a, b) => {
            return a.hall.toUpperCase() > b.hall.toUpperCase() ? 1 : -1
          }).forEach(event => {
            const index = arr.findIndex(item => item[0].hall == event.hall);

            if (index != -1) {
              arr[index].push(event);
            } else {
              arr.push([event])
            }
          });

          return arr
        }
      }
    },
    reportSeniorKasirSortType(state) {
      return state.reportSeniorKasirSortType
    }
  },
  mutations: {
    reportSeniorKasir(state, payload) {
      return state.reportSeniorKasir = payload;
    },
    reportSeniorKasirSortType(state, payload) {
      return state.reportSeniorKasirSortType = payload;
    },
    clearSeniorKasir(state) {
      return state.reportSeniorKasir = null;
    }
  },
  actions: {
    async reportSeniorKasir({commit, dispatch}, payload) {
      dispatch(`setLoading`, true);

      try {
        const reportSeniorKasir = await fetch(`/admin/reports/sold-period${payload}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
        .then(response => response.json())
        .then(data => {
          commit(`reportSeniorKasir`, data);
          return data;
        })
        .catch(err => console.warn(err));

        dispatch(`setLoading`, false);

        if (!reportSeniorKasir) {
          throw reportSeniorKasir
        } else {
          return reportSeniorKasir
        }
      } catch(error) {
        throw error
      }
    }
  }
}
