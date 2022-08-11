export default {
  state: {
    reportDistributors: null,
    reportDistributorsSortType: `date`
  },
  getters: {
    reportDistributors(state) {
      return state.reportDistributors
    },
    reportDistributorsSort(state) {
      if (state.reportDistributors) {
        const formatObj = state.reportDistributors.distributors;
        const arrDataForSort = [];

        for (let distr in formatObj) {
          for (let event in formatObj[distr]) {
            let obj = formatObj[distr][event];
            obj.distrId = distr;
            arrDataForSort.push(obj);
          }
        }

        if (state.reportDistributorsSortType == `date`) {
          const arr = [];

          arrDataForSort.sort((a, b) => {
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
        } else if (state.reportDistributorsSortType == `time`) {
          const arr = [];

          arrDataForSort.sort((a, b) => {
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
        } else if (state.reportDistributorsSortType == `name`) {
          const arr = [];

          arrDataForSort.sort((a, b) => {
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
        } else if (state.reportDistributorsSortType == `distributor`) {
          const arr = [];

          arrDataForSort.sort((a, b) => {
            return a.distrId > b.distrId ? 1 : -1
          }).forEach(event => {
            const index = arr.findIndex(item => item[0].distrId == event.distrId);

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
    reportDistributorsSortType(state) {
      return state.reportDistributorsSortType
    }
  },
  mutations: {
    reportDistributors(state, payload) {
      return state.reportDistributors = payload;
    },
    reportDistributorsSortType(state, payload) {
      return state.reportDistributorsSortType = payload;
    },
    clearDistributors(state) {
      state.reportDistributors = null;
    }
  },
  actions: {
    async reportDistributors({commit, dispatch}, payload) {
      dispatch(`setLoading`, true);

      try {
        const reportDistributors = await fetch(`/admin/reports/distributors-sold${payload}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
        .then(response => response.json())
        .then(data => {
          commit(`reportDistributors`, data);
          return data;
        })
        .catch(err => console.warn(err));

        dispatch(`setLoading`, false);

        if (!reportDistributors) {
          throw reportDistributors
        } else {
          return reportDistributors
        }
      } catch(error) {
        throw error
      }
    }
  }
}
