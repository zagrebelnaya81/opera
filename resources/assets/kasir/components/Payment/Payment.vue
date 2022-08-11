<template>
  <section class="payment">
    <h2 class="payment__title">Продаж квитків</h2>
    <!-- <template v-if="!ticketsPrintSrc"> -->
    <p class="payment__banking">
      <span class="payment__text">До сплати:</span>
      <span class="payment__cost">{{ totalPrice }}</span>
      грн.
    </p>
    <form method="POST" class="payment__form" @submit.prevent>
      <label class="payment__label">
        <span class="payment__form-text">Введіть суму готівкою</span>
        <input type="number" class="form-control" v-model.number="userPrice" ref="paymentInput" />
      </label>
      <div class="form-check form-check-inline py-4">
        <span class="form-check-label">Знижка:&nbsp;</span>
        <input type="checkbox" class="form-check-input" v-model="discount" ref="discountInput" />
      </div>
      <div class="form-check form-check-inline py-4" v-if="discount">
        <select v-model="chosenDiscount" class="custom-select">
          <option value selected>Оберіть знижку, будь ласка</option>
          <option
            v-for="discount in discounts"
            v-bind:key="discount.id"
            v-bind:value="discount"
          >{{discount.name}}</option>
        </select>
      </div>
    </form>
    <p class="payment__banking">
      <span class="payment__text">Решта:</span>
      <span class="payment__cost">{{ change }}</span>
      грн.
    </p>
    <div class="payment__btns">
      <ButtonLoader
        class="btn btn-secondary btn-sm"
        @click="payment(0)"
        :disabled="!change"
        :load="localLoading"
      >Прийняти</ButtonLoader>
      <ButtonLoader
        class="btn btn-secondary btn-sm"
        @click="cancelPayment"
        :load="localLoading"
      >Скасувати</ButtonLoader>
    </div>
    <ButtonLoader
      class="btn btn-secondary btn-sm btn-block"
      @click="payment(1)"
      :disabled="!change"
      :load="localLoading"
    >Безготівковий розрахунок</ButtonLoader>
    <!-- </template> -->
    <!-- <template v-else>
      <button
        type="button"
        class="btn btn-secondary btn-sm btn-block"
        @click="printTickets"
      >Друк квитків</button>
    </template>-->
  </section>
</template>

<script>
import ButtonLoader from "../Common/ButtonLoader/ButtonLoader";

export default {
  props: {
    order: {
      type: Object
    }
  },
  components: {
    ButtonLoader
  },
  data() {
    return {
      userPrice: "",
      discount: false,
      discounts: [],
      localLoading: false,
      chosenDiscount: ""
    };
  },
  mounted() {
    this.$refs.paymentInput.focus();
    this.$store
      .dispatch(`getDiscounts`)
      .then(data => {
        this.discounts = data;
      })
      .catch(err => {
        console.warn(err);
        this.localLoading = false;
      });
  },
  beforeDestroy() {
    this.$store.commit(`setTicketsPrintSrc`, ``);
  },
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    totalPrice() {
      let price = this.cart.reduce((sum, item) => {
        return sum + parseInt(item.price);
      }, 0);

      if (this.discount && this.chosenDiscount) {
        price -= (price * this.chosenDiscount.size) / 100;
      } else {
        this.userPrice = price;
      }

      return price;
    },
    change() {
      const change = this.userPrice - this.totalPrice;

      return change < 0 ? 0 : change == 0 ? "0" : change;
    }
    // ticketsPrintSrc() {
    //   return this.$store.getters.getTicketsPrintSrc
    // }
  },
  methods: {
    payment(type) {
      this.localLoading = true;
      let orders = new Set(this.cart.map(ticket => ticket.orderId));
      orders.delete(undefined);
      orders.delete(null);

      if (orders.size == 0) {
        const payload = {
          status: `sold`,
          payment_type: type,
          tickets: this.cart.map(ticket => parseInt(ticket.id)),
          seller_id: parseInt(document.querySelector(`#cash-box-id`).value),
          distributor_id: null,
          tickets_discounts: this.cart.map(ticket => {
            return {
              id: parseInt(ticket.id),
              discount_id: this.chosenDiscount.id
            };
          })
        };

        this.$store
          .dispatch(`buyTickets`, payload)
          .then(data => {
            this.$emit(`refreshData`);
            this.localLoading = false;
            this.printTickets();
            this.cancelPayment();
          })
          .catch(err => {
            console.warn(err);
            this.localLoading = false;
          });
      } else {
        orders.forEach(orderId => {
          this.$store
            .dispatch(`buyBookingTickets`, {
              orderId,
              payment_type: type
            })
            .then(data => {
              this.$emit(`refreshData`);
              this.localLoading = false;
              this.printTickets();
              this.cancelPayment();
            })
            .catch(err => {
              console.warn(err);
              this.localLoading = false;
            });
        });
      }
    },
    cancelPayment() {
      this.$emit(`close`);
    },
    printTickets() {
      this.$store.commit(`setOrderForPrint`, this.$store.getters.getLastOrder);
    }
  }
};
</script>
