<template>
  <section class="booking-ticket">
    <h2>Повернути квитки</h2>
    <div class="row">
      <div class="col">
        <ButtonLoader
          class="btn btn-primary btn-sm btn-block"
          :load="localLoading"
          @click="returnTickets"
        >Повернути квитки</ButtonLoader>
      </div>
      <div class="col">
        <ButtonLoader class="btn btn-secondary btn-sm btn-block" @click="close">Скасувати</ButtonLoader>
      </div>
    </div>
  </section>
</template>

<script>
import MaskedInput from "vue-masked-input";
import ButtonLoader from "../Common/ButtonLoader/ButtonLoader";

export default {
  components: {
    MaskedInput,
    ButtonLoader
  },
  data() {
    return {
      localLoading: false,
      orderId: "",
      vip: false
    };
  },
  computed: {
    isVip() {
      return this.$store.getters.getPermissions.includes("booking-vip");
    },
    cart() {
      return this.$store.getters.getCart;
    }
  },
  methods: {
    returnTickets() {
      this.localLoading = true;
      this.$store
        .dispatch(`returnTicketsFromCart`, this.cart)
        .then(data => {
          this.localLoading = false;
          this.$store.dispatch(`clearCart`);
          this.$emit(`refreshData`);
          this.$emit(`close`);
        })
        .catch(err => {
          this.$store
          .dispatch(`removeTicketFromCart`, this.cart.map(ticket => ticket))
          this.localLoading = false;
          this.$emit(`close`);
          console.warn(err);
        });
    },
    close() {
      this.$emit(`close`);
    }
  }
};
</script>
