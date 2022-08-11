export default {
  state: {
    reportDetailed: null,
    reportDetailedSortType: `date`
  },
  getters: {
    reportDetailed(state) {
      return state.reportDetailed
    },
    reportDetailedSort(state) {
      if (state.reportDetailed) {
        const arrDataForSort = [];

        state.reportDetailed.events.forEach(item => {
          for (let price in item.prices) {
            if (item.prices[price] == 0) return false;

            for (let distributor in item.prices[price].distributors) {
              const obj = {};

              for (let key in item) {
                if (key != `prices`) {
                  obj[key] = item[key];
                } else {
                  obj.price = parseInt(price);
                  obj.distrId = distributor;

                  for (let otherKey in item.prices[price].distributors[distributor]) {
                    obj[otherKey] = item.prices[price].distributors[distributor][otherKey];
                  }
                }
              }

              arrDataForSort.push(obj);
            }
          }
        });

        if (state.reportDetailedSortType == `date`) {
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
        } else if (state.reportDetailedSortType == `time`) {
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
        } else if (state.reportDetailedSortType == `name`) {
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
        } else if (state.reportDetailedSortType == `price`) {
          const arr = [];

          arrDataForSort.sort((a, b) => {
            return a.price > b.price ? 1 : -1
          }).forEach(event => {
            const index = arr.findIndex(item => item[0].price == event.price);

            if (index != -1) {
              arr[index].push(event);
            } else {
              arr.push([event])
            }
          });

          return arr
        } else if (state.reportDetailedSortType == `pib`) {
          const arr = [];

          arrDataForSort.sort((a, b) => {
            return a.seller_id > b.seller_id ? 1 : -1
          }).forEach(event => {
            const index = arr.findIndex(item => item[0].seller_id == event.seller_id);

            if (index != -1) {
              arr[index].push(event);
            } else {
              arr.push([event])
            }
          });

          return arr
        } else if (state.reportDetailedSortType == `distributor`) {
          const arr = [];

          arrDataForSort.sort((a, b) => {
            return a.buyer_id > b.buyer_id ? 1 : -1
          }).forEach(event => {
            const index = arr.findIndex(item => item[0].buyer_id == event.buyer_id);

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
    reportDetailedSortType(state) {
      return state.reportDetailedSortType
    }
  },
  mutations: {
    reportDetailed(state, payload) {
      return state.reportDetailed = payload;
    },
    reportDetailedSortType(state, payload) {
      return state.reportDetailedSortType = payload;
    },
    clearDetailed(state) {
      return state.reportDetailed = null;
    }
  },
  actions: {
    async reportDetailed({commit, dispatch}, payload) {
      dispatch(`setLoading`, true);

      try {
        const reportDetailed = await fetch(`/admin/reports/detailed-sold${payload}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
        .then(response => response.json())
        .then(data => {
          commit(`reportDetailed`, data);
          return data;
        })
        .catch(err => console.warn(err));

        dispatch(`setLoading`, false);

        if (!reportDetailed) {
          throw reportDetailed
        } else {
          return reportDetailed
        }
      } catch(error) {
        throw error
      }
    },
    async reportDetailedDate({commit, dispatch}, payload) {
      dispatch(`setLoading`, true);

      try {
        const reportDetailed = await fetch(`/admin/reports/detailed-sold-by-orders${payload}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
        .then(response => response.json())
        .then(data => {
          commit(`reportDetailed`, data);
          return data;
        })
        .catch(err => console.warn(err));

        dispatch(`setLoading`, false);

        if (!reportDetailed) {
          throw reportDetailed
        } else {
          return reportDetailed
        }
      } catch(error) {
        throw error
      }
    }
  }
}
