export default {
  state: {
    reportKasir: null,
    reportKasirSortType: `date`
  },
  getters: {
    reportKasir(state) {
      return state.reportKasir
    },
    reportKasirSort(state) {
      if (state.reportKasir) {
        if (state.reportKasirSortType == `date`) {
          const arr = [];

          state.reportKasir.events.sort((a, b) => {
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
        } else if (state.reportKasirSortType == `time`) {
          const arr = [];

          state.reportKasir.events.sort((a, b) => {
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
        } else {
          const arr = [];

          state.reportKasir.events.sort((a, b) => {
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
        }
      }
    },
    reportKasirSortType(state) {
      return state.reportKasirSortType
    }
  },
  mutations: {
    reportKasir(state, payload) {
      return state.reportKasir = payload;
    },
    reportKasirSortType(state, payload) {
      return state.reportKasirSortType = payload;
    },
    clearKasir(state) {
      return state.reportKasir = null;
    }
  },
  actions: {
    async reportKasir({commit, dispatch}, payload) {
      dispatch(`setLoading`, true);

      try {
        console.log(`/admin/reports/employee-sold${payload}`);
        const reportKasir = await fetch(`/admin/reports/employee-sold${payload}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
        .then(response => response.json())
        .then(data => {
          commit(`reportKasir`, data);
          console.log(data);
          return data;
        })
        .catch(err => console.warn(err));

        dispatch(`setLoading`, false);

        if (!reportKasir) {
          throw reportKasir
        } else {
          return reportKasir
        }
      } catch(error) {
        throw error
      }
    }
  }
}
