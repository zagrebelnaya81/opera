<template>
  <section class="booking-ticket">
    <h2 class="booking-ticket__title">
      Бронювання
      <span v-if="vip" class="booking-ticket__title-vip">VIP</span>
      <button
        type="button"
        class="btn btn-secondary btn-sm booking-ticket__vip"
        @click="vip = !vip"
        v-if="isVip"
      >VIP</button>
      <button
        type="button"
        class="btn btn-secondary btn-sm booking-ticket__vip"
        @click="loadDistributors"
      >Дистриб'ютор</button>
    </h2>
    <div>
      <span v-if="localLoading">Завантаження списку дистриб'юторів</span>
      <div v-if="isDistributor">
        <div class="form-check form-check-inline mr-0" v-if="isDistributor">
          <span class="form-check-label">Дистриб'ютор:&nbsp;</span>
          <select v-model="chosenDistributor" class="custom-select">
            <option value selected>Оберіть, будь ласка, дистриб'ютора</option>
            <option
              v-for="distributor in distributors"
              v-bind:key="distributor.id"
              v-bind:value="distributor"
            >{{distributor.title}}</option>
          </select>
        </div>
      </div>
    </div>
    <form action method="POST" class="booking-ticket__form">
      <label class="booking-ticket__label">
        <span class="booking-ticket__form-text">Ім'я</span>
        <input
          type="text"
          class="form-control form-control-sm"
          required
          name="name"
          v-model.trim="name"
          :readonly="isDistributor"
          placeholder="Ім'я"
        />
      </label>
      <!-- <label class="booking-ticket__label">
        <span class="booking-ticket__form-text">Прізвище</span>
        <input
          type="text"
          class="form-control form-control-sm"
          required
          name="surname"
          v-model="surname"
          placeholder="Прізвище"
        >
      </label>
      <label class="booking-ticket__label">
        <span class="booking-ticket__form-text">№ тел.</span>
        <MaskedInput
          class="form-control form-control-sm"
          type="tel"
          name="phone"
          required
          placeholder="+38 (XXX) XXX-XX-XX"
          mask="\+\38 (111) 111-11-11"
          autocomplete="nope"
          @input="phone = arguments[1]"
        ></MaskedInput>
      </label>-->
    </form>
    <!-- <template v-if="showOrderId">
      <p class="booking-ticket__order">Номер броні: <b>{{ orderId }}</b></p>
      <button
        type="button"
        class="btn btn-secondary btn-sm btn-block"
        @click="printTickets"
      >Друк квитків</button>
    </template>-->
    <ButtonLoader
      class="btn btn-secondary btn-sm btn-block"
      :disabled="!validForm"
      :load="localLoading"
      @click="bookingTickets"
    >Бронювати</ButtonLoader>
  </section>
</template>

<script>
import MaskedInput from "vue-masked-input";
import ButtonLoader from "../Common/ButtonLoader/ButtonLoader";
import BookingHelper from "./BookingHelper";

export default {
  components: {
    MaskedInput,
    ButtonLoader
  },
  data() {
    return {
      name: ``,
      // surname: ``,
      // phone: ``,
      // orderId: ``,
      // showOrderId: false,
      localLoading: false,
      chosenDistributor: "",
      vip: false,
      isDistributor: false,
      distributors: []
    };
  },
  watch: {
    chosenDistributor: function() {
      this.name = this.chosenDistributor.title
        ? this.chosenDistributor.title
        : ``;
    }
  },
  computed: {
    isVip() {
      return this.$store.getters.getPermissions.includes("booking-vip");
    },
    cart() {
      return this.$store.getters.getCart;
    },
    validForm() {
      // return this.name.length > 2 && this.surname.length > 2 && this.phone.length > 5
      return this.name.length > 2;
    }
  },
  methods: {
    loadDistributors() {
      if (!this.isDistributor) {
        this.localLoading = true;
        this.name = "";
        this.$store
          .dispatch(`getDistributors`)
          .then(data => {
            this.distributors = data.data;
            this.isDistributor = !this.isDistributor;
            this.localLoading = false;
          })
          .catch(err => {
            console.warn(err);
            this.localLoading = false;
          });
      } else {
        this.chosenDistributor = "";
        this.isDistributor = !this.isDistributor;
      }
    },
    bookingTickets() {
      this.localLoading = true;
      const payload = {
        status: BookingHelper.getStatus(this.vip, this.isDistributor, this.chosenDistributor),
        // name: `${this.name} ${this.surname}`,
        name: `${this.name}`,
        // phone: parseInt(`38${this.phone}`),
        seller_id: parseInt(document.querySelector(`#cash-box-id`).value),
        tickets: this.cart.map(ticket => parseInt(ticket.id)),
        buyer_id: this.chosenDistributor.user_id
      };

      this.$store
        .dispatch(`bookingTickets`, payload)
        .then(data => {
          this.orderId = data.order.data.id;
          // this.showOrderId = true;
          this.$emit(`refreshData`);
          //this.printTickets();
          this.$emit(`close`);
        })
        .then(() => (this.localLoading = true))
        .catch(err => {
          console.warn(err);
          this.localLoading = true;
        });
    },
    printTickets() {
      this.$store.commit(`setOrderForPrint`, this.$store.getters.getLastOrder);
    }
  }
};
</script>
