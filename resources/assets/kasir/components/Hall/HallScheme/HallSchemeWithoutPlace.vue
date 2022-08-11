<template>
  <div class="hall__scheme-outdoor">
    <div class="form-group">
      <label for="count">Введіть кількість квитків</label>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button
            class="btn btn-secondary hall__scheme-btn"
            type="button"
            :disabled="minValue"
            @click="removeTicket"
          >-</button>
        </div>
        <input
          type="number"
          class="form-control"
          id="count"
          step="1"
          min="0"
          :max="available"
          style="text-align:center;"
          v-model.trim.number="ticketsCount"
          :disabled="sendData"
        >
        <div class="input-group-append">
          <button
            class="btn btn-secondary hall__scheme-btn"
            type="button"
            :disabled="maxValue"
            @click="addTicket"
          >+</button>
        </div>
      </div>
    </div>
    <ButtonLoader
      type="button"
      class="btn btn-secondary btn-block"
      :disabled="disabledBtn"
      :load="sendData"
      @click="addToCart"
    >Додати в кошик</ButtonLoader>
  </div>
</template>

<script>
  import ButtonLoader from "../../Common/ButtonLoader/ButtonLoader"

  export default {
    props: {
      event: {
        type: Object,
        required: true
      }
    },
    components: {
      ButtonLoader
    },
    data() {
      return {
        ticketsCount: 1,
        sendData: false
      }
    },
    computed: {
      available() {
        return parseInt(this.event.seats_available)
      },
      maxValue() {
        return this.ticketsCount >= this.available
      },
      minValue() {
        return this.ticketsCount <= 0
      },
      disabledBtn() {
        return this.minValue || this.ticketsCount > this.available
      }
    },
    methods: {
      addToCart() {
        this.sendData = true;

        let price = 0;

        for (const key in this.event.priceZones) {
          if (parseInt(this.event.priceZones[key].seats_count) != 0) {
            price = this.event.priceZones[key].price;
            break;
          }
        }

        this.$store.dispatch(`addTicketToCartProstoNebo`,  {
            meta: this.event.id,
            price: price,
            payload: {
              count: this.ticketsCount
            }
          })
          .then(data => {
            this.sendData = false;


          })
          .catch(err => {
            this.sendData = false;
            console.warn(err);
          })
      },
      addTicket() {
        this.ticketsCount++;
      },
      removeTicket() {
        this.ticketsCount--;
      }
    }
  }
</script>
