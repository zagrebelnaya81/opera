export default {
  state: {
    searchResult: [],
    soldTickets: [],
    soldTicketsFilterType: `all`
  },
  getters: {
    getSearchResult(state) {
      return state.searchResult;
    },
    getSoldTickets(state) {
      return state.soldTickets;
    },
    getSoldTicketsFilterType(state) {
      return state.soldTicketsFilterType;
    }
  },
  mutations: {
    setSearchResult(state, payload) {
      state.searchResult = payload;
    },
    setSoldTickets(state, payload) {
      state.soldTickets = payload;
    },
    removeOrderFromArr(state, payload) {
      const index = state[payload.arrName].findIndex(
        item => item.id == payload.orderId
      );
      state[payload.arrName].splice(index, 1);
    },
    removeTicketFromArr(state, payload) {
      const order = state[payload.arrName].find(
        item => item.id == payload.orderId
      );

      if (order) {
        const index = order.tickets.data.findIndex(
          item => item.id == payload.ticketId
        );
        order.tickets.data.splice(index, 1);
      }
    },
    changeSoldTicketsFilterType(state, payload) {
      state.soldTicketsFilterType = payload;
    }
  },
  actions: {
    async returnTicketsFromCart({ commit }, payload) {
      const cart = payload;
      const removedOrder = [];

      for (let i = 0; i < cart.length; i++) {
        const ticket = cart[i];

        if (typeof ticket == "undefined") {
          continue;
        }

        if (removedOrder.includes(ticket.orderId)) {
          continue;
        }

        try {
          removedOrder.push(ticket.orderId);
          const allTicketsInCartFromOrder = cart.filter(
            cT => cT.orderId == ticket.orderId
          );
          const ticketsToReturn = {
            tickets: allTicketsInCartFromOrder.map(t => t.id)
          };
          const status = await fetch(
            `/admin/cash-box/orders/${ticket.orderId}/return`,
            {
              method: `POST`,
              body: JSON.stringify(ticketsToReturn),
              headers: {
                "Content-Type": `application/json`,
                Accept: `application/json`,
                "X-CSRF-TOKEN": document.querySelector(`[name=_token]`).value
              }
            }
          )
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.log(error));

          if (status.status) {
            commit(`removeOrderFromArr`, {
              orderId: ticket.orderId,
              arrName: `soldTickets`
            });
          } else {
            throw status;
          }
        } catch (error) {
          throw error;
        }
      }
      return true;
    },
    async getSearchResult({ commit }, payload) {
      try {
        const searchResult = await fetch(
          `/admin/cash-box/orders/search?${payload}`,
          {
            method: `GET`,
            headers: {
              "Content-Type": `application/json`,
              Accept: `application/json`
            }
          }
        )
          .then(response => response.json())
          .then(data => data)
          .catch(error => console.log(error));

        if (Array.isArray(searchResult.data)) {
          commit(`setSearchResult`, searchResult.data);
          return searchResult.data;
        } else {
          throw searchResult;
        }
      } catch (error) {
        throw error;
      }
    },
    async getSearchSoldResult({ commit }, payload) {
      try {
        const searchResult = await fetch(
          `/admin/cash-box/orders/search?${payload}&status=sold`,
          {
            method: `GET`,
            headers: {
              "Content-Type": `application/json`,
              Accept: `application/json`
            }
          }
        )
          .then(response => response.json())
          .then(data => data)
          .catch(error => console.log(error));

        if (Array.isArray(searchResult.data)) {
          commit(`setSoldTickets`, searchResult.data);
          return searchResult.data;
        } else {
          throw searchResult;
        }
      } catch (error) {
        throw error;
      }
    },
    async getSoldTickets({ commit, dispatch }, payload) {
      const formatPayload = payload ? payload : ``;

      try {
        const soldTickets = await fetch(
          `/admin/cash-box/orders-date${formatPayload}`,
          {
            method: `GET`,
            headers: {
              "Content-Type": `application/json`,
              Accept: `application/json`
            }
          }
        )
          .then(response => response.json())
          .then(data => data)
          .catch(error => console.log(error));

        if (Array.isArray(soldTickets.data)) {
          commit(`setSoldTickets`, soldTickets.data);
          return soldTickets.data;
        } else {
          throw soldTickets;
        }
      } catch (error) {
        throw error;
      }
    },
    async removeAllBookingTickets({ commit }, payload) {
      try {
        const status = await fetch(`/admin/cash-box/orders/${payload}`, {
          method: `DELETE`,
          headers: {
            "Content-Type": `application/json`,
            Accept: `application/json`,
            "X-CSRF-TOKEN": document.querySelector(`[name=_token]`).value
          }
        })
          .then(response => response.json())
          .catch(error => console.log(error));

        if (status.status) {
          commit(`clearCart`);
          commit(`removeOrderFromArr`, { payload, arrName: `searchResult` });
          return status;
        } else {
          throw status;
        }
      } catch (error) {
        throw error;
      }
    },
    async removeOneTicketFromBooking({ commit }, payload) {
      const body = { tickets: [payload.ticketId] };

      try {
        const status = await fetch(
          `/admin/cash-box/orders/${payload.orderId}/return`,
          {
            method: `POST`,
            body: JSON.stringify(body),
            headers: {
              "Content-Type": `application/json`,
              Accept: `application/json`,
              "X-CSRF-TOKEN": document.querySelector(`[name=_token]`).value
            }
          }
        )
          .then(response => response.json())
          .then(data => data)
          .catch(error => console.log(error));

        if (status.status) {
          commit(`removeTicketFromArr`, payload);
          return status;
        } else {
          throw status;
        }
      } catch (error) {
        throw error;
      }
    },
    async returnAllPaymentTickets({ commit }, orderId) {
      try {
        const status = await fetch(`/admin/cash-box/orders/${orderId}/return`, {
          method: `POST`,
          headers: {
            "Content-Type": `application/json`,
            Accept: `application/json`,
            "X-CSRF-TOKEN": document.querySelector(`[name=_token]`).value
          }
        })
          .then(response => response.json())
          .then(data => data)
          .catch(error => console.log(error));

        if (status.status) {
          commit(`removeOrderFromArr`, {
            orderId: orderId,
            arrName: `soldTickets`
          });
          return status;
        } else {
          throw status;
        }
      } catch (error) {
        throw error;
      }
    }
  }
};
