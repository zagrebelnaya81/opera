export default {
  state: {
    ticketTemplate: {},
    orderForPrint: {},
    printAccept: false
  },
  getters: {
    getTicketTemplate(state) {
      return state.ticketTemplate;
    },
    getOrderForPrint(state) {
      return state.orderForPrint;
    },
    getPrintAccept(state) {
      return state.printAccept;
    }
  },
  mutations: {
    setTicketTemplate(state, payload) {
      state.ticketTemplate = payload;
    },
    setOrderForPrint(state, payload) {
      if (payload) {
        state.orderForPrint = payload;
        state.printAccept = true;
      } else {
        state.orderForPrint = {};
        state.printAccept = false;
      }
    }
  },
  actions: {
    async getPrintTicketsInfoForCart({ commit }, payload) {
      try {
        const cart = payload;
        const formatPayload = { tickets: cart.map(ticket => ticket.id) };
        const ticketsDetails = await fetch(`/api/v1/tickets/details `, {
          method: `POST`,
          body: JSON.stringify(formatPayload),
          headers: {
            "Content-Type": `application/json`,
            Accept: `application/json`
          }
        })
          .then(response => response.json())
          .then(data => data)
          .catch(err => console.warn(err));

        if (!ticketsDetails || !ticketsDetails.tickets) {
          throw ticketsDetails;
        } else {
          let result = [];
          let hallInfo = ticketsDetails.tickets.data[0].performanceCalendar.data;
          for (let i = 0; i < ticketsDetails.tickets.data.length; i++) {
            const ticketDetails = ticketsDetails.tickets.data[i];
            const ticketInCart = cart.filter(t => t.id == ticketDetails.id)[0];
            ticketDetails.orderId = ticketInCart.orderId;
            result.push(ticketDetails);
          }
          return {
            hallInfo: hallInfo,
            tickets: result
          };
        }
      } catch (error) {
        throw error;
      }
    },
    async getTicketTemplate({ commit }) {
      try {
        const ticketTemplate = await fetch(
          `/api/v1/ticket-template?template=cash-box`,
          {
            method: `GET`,
            headers: {
              "Content-Type": `application/json`,
              Accept: `application/json`
            }
          }
        )
          .then(response => response.json())
          .then(data => {
            commit(`setTicketTemplate`, data.data);
            return data;
          })
          .catch(error => console.log(error));

        if (!ticketTemplate) {
          throw ticketTemplate;
        } else {
          return ticketTemplate.data;
        }
      } catch (error) {
        throw error;
      }
    }
  }
};
