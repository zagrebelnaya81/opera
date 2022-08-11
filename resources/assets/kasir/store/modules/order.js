export default {
  state: {},
  getters: {},
  actions: {
    async getOrderDetails({ commit, getters }, payload) {
      try {
        const order = await fetch(`/api/v1/orders/details`, {
          method: `POST`,
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": `application/json`,
            Accept: `application/json`
          }
        })
          .then(response => response.json())
          .then(data => data)
          .catch(error => console.log(error));

        if (!order.status) {
          throw order;
        } else {
          return order;
        }
      } catch (error) {
        throw error;
      }
    },
    async getDistributors({ commit, getters }, payload) {
      try {
        const status = await fetch(`/admin/distributors-list`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            Accept: `application/json`,
            "X-CSRF-TOKEN": document.querySelector(`[name=_token]`).value
          }
        })
          .then(response => response.json())
          .then(data => data)
          .catch(err => console.warn(err));

        if (!status || !status.data) {
          throw status;
        } else {
          return status;
        }
      } catch (error) {
        throw error;
      }
    },
    async getDiscounts({ commit, getters }, payload) {
      try {
        const status = await fetch(`/admin/v2/discounts`, {
          method: `GET`,
          headers: {
            "Content-Type": `application/json`,
            Accept: `application/json`,
            "X-CSRF-TOKEN": document.querySelector(`[name=_token]`).value
          }
        })
          .then(response => response.json())
          .then(data => data)
          .catch(err => console.warn(err));

        if (!status || !status.data) {
          throw status;
        } else {
          return status.data;
        }
      } catch (error) {
        throw error;
      }
    }
  }
};
