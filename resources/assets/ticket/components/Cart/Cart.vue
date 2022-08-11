<template>
  <div class="cart">
    <template v-if="loading">
      <Preloader></Preloader>
    </template>
    <template v-else>
      <CartProgress
        stepActive="1"
      ></CartProgress>
      <div class="cart__wrap">
        <div class="cart__inner">
          <template v-if="ticketsInCartLength">
            <h1 class="cart__title">{{ translation.yourCart[documentLang] }}</h1>
            <CartPerfomance
              :perfomanceInCart="perfomanceInCart"
              key="perfomance"
            ></CartPerfomance>
            <router-link
              class="btn btn--red cart__btn-pay"
              tag="button"
              :to="{ name: 'Authorization'}"
            >{{ translation.goToPayment[documentLang] }}</router-link>
          </template>
          <template v-else>
            <h1 class="cart__title">{{ translation.yourCartEmpty[documentLang] }}</h1>
          </template>

          <template v-if="above">
            <p class="cart__above-text">{{ translation.cartPrevious[documentLang] }}</p>
            <CartPerfomance v-if="aboveInCart.length"
              :perfomanceInCart="aboveInCart"
              :above="true"
              key="above"
              @resetAbove="above = false"
            ></CartPerfomance>
            <template v-else>
              <p class="cart__not-available">{{ translation.seatAvailable[documentLang] }}</p>
            </template>
          </template>

          <a
            href="/"
            class="cart__link"
            v-if="!ticketsInCartLength"
          >{{ translation.toMainPage[documentLang] }}</a>
        </div>
        <aside class="cart__aside">
          <CartAside v-if="showTicketsPopup"></CartAside>
        </aside>
        <TicketBottom
          :ticketsCount="allTicketCount"
          @open-tickets="openTickets"
        ></TicketBottom>
      </div>
    </template>
  </div>
</template>

<script>
  import TicketBottom from "../Common/TicketBottom/TicketBottom"
  import cartMixins from "../../mixins/cart-mixin"
  import Preloader from "../Common/Preloader/Preloader"
  import CartProgress from "../Common/CartProgress/CartProgress"
  import CartAside from "../Common/CartAside/CartAside"
  import CartPerfomance from "./CartPerfomance"

  export default {
    components: {
      Preloader,
      CartProgress,
      CartPerfomance,
      CartAside,
      TicketBottom
    },
    mixins: [cartMixins],
    created() {
      this.showTicketsPopup = !this.mobile;
    },
    data() {
      return {
        above: false,
        showTicketsPopup: true,
        translation: {
          yourCart: {
            ru: `Ваша корзина`,
            en: `Your cart`,
            ua: `Ваш кошик`
          },
          yourCartEmpty: {
            ru: `Ваша корзина пуста`,
            en: `Your cart is empty`,
            ua: `Ваш кошик порожній`
          },
          cartPrevious: {
            ru: `Ранее выбранное:`,
            en: `Previously selected:`,
            ua: `Раніше вибранне:`
          },
          seatAvailable: {
            ru: `Одно или несколько из ранее выбранных мест больше недоступны.`,
            en: `One or more of the previously selected locations are no longer available.`,
            ua: `Одне або декілька з раніше обраних місць більше недоступні.`
          },
          toMainPage: {
            ru: `На главную`,
            en: `To main`,
            ua: `На головну`
          },
          goToPayment: {
            ru: `Перейти к оплате`,
            en: `Go to the payment`,
            ua: `Перейти до оплати`
          }
        }
      }
    },
    computed: {
      mobile() {
        return this.$store.getters.mobile
      },
      ticketsInCartLength() {
        return this.perfomanceInCart.length
      },
      aboveInCart() {
        return this.$store.getters.cartAbove
      },
      loading() {
        return this.$store.getters.loading
      },
      documentLang() {
        return this.$store.getters.documentLang
      },
      allTicketCount() {
        return this.perfomanceInCart.reduce((sum, perfomance) => {
          return sum + perfomance.data.tickets.data.length
        }, 0);
      }
    },
    methods: {
      openTickets(event) {
        this.showTicketsPopup = event;
      }
    }
  }
</script>
