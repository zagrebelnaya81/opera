export default {
  state: {
    ReportOnLineSale: null,
    ReportOnLineSaleSortType: `date`
  },
  getters: {
    ReportOnLineSale(state) {
      return state.ReportOnLineSale
    },
    ReportOnLineSaleSort(state) {
      if (state.ReportOnLineSale) {
        if (state.ReportOnLineSaleSortType == `date`) {
          const arr = [];

          state.ReportOnLineSale.events.sort((a, b) => {
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
        } else if (state.ReportOnLineSaleSortType == `time`) {
          const arr = [];

          state.ReportOnLineSale.events.sort((a, b) => {
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

          state.ReportOnLineSale.events.sort((a, b) => {
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
    ReportOnLineSaleSortType(state) {
      return state.ReportOnLineSaleSortType
    }
  },
  mutations: {
    ReportOnLineSale(state, payload) {
      return state.ReportOnLineSale = payload;
    },
    ReportOnLineSaleSortType(state, payload) {
      return state.ReportOnLineSaleSortType = payload;
    },
    clearKasir(state) {
      return state.ReportOnLineSale = null;
    }
  },
  actions: {
    async ReportOnLineSale({commit, dispatch}, payload) {
      dispatch(`setLoading`, true);

      try {
        console.log(`/admin/reports/online-sold${payload}`);
        const ReportOnLineSale = await fetch(`/admin/reports/online-sold${payload}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
        .then(response => response.json())
        .then(data => {
          commit(`ReportOnLineSale`, data);
          console.log(data);
          return data;
        })
        .catch(err => console.warn(err));

        dispatch(`setLoading`, false);

        if (!ReportOnLineSale) {
          throw ReportOnLineSale
        } else {
          return ReportOnLineSale
        }
      } catch(error) {
        throw error
      }
    }
  }
}
