export default {
  state: {
    reportKassDay: null,
    reportKassDaySortType: `date`
  },
  getters: {
    reportKassDay(state) {
      return state.reportKassDay
    },
    reportKassDaySort(state) {
      if (state.reportKassDay) {
        if (state.reportKassDaySortType == `date`) {
          const arr = [];

          state.reportKassDay.events.sort((a, b) => {
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
        } else if (state.reportKassDaySortType == `time`) {
          const arr = [];

          state.reportKassDay.events.sort((a, b) => {
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

          state.reportKassDay.events.sort((a, b) => {
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
    reportKassDaySortType(state) {
      return state.reportKassDaySortType
    }
  },
  mutations: {
    reportKassDay(state, payload) {
      return state.reportKassDay = payload;
    },
    reportKassDaySortType(state, payload) {
      return state.reportKassDaySortType = payload;
    },
    clearKasir(state) {
      return state.reportKassDay = null;
    }
  },
  actions: {
    async reportKassDay({commit, dispatch}, payload) {
      dispatch(`setLoading`, true);

      try {
        console.log(`/admin/reports/day-sold${payload}`);
        const reportKassDay = await fetch(`/admin/reports/day-sold${payload}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
        .then(response => response.json())
        .then(data => {
          commit(`reportKassDay`, data);
          console.log(data);
          return data;
        })
        .catch(err => console.warn(err));

        dispatch(`setLoading`, false);

        if (!reportKassDay) {
          throw reportKassDay
        } else {
          return reportKassDay
        }
      } catch(error) {
        throw error
      }
    }
  }
}
