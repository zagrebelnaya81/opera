export default {
  state: {
    cart: [],
    temporaryStorage: [],
    cartTemporary: [],
    ticketsPrintSrc: ``,
    bookingOrder: ``
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
    getCartTemporary(state) {
      return state.cartTemporary;
    },
    getTemporaryStorage(state) {
      return state.temporaryStorage;
    },
    getTicketsPrintSrc(state) {
      return state.ticketsPrintSrc;
    },
    getBookingOrder(state) {
      return state.ticketsPrintSrc;
    },
    getPermissions() {
      return document.querySelector(`[name="permissions[]"]`).value;
    }
  },
  mutations: {
    addTicketToCart(state, payload) {
      state.cart.push(payload);
    },
    addTicketToCartTemporary(state, payload) {
      state.cartTemporary.push(payload);
    },
    removeTicketsFromCartTemporary(state, payload) {
      payload.forEach(ticketId => {
        const index = state.cartTemporary.findIndex(
          item => item.id == ticketId
        );

        if (index != -1) state.cartTemporary.splice(index, 1);
      });
    },
    removeTicketFromCartTemporary(state, payload) {
      const index = state.cartTemporary.findIndex(
        item => item.id == payload.id
      );

      if (index != -1) state.cartTemporary.splice(index, 1);
    },
    addTicketsFromBookingToCart(state, payload) {
      state.cart.push(payload);
    },
    removeTicketsFromCart(state, payload) {

      payload.forEach(function (id){
        let ticketId = typeof id === 'object' ? id.id : id;
        const index = state.cart.findIndex(item => item.id === ticketId);
        state.cart.splice(index, 1);

        state.temporaryStorage.push(ticketId);
      });
    },
    clearCart(state) {
      state.cart = [];
    },
    clearTemporaryStorage(state) {
      state.temporaryStorage = [];
    },
    setTicketsPrintSrc(state, payload) {
      state.ticketsPrintSrc = payload;
    },
    setBookingOrder(state, payload) {
      state.bookingOrder = payload;
    }
  },
  actions: {
    async addNotAvailableTicketsToCart({ commit }, payload) {
      try {
        let ticketIds = payload.map(t => t.id);

        const formatPayload = { tickets: ticketIds };
        const status = await fetch(`/api/v1/tickets/details `, {
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

        if (!status || !status.tickets) {
          throw status;
        } else {
          status.tickets.data.forEach(ticket => {
            let ticketWithStatus = payload.filter(t => t.id == ticket.id);

            let ticketForCart = {
              id: ticket.id,
              price: ticket.seatPrice.data.price,
              row: ticket.seatPrice.data.row_number,
              seat: ticket.seatPrice.data.seat_number,
              sectionName: ticket.seatPrice.data.section_title,
              orderId:
                ticketWithStatus.length > 0
                  ? ticketWithStatus[0].orderId
                  : null,
              status:
                ticketWithStatus.length > 0 ? ticketWithStatus[0].status : null
            };
            commit(`addTicketToCart`, ticketForCart);
          });
          return status;
        }
      } catch (error) {
        throw error;
      }
    },
    async addTicketToCart({ commit }, payload) {
      try {
        const formatPayload = { tickets: [payload.id] };
        const status = await fetch(`/api/v1/tickets/reservation?lang=ua`, {
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

        if (!status || !status.status) {
          throw status;
        } else {
          commit(`addTicketToCart`, payload);
          return status;
        }
      } catch (error) {
        throw error;
      }
    },
    async addTicketToCartProstoNebo({ commit, getters }, payload) {
      try {
        const status = await fetch(
          `/api/v1/tickets/reservation/${payload.meta}`,
          {
            method: `POST`,
            body: JSON.stringify(payload.payload),
            headers: {
              "Content-Type": `application/json`,
              Accept: `application/json`
            }
          }
        )
          .then(response => response.json())
          .then(data => data)
          .catch(err => console.warn(err));

        if (!status || !status.status) {
          throw status;
        } else {
          status.reservedTickets.data.forEach(ticket =>
            commit(`addTicketToCart`, {
              id: ticket.ticket_id,
              price: payload.price,
              row: ``,
              seat: ``,
              sectionName: ``
            })
          );

          return status;
        }
      } catch (error) {
        throw error;
      }
    },
    async removeTicketFromCart({ commit }, payload) {
      const formatPayload = { tickets: payload };

      try {
        const status = await fetch(
          `/api/v1/tickets/cancel-reservation?lang=ua`,
          {
            method: `POST`,
            body: JSON.stringify(formatPayload),
            headers: {
              "Content-Type": `application/json`,
              Accept: `application/json`
            }
          }
        )
          .then(response => response.json())
          .then(data => data)
          .catch(error => console.log(error));

        if (!status) {
          throw status;
        } else {
          commit(`removeTicketsFromCart`, payload);
        }
      } catch (error) {
        throw error;
      }
    },
    async buyTickets({ commit, dispatch }, payload) {
      try {
        const status = await fetch(`/admin/cash-box/orders/create?lang=ua`, {
          method: `POST`,
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": `application/json`,
            Accept: `application/json`,
            "X-CSRF-TOKEN": document.querySelector(`[name=_token]`).value
          }
        })
          .then(response => response.json())
          .then(data => data)
          .catch(error => console.log(error));

        if (!status || !status.status) {
          throw status;
        } else {
          commit(`setTicketsPrintSrc`, status.order.data.hash);
          commit(`clearCart`);
          dispatch(`saveLastOrder`, status);
          return status;
        }
      } catch (error) {
        throw error;
      }
    },
    clearCart({ commit, dispatch }, payload) {
      commit(`clearCart`);
    },
    async buyBookingTickets({ commit, dispatch }, payload) {
      try {
        const status = await fetch(
          `/admin/cash-box/orders/${payload.orderId}/confirm`,
          {
            method: `POST`,
            body: JSON.stringify({ payment_type: payload.payment_type }),
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

        if (!status || !status.status) {
          throw status;
        } else {
          commit(`setTicketsPrintSrc`, status.order.data.hash);
          commit(`clearCart`);
          dispatch(`saveLastOrder`, status);
          return status;
        }
      } catch (error) {
        throw error;
      }
    },
    async bookingTickets({ commit, dispatch }, payload) {
      try {
        const status = await fetch(`/admin/cash-box/orders/create?lang=ua`, {
          method: `POST`,
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": `application/json`,
            Accept: `application/json`,
            "X-CSRF-TOKEN": document.querySelector(`[name=_token]`).value
          }
        })
          .then(response => response.json())
          .then(data => data)
          .catch(error => console.log(error));

        if (!status || !status.status) {
          throw status;
        } else {
          commit(`setBookingOrder`, status.order.data.id);
          commit(`clearCart`);
          dispatch(`saveLastOrder`, status);
          return status;
        }
      } catch (error) {
        throw error;
      }
    }
  }
};
