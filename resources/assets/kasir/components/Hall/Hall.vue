<template>
  <div>
    <KasirHeader>
      <router-link class="btn btn-secondary btn-sm mr-3" :to="{name: 'Poster'}" exact>До афiши</router-link>
      <button
        type="button"
        class="btn btn-secondary btn-sm mr-3"
        @click="getLastOrder"
        v-if="showBtnLastOrder"
      >Останнє замовлення</button>
      <button type="button" class="btn btn-secondary mr-2 btn-sm zoom" @click="schemeZoomChange(true)">+</button>
      <button type="button" class="btn btn-secondary btn-sm zoom" @click="schemeZoomChange(false)">-</button>
    </KasirHeader>

    <template v-if="startLoading">
      <Preloader></Preloader>
    </template>

    <section class="hall wrap-full" v-else>
      <aside class="hall__aside">
        <HallDescription></HallDescription>
        <Cart @refreshData="refreshAvailableSeats"></Cart>
      </aside>

      <div class="hall__scheme">
        <template v-if="hallShemeVisible">
          <template v-if="refreshSeats">
            <Preloader class="preloader--inline"></Preloader>
          </template>
          <HallScheme ref="hallSchema" :event="eventInfo" :zoom="zoom" v-else @refreshData="refreshAvailableSeats"></HallScheme>
        </template>
        <template v-else>
          <HallSchemeWithoutPlace :event="eventInfo"></HallSchemeWithoutPlace>
        </template>
      </div>

      <aside class="hall__info">
        <template v-if="refreshInfoSeats">
          <Preloader class="preloader--inline" :size="50"></Preloader>
        </template>
        <HallSeats :event="eventInfo" v-else></HallSeats>
        <HallPrice :event="eventInfo"></HallPrice>
        <!-- <HallPriceDefault></HallPriceDefault> -->
      </aside>
    </section>
    <Popup v-if="showPopupLastOrder" @popup-close="showPopupLastOrder = false">
      <LastOrder></LastOrder>
    </Popup>
    <Popup
      v-if="popupSeatIsNotAvailable"
      @popup-close="popupSeatIsNotAvailable = false"
    >Одне, або декілько місць стали не доступні</Popup>
    <Print v-if="printAccept" :tickets="printTickets"></Print>
  </div>
</template>

<script>
import Preloader from "../Common/Preloader/Preloader";
import KasirHeader from "../Common/KasirHeader/KasirHeader";
import HallDescription from "./HallDescription/HallDescription";
import HallSeats from "./HallSeats/HallSeats";
import HallPrice from "./HallPrice/HallPrice";
// import HallPriceDefault from "./HallPrice/HallPriceDefault"
import HallScheme from "./HallScheme/HallScheme";
import HallSchemeWithoutPlace from "./HallScheme/HallSchemeWithoutPlace";
import Cart from "../Cart/Cart";
import Popup from "../Common/Popup/Popup";
import LastOrder from "../LastOrder/LastOrder";
import Print from "../Common/Print/Print";

export default {
  components: {
    Preloader,
    KasirHeader,
    HallDescription,
    HallSeats,
    HallPrice,
    // HallPriceDefault,
    HallScheme,
    HallSchemeWithoutPlace,
    Cart,
    Popup,
    LastOrder,
    Print
  },
  created() {
    const hallId = this.$route.params.id;

    this.startLoading = true;
    this.$store
      .dispatch(`getHallData`, hallId)
      .then(data => {
        if (this.eventInfo) {
          this.hallShemeVisible =
            data.hall.data.name == `outdoor` ? false : true;
          this.startLoading = false;
        } else {
          this.hallShemeVisible =
            data.hall.data.name == `outdoor` ? false : true;

          this.$store
            .dispatch(`getEventByDate`, data.date)
            .then(data => (this.startLoading = false))
            .catch(err => {
              console.log(err);
              this.startLoading = false;
            });
        }
      })
      .catch(err => {
        console.warn(err);
        console.log(err);
        this.$router.replace({ name: `Poster` });
      });


      this.refreshSeats = true;

      this.$store.dispatch(`getHallData`, hallId).then(data => {
        this.$store
          .dispatch(`getHallAdminData`, hallId)
          .then(data => {
            this.refreshSeats = false;
          })
          .catch(err => {
            console.warn(err);
            this.$router.replace({ name: `Poster` });
          });
      });


    const lastOrder = localStorage.getItem(`lastOrder`);

    if (lastOrder) this.$store.commit(`saveLastOrder`, JSON.parse(lastOrder));
  },
  data() {
    return {
      startLoading: false,
      hallShemeVisible: false,
      refreshSeats: false,
      refreshInfoSeats: false,
      showPopupLastOrder: false,
      popupSeatIsNotAvailable: false,
      zoom: 0
    };
  },
  computed: {
    showBtnLastOrder() {
      return this.$store.getters.getLastOrder.order;
    },
    
    eventInfo() {
      const id = this.$route.params.id;
      let currentEvent = null;

      this.$store.getters.events.forEach(item => {
        const resultEvent = item.data.find(event => event.id == id);

        if (resultEvent) currentEvent = resultEvent;
      });

      return currentEvent;
    },
    printTickets() {
      return this.$store.getters.getOrderForPrint;
    },
    printAccept() {
      return this.$store.getters.getPrintAccept;
    }
  },
  methods: {

    resetZoom() {
      this.$store.commit(`setHallAutoscale`, true);

      setTimeout(() => {
        this.$store.commit(`setHallAutoscale`, false);
      }, 300);
    },
    schemeZoomChange(zoomIn) {
      zoomIn ? this.zoom++ : this.zoom--;
    },
    refreshAvailableSeats(popupCall) {
      const hallId = this.$route.params.id;

      this.refreshSeats = true;

      this.$store.dispatch(`getHallData`, hallId).then(data => {
        this.$store
          .dispatch(`getHallAdminData`, hallId)
          .then(data => {
            this.refreshSeats = false;
          })
          .catch(err => {
            console.warn(err);
            this.$router.replace({ name: `Poster` });
          });
      });

      this.refreshInfoSeats = true;
      this.$store
        .dispatch(`refreshEventById`, hallId)
        .then(data => (this.refreshInfoSeats = false));

      if (popupCall) this.popupSeatIsNotAvailable = true;
    },
    getLastOrder() {
      this.showPopupLastOrder = true;
    }
  }
};
</script>
