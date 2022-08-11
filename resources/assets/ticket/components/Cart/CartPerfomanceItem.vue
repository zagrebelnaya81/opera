<template>
  <li>
    <div class="cart-perfomance__info" :style="performancePoster">
      <div class="cart-perfomance__info-left">
        <h3 class="cart-perfomance__item-name">{{ performanceName }}</h3>
        <p class="cart-perfomance__item-hall">{{ performanceHall }}</p>
        <p class="cart-perfomance__datetime">
          <span class="cart-perfomance__day">{{ getWeekday }}</span>
          <span class="cart-perfomance__date">{{ getDate }}</span>
          <span class="cart-perfomance__time">{{ getHours | addZero }}:{{ getMinutes | addZero }}</span>
        </p>
      </div>
      <div class="cart-perfomance__info-right">
        <button
          class="cart-perfomance__remove"
          @click="removePerformance()"
          v-if="!load"
        >{{ translation.remove[documentLang] }}</button>
        <Preloader class="preloader--inline" :size="16" v-else></Preloader>
      </div>
    </div>
    <ul class="cart-perfomance__tickets">
      <CartItem
        v-for="ticket in performanceTickets"
        :key="ticket.id"
        :ticket="ticket"
        :performance="performance"
        :above="above"
      >
      </CartItem>
    </ul>
  </li>
</template>

<script>
  import dateFormat from "../../mixins/date-format"
  import CartItem from "./CartPerfomanceItemTicket"
  import Preloader from "../Common/Preloader/Preloader"

  export default {
    components: {
      CartItem,
      Preloader
    },
    mixins: [dateFormat],
    props: {
      performance: {
        type: Object,
        required: true
      },
      above: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        translation: {
          remove: {
            ru: `Удалить`,
            en: `Remove`,
            ua: `Видалити`
          }
        },
        load: false
      }
    },
    computed: {
      dateForFormat() {
        return this.performance.data.date
      },
      performanceName() {
        return this.performance.data.performance.data.title
      },
      performanceHall() {
        return this.performance.data.hall.data.title
      },
      performanceHallType() {
        return this.performance.data.hall.data.name
      },
      performanceTickets() {
        return this.performance.data.tickets.data
      },
      performancePoster() {
        return {
          'background-image': `url(${this.performance.data.performance.data.poster})`
        }
      }
    },
    methods: {
      removePerformance() {
        const ticketsIdList = this.performance.data.tickets.data.map(ticket => ticket.id);

        this.load = true;

        if (this.above) {
          this.$store.commit(`removeTicketsAboveFromCart`, {
            perfomanceId: this.performance.data.id,
            tickets: ticketsIdList
          })
          .then(() => this.load = false)
          .catch(err => {
            console.warn(err);
            this.load = false;
          })
        } else {
          this.$store.dispatch(`removeTicketsFromCart`, {
            perfomanceId: this.performance.data.id,
            tickets: ticketsIdList
          })
          .then(() => this.load = false)
          .catch(err => {
            console.warn(err);
            this.load = false;
          })
        }
      }
    }
  }
</script>
