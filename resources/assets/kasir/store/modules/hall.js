export default {
  state: {
    hall: {},
    hallAdmin: {},
    hallAutoscale: false
  },
  getters: {
    getHallInfo(state) {
      return state.hall
    },
    getHallAdminInfo(state) {
      console.log(state.hallAdmin);
      return state.hallAdmin
    },
    getHallAutoscale(state) {
      return state.hallAutoscale
    }
  },
  mutations: {
    setHallInfo(state, payload) {
      state.hall = payload;
    },
    setHallAdminInfo(state, payload) {
      state.hallAdmin = payload;
    },
    updateAdminTicket(state, payload) {
      state.hallAdmin.tickets.data[payload.index].order = payload.order;
    },
    mergeHallInfoWithAdminHallData(state, payload) {
      console.log("state.hall.tickets.data65456");
     
      console.log(state);
      console.log(state.hall);
      console.log(state.hallAdmin);
      let adminHallMerged = state.hallAdmin.tickets.data.map(ticket => {
      
       let hallTickets = state.hall.tickets.data.filter(hallTick => hallTick.id == ticket.id);
      
      if (hallTickets.length > 0) {
        let hallTicket = hallTickets[0];
        hallTicket.more = ticket.more;
        hallTicket.order = ticket.order;
        return hallTicket;
      }
      else {
        return ticket;
      }
      });
      state.hallAdmin.tickets.data = adminHallMerged;
      
    },
    setHallAutoscale(state, payload) {
      state.hallAutoscale = payload;
    }
  },
  actions: {
    async getHallAdminData({ commit }, payload) {
      try {
       const hallAdminInfo = await fetch(`/admin/v2/events/${payload}/tickets`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`,
            'X-CSRF-TOKEN': document.querySelector(`[name=_token]`).value
          }
        })
          .then(response => response.json())
          .then(data => {
            return data;
          })
          .catch(error => console.log(error))

        if (!hallAdminInfo) {
          throw hallAdminInfo
        } else {
          commit(`setHallAdminInfo`, hallAdminInfo);
          commit(`mergeHallInfoWithAdminHallData`, hallAdminInfo);
          return hallAdminInfo
        }
      } catch (error) {
        throw error
      }
    },
    async getOrderDetailsForTickets({ commit }, payload) {
      for (let i = 0; i < payload.length; i++) {
        let ticket = payload[i];
        const ticketDetails = await fetch(`/admin/v2/tickets/${ticket.id}`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`,
            'X-CSRF-TOKEN': document.querySelector(`[name=_token]`).value
          }
        })
          .then(response => response.json())
          .then(data => {
            return data;
          })
          .catch(error => console.log(error));

        commit(`updateAdminTicket`, { index: i, order: ticketDetails.order });
      }
    },
    async getTicketDetails({ commit }, payload) {
      let ticket = payload;
      return await fetch(`/admin/v2/tickets/${ticket.id}`, {
        method: `GET`,
        headers: {
          "Content-Type": `application/json`,
          "Accept": `application/json`,
          'X-CSRF-TOKEN': document.querySelector(`[name=_token]`).value
        }
      })
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(error => console.log(error));
    },
    async getHallData({ commit }, payload) {
      try {
        const hallInfo = await fetch(`/api/v1/events/${payload}/tickets?only=offline&lang=ua`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            "Accept": `application/json`
          }
        })
          .then(response => response.json())
          .then(data => {
            commit(`setHallInfo`, data.data);
            return data;
          })
          .catch(error => console.log(error))

        if (!hallInfo.data) {
          throw hallInfo
        } else {
          return hallInfo.data
        }
      } catch (error) {
        throw error
      }
    }
  }
}
