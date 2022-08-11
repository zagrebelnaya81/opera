export default {
  state: {
    reportEvents: null,
    reportEventsSortType: `date`
  },
  getters: {
    reportEvents(state) {
      return state.reportEvents
    },
    reportEventsSort(state) {
      if (state.reportEvents) {
        if (state.reportEventsSortType == `date`) {
          const arr = [];

          state.reportEvents.events.sort((a, b) => {
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
        } else if (state.reportEventsSortType == `time`) {
          const arr = [];

          state.reportEvents.events.sort((a, b) => {
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
        } else if (state.reportEventsSortType == `name`) {
          const arr = [];

          state.reportEvents.events.sort((a, b) => {
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
        } else if (state.reportEventsSortType == `hall`) {
          const arr = [];

          state.reportEvents.events.sort((a, b) => {
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
    reportEventsSortType(state) {
      return state.reportEventsSortType
    }
  },
  mutations: {
    reportEvents(state, payload) {
      return state.reportEvents = payload;
    },
    reportEventsSortType(state, payload) {
      return state.reportEventsSortType = payload;
    },
    clearEvents(state) {
      state.reportEvents = null;
    }
  },
  actions: {
    async reportEvents({commit, dispatch}, payload) {
      dispatch(`setLoading`, true);

      try {
        const reportEvents = await fetch(`/admin/reports/event-tickets-sold${payload}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
        .then(response => response.json())
        .then(data => {
          commit(`reportEvents`, data);
          return data;
        })
        .catch(err => console.warn(err));

        dispatch(`setLoading`, false);

        if (!reportEvents) {
          throw reportEvents
        } else {
          return reportEvents
        }
      } catch(error) {
        throw error
      }
    }
  }
}
