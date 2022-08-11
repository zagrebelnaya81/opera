<template>
  <div class="cart">
    <h2 class="cart__title">
      Квитки
      <template v-if="cart.length">
        <Cross v-if="!load" width="12" height="12" fill="red" @click="removeAllTicketG"></Cross>
        <Preloader :size="12" class="preloader--inline preloader--small" v-else></Preloader>
      </template>
    </h2>
    <div class="cart__table-wrap">
      <table class="cart__table">
        <thead>
        <tr>
          <template v-if="!hallOutdoor">
            <!-- <th>Сектор</th> -->
            <th>Ряд</th>
            <th>Місце</th>
          </template>
          <th v-else colspan="2">№</th>
          <th colspan="2">Ціна</th>
        </tr>
        </thead>
        <template v-if="cart.length">
          <tbody>
          <CartItem v-for="(ticket, num) in cart" :key="ticket.id" :ticket="ticket" :num="num"></CartItem>
          </tbody>
        </template>
      </table>
      <button
        v-if="cart.length !== 0 && cart[0].status"
        type="button"
        class="btn btn-success btn-sm"
        @click="chooseAnotherTickets"
      >
        Вибрати інші квитки
      </button>
    </div>
    <div class="cart__descr" v-if="cart.length">
      <p>
        Квитків загалом:
        <span>{{ cart.length }}</span>
      </p>
      <p>
        Ціна загалом:
        <span>{{ totalPrice }}</span>
      </p>
    </div>
    <div class="cart__btns" v-if="cart.length">
      <button
        type="button"
        v-if="!soldTickets"
        class="btn btn-success btn-sm"
        @click="payment"
      >Оплата</button>
      <button
        type="button"
        v-if="soldTickets"
        class="btn btn-primary btn-sm"
        @click="printTickets"
      >Друк</button>
      <button
        type="button"
        class="btn btn-secondary btn-sm"
        v-if="!bookedTickets && !vipBookedTickets && !soldTickets"
        @click="booking"
      >Бронь</button>
      <!--      <button-->
      <!--        type="button"-->
      <!--        class="btn btn-secondary btn-sm ml-1"-->
      <!--        v-if="bookedTickets"-->
      <!--        @click="cancelBooking"-->
      <!--      >Відмінити бронювання</button>-->
      <!--      <button-->
      <!--        type="button"-->
      <!--        class="btn btn-secondary btn-sm ml-1"-->
      <!--        v-if="isVip && vipBookedTickets"-->
      <!--        @click="cancelBooking"-->
      <!--      >Відмінити VIP бронювання</button>-->
      <button
        type="button"
        class="btn btn-secondary btn-sm ml-1"
        v-if="soldTickets"
        @click="returnTickets"
      >Повернути квитки</button>
    </div>
    <Popup v-if="paymentOpen" @popup-close="paymentOpen = false">
      <Payment @close="paymentOpen = false" @refreshData="$emit(`refreshData`)"></Payment>
    </Popup>
    <Popup v-if="bookingOpen" @popup-close="bookingOpen = false">
      <BookingTicket @close="bookingOpen = false" @refreshData="$emit(`refreshData`)"></BookingTicket>
    </Popup>
    <Popup v-if="cancelBookingOpen" @popup-close="cancelBookingOpen = false">
      <CancelBookingTicket @close="cancelBookingOpen = false" @refreshData="$emit(`refreshData`)"></CancelBookingTicket>
    </Popup>
    <Popup v-if="returnTicketsOpen" @popup-close="returnTicketsOpen = false">
      <ReturnTicket @close="returnTicketsOpen = false" @refreshData="$emit(`refreshData`)"></ReturnTicket>
    </Popup>
  </div>
</template>

<script>
import Cross from "../Common/Cross/Cross";
import Popup from "../Common/Popup/Popup";
import Payment from "../Payment/Payment";
import BookingTicket from "../BookingTicket/BookingTicket";
import ReturnTicket from "../ReturnTicket/ReturnTicket";
import CancelBookingTicket from "../CancelBookingTicket/CancelBookingTicket";
import CartItem from "./CartItem";
import Preloader from "../Common/Preloader/Preloader";

export default {
  components: {
    Cross,
    Popup,
    Payment,
    BookingTicket,
    ReturnTicket,
    CancelBookingTicket,
    CartItem,
    Preloader
  },
  data() {
    return {
      paymentOpen: false,
      bookingOpen: false,
      cancelBookingOpen: false,
      returnTicketsOpen: false,
      load: false,
      removedTickets: [],
      storedTickets: []
    };
  },
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
    isVip() {
      return this.$store.getters.getPermissions.includes("booking-vip");
    },
    bookedTickets() {
      return this.cart.length > 0 && (this.cart[0].status === "booked" || this.cart[0].status === "distributor_booked");
    },
    vipBookedTickets() {
      return this.cart.length > 0 && this.cart[0].status === "vip_booked";
    },
    soldTickets() {
      return this.cart.length > 0 && this.cart[0].status === "sold";
    },
    totalPrice() {
      return this.cart.reduce((sum, item) => {
        return sum + parseInt(item.price);
      }, 0);
    },
    hallOutdoor() {
      return this.$store.getters.getHallInfo.hall.data.name == `outdoor`;
    }
  },
  watch: {
    cart (val) {
      if (this.$store.getters.getTemporaryStorage.length) {
        this.storedTickets.push(this.$store.getters.getTemporaryStorage[0])
        this.storedTickets = Array.from(new Set(this.storedTickets))
      }
      if (val.length) {
        this.removedTickets = this.storedTickets.map(e => {
          if (!val.find(a => e == a.id)) {
            return {
              id: e,
              orderId: val[0].orderId
            }
          }
        })
      }
    }
  },
  methods: {
    printTickets() {
      this.$store
        .dispatch(`getPrintTicketsInfoForCart`, this.cart)
        .then(ticketsForPrint => {
          const toPrint = {
            hallInfo: ticketsForPrint.hallInfo,
            order: {
              data: {
                tickets: {
                  data: ticketsForPrint.tickets
                }
              }
            }
          };
          this.$store.commit(`setOrderForPrint`, toPrint);
          this.load = false;
        })
        .catch(err => {
          console.warn(err);
          this.load = false;
        });
    },
    removeAllTicket() {
      this.load = true;
      this.$store
        .dispatch(`removeTicketFromCart`, this.cart.map(ticket => ticket))
        .then(() => (this.load = false))
        .catch(err => {
          console.warn(err);
          this.load = false;
        });
      if (this.removedTickets.length) {
        this.$store
          .dispatch(`returnTicketsFromCart`, this.removedTickets)
          .then(data => {
            this.$store.dispatch(`clearCart`);
            this.$emit(`refreshData`);
          })
      }
    },
    chooseAnotherTickets(){
        this.$store
            .dispatch(`returnTicketsFromCart`, this.removedTickets)
            .then(data => {
                this.$store.dispatch(`clearCart`);
            })
    },
    payment() {
      this.paymentOpen = true;
    },
    booking() {
      this.bookingOpen = true;
    },
    cancelBooking() {
      this.cancelBookingOpen = true;
    },
    returnTickets() {
      this.returnTicketsOpen = true;
    },
    removeAllTicketG() {
      if (this.bookedTickets ||  this.vipBookedTickets || this.soldTickets) {
        this.returnTicketsOpen = true;
      } else {
        this.removeAllTicket()
      }
    }
  },
    async beforeDestroy() {
      await  this.removeAllTicket();
    }
};
</script>
