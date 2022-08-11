export default {
  state: {
    reportPriceCut: null,
    reportPriceCutSortType: `date`
  },
  getters: {
    reportPriceCut(state) {
      return state.reportPriceCut
    },
    reportPriceCutSort(state) {
      if (state.reportPriceCut) {
        const arrDataForSort = [];

        state.reportPriceCut.events.forEach(item => {
         
          for (let price in item.prices) {
           
            // if (item.prices[price] == 0) return false;
            const obj = {};

            for (let key in item) {
              if (key != `prices`) {
                obj[key] = item[key];
              } else {
                obj.price = parseInt(price);
                obj.totalAmount = item.prices[price];
                obj.totalSum = parseInt(item.prices[price]) * parseInt(price);
              }
            }
        
            arrDataForSort.push(obj)
          }
        });

        if (state.reportPriceCutSortType == `date`) {
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
        } else if (state.reportPriceCutSortType == `time`) {
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
        } else if (state.reportPriceCutSortType == `name`) {
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
        } else if (state.reportPriceCutSortType == `hall`) {
          const arr = [];

          arrDataForSort.sort((a, b) => {
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
        } else if (state.reportPriceCutSortType == `price`) {
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
        }
      }
    },
    reportPriceCutSortType(state) {
      return state.reportPriceCutSortType
    }
  },
  mutations: {
    reportPriceCut(state, payload) {
      return state.reportPriceCut = payload;
    },
    reportPriceCutSortType(state, payload) {
      return state.reportPriceCutSortType = payload;
    },
    clearPriceCut(state) {
      return state.reportPriceCut = null;
    }
  },
  actions: {
    async reportPriceCut({commit, dispatch}, payload) {
      dispatch(`setLoading`, true);

      try {
        const reportPriceCut = await fetch(`/admin/reports/sold-price-groups${payload}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
        .then(response => response.json())
        .then(data => {
          commit(`reportPriceCut`, data);
          return data;
        })
        .catch(err => console.warn(err));

        dispatch(`setLoading`, false);

        if (!reportPriceCut) {
          throw reportPriceCut
        } else {
          return reportPriceCut
        }
      } catch(error) {
        throw error
      }
    }
  }
}
