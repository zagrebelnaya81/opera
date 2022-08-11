export default {
    state: {
        ordersList: [
        {
          id: 1,
          name: `Звіт по продажу квитків по касиру - user user (за датою продажу)`,
          from: '',
          to: '',
          action: {
            name: `ReportKasir`
          }
        },
        {
          id: 2,
          name: `Звіт по продажу квитків для ст. касира (за датою продажу)`,
          from: '',
          to: '',
          action: {
            name: `ReportSeniorKasir`
          }
        },
        {
          id: 3,
          name: `Звіт по продажу квитків по розповсюджувачам (за датою продажу)`,
          from: '',
          to: '',
          action: {
            name: `ReportDistributors`
          }
        },
        {
          id: 4,
          name: `Звіт по продажу квитків у розрізі цін (за датою початку події)`,
          from: '',
          to: '',
          action: {
            name: `ReportPriceCut`
          }
        },
        {
          id: 5,
          name: `Звіт по продажу квитків по виступам (за датою початку події)`,
          from: '',
          to: '',
          action: {
            name: `ReportEvents`
          }
        },
        {
          id: 6,
          name: `Звіт по продажу квитків онлайн по виступам (за датою початку події)`,
          from: '',
          to: '',
          action: {
            name: `ReportEvents`,
            param: `online`
          }
        },
        {
          id: 7,
          name: `Детальний звіт по продажу квитків (за датою початку події)`,
          from: '',
          to: '',
          action: {
            name: `ReportDetailed`
          }
        },
        {
          id: 8,
          name: `Детальний звіт по продажу квитків (за датою продажу)`,
          from: '',
          to: '',
          action: {
            name: `ReportDetailed`,
            param: `date`
          }
        },
        {
          id: 9,
          name: `Касовий звіт щоденний `,
          from: '',
          action: {
            name: `ReportKassDay`
          }
        },
        {
          id: 10,
          name: `Звіт  on-line продажам `,
          from: '',
          action: {
            name: `ReportOnLineSale`
          }
        },
      ]
    },
    getters: {
        getOrdersList(state) {
                let year = new Date().getFullYear(),
                    month = new Date().getMonth() + 1,
                    date = new Date().getDate();
        
                if (month < 10) month = `0${month}`;
                if (date < 10) date = `0${date}`;
                
                state.ordersList.map(order => {
                    order.from = `${year}-${month}-${date}`
                    order.to = `${year}-${month}-${date}`
                })
                return state.ordersList
        }
    },
    mutations: {
        ADD_NEW_ORDER(state, order) {
            state.ordersList.push({
                id: state.ordersList.length + 1,
                name: order.name,
                from: order.from,
                to: order.to,
                action: order.action,
                fields: order.fields
            })
        }
    },
    actions: {
        addNewOrder({commit}, order) {
            commit.ADD_NEW_ORDER(order)
        }
    }
    
}