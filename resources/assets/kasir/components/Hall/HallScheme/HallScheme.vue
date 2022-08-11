<template>
  <div class="hall__scheme-inner">
    <embed type="image/svg+xml" :src="hallSrc" ref="embed" />
    <HallSchemeHint :config="seatConfig" :scheme="$refs.embed" v-if="seatHover"></HallSchemeHint>
    <Popup
      class="popup--600"
      v-if="showPopup"
      @popup-close="closeShowPopup"
    >Ви не можете додавати квитки з різними статусами або заброньовані для різних користувачів</Popup>
    <popupNotAvailable
      class="popup--600"
      v-if="showNotAvailablePopup"
      @popup-close="closeNotAvailablePopup"
      :notAvailableTickets="notAvailableTicketsForPopup"
    >
      Частина мість більше недоступна:
    </popupNotAvailable>
    <Popup v-if="bookingOpen" @popup-close="bookingOpen = false">
      <BookingTicket @close="bookingOpen = false" @refreshData="$emit(`refreshData`)"></BookingTicket>
    </Popup>
  </div>
</template>

<script>
import SvgPanZoom from "../../../../../../public/js/plugins/svg-pan-zoom.js";
import HallSchemeHint from "./HallSchemeHint";
import HallHelper from "./HallHelper";
import Popup from "../../Common/Popup/Popup";
import PopupNotAvailableTickets from "../../Common/Popup/PopupNotAvailableTickets";
import BookingTicket from "../../BookingTicket/BookingTicket";

let svgScheme = null;

export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    zoom: {
      type: Number
    }
  },
  components: {
    HallSchemeHint,
    Popup,
    popupNotAvailable : PopupNotAvailableTickets,
    BookingTicket
  },
  data() {
    return {
      seatHover: false,
      seatConfig: {},
      showPopup: false,
      rmb: false,
      selectedTickets: [],
      notAvailableTicketsForPopup: [],
      showNotAvailablePopup: false,
      storeCart: null,
      bookingOpen: false
    };
  },
  mounted() {
    this.$refs.embed.addEventListener(`load`, () => {
      this.markSeats();

      svgScheme = SvgPanZoom(this.$refs.embed, {
        viewportSelector: ".svg-pan-zoom_viewport",
        panEnabled: false,
        controlIconsEnabled: false,
        zoomEnabled: true,
        dblClickZoomEnabled: false,
        mouseWheelZoomEnabled: false,
        preventMouseEventsDefault: false,
        zoomScaleSensitivity: 0.2,
        minZoom: 1,
        maxZoom: 10,
        fit: true,
        contain: false,
        center: true,
        refreshRate: "auto",
        eventsListenerElement: null
      });
      this.$refs.embed.getSVGDocument().addEventListener(`contextmenu`, e => {
        e.preventDefault();
      });

      this.$refs.embed.getSVGDocument().addEventListener("mousedown", (e) => {

        // right click
        if (e.button === 2) {
          this.rmb = true;
        }

      });

      this.$refs.embed.getSVGDocument().addEventListener("mouseup", (e) => {
        if (e.button === 2) {
          this.rmb = false;

          if(this.selectedTickets) {
            this.selectedTickets.map(ticket => {
              if (!ticket.hasAttribute(`data-check`)) {
                if(ticket.hasAttribute(`data-not-available`)) {
                  this.notAvailableTicketsForPopup.push({
                    row: ticket.parentNode.getAttribute('data-row'),
                    seat: ticket.getAttribute('data-seat')
                  })
                } else {
                  this.addTicketToCart(ticket)
                }
              } else {
                this.removeTicketFromCart(ticket)
              }
            })
            if(this.notAvailableTicketsForPopup.length !== 0 && this.selectedTickets.length !== 0) {
              this.selectedTickets = []
              this.showNotAvailablePopup = true
            }
            this.selectedTickets = []
          }
        }
      });

      this.$refs.embed.getSVGDocument().addEventListener(`mouseover`, e => {
        const target = e.target.closest(`[data-seat]`);

        if (target) {
          if(this.rmb) {
            if (!target.hasAttribute(`data-check`) && !target.hasAttribute(`data-not-available`)) {
              this.selectedTickets.push(target)
              target.setAttribute('data-selected-seat', true)
            } else if(target.hasAttribute(`data-check`) && !target.hasAttribute(`data-not-available`)) {
              this.selectedTickets.push(target)
              target.setAttribute('data-selected-seat', true)
            } else if(target.hasAttribute(`data-not-available`)) {
              this.selectedTickets.push(target)
            }
          }
        }
      })


      // if (!target.hasAttribute(`data-check`)) {
      //   if (target.hasAttribute(`data-not-available`)) {
      //     this.addNotAvailableTicketToCart(target);
      //   } else {
      //     this.addTicketToCart(target);
      //   }
      // }
      // else if(target.hasAttribute(`data-check`)) {
      //   this.removeTicketFromCart(target);
      //   target.removeAttribute('data-check')
      // }
      this.$refs.embed.getSVGDocument().addEventListener(`click`, e => {
          // const target = e.target.closest(`[data-seat]`);
          const target = e.target.parentNode;
          
          if (target) {
          if (!target.hasAttribute(`data-check`)) {
            if (target.hasAttribute(`data-not-available`)) {
              this.addNotAvailableTicketToCart(target);
            } else {
              this.addTicketToCart(target);
            }
          } else if (target.hasAttribute(`data-check`)) {
              console.log(e.target, target);
              this.removeTicketFromCart(target);
          }
        }
      });

      let seat = null,
        timer = null;

      const getSeat = e => {
        clearTimeout(timer);

        const target = e.target.closest(`[data-seat]`);
        if (target) {
          if (target.hasAttribute(`data-not-available`)) {
            seat = target;
            // TODO: Remove after adding Order Id
            timer = setTimeout(() => {
              this.seatConfig = HallHelper.getSeatConfig(target);
              this.seatHover = true;
            }, 200);
            if (target.hasAttribute(`data-order-id`)) {
              const orderId = target.getAttribute(`data-order-id`);
              const status =
                target.getAttribute(`data-status`) == "sold"
                  ? "sold"
                  : "booked";
              timer = setTimeout(() => {
                const payload = `param=id&query=${orderId}&status=${status}`;
                this.$store
                  .dispatch(`getSearchResult`, payload)
                  .then(orderData => {
                    if (orderData != null) {
                      this.seatConfig = HallHelper.getSeatConfigForOrder(
                        target,
                        orderData
                      );
                      this.seatHover = true;
                    }
                  })
                  .catch(err => {
                    console.warn(err);
                  });
              }, 200);
            }
          } else if (
            target !== seat &&
            !target.hasAttribute(`data-not-available`)
          ) {
            timer = setTimeout(() => {
              seat = target;
              this.seatConfig = HallHelper.getSeatConfig(target);
              this.seatHover = true;
            }, 200);
          }
        } else {
          if (seat != null) {
            seat = null;
            this.seatHover = false;
            this.seatConfig = {};
          }
        }
      };

      /*
       *  HOVER LOGIC
       */
      this.$refs.embed.addEventListener(`mouseover`, e => {
        this.$refs.embed
          .getSVGDocument()
          .addEventListener(`mousemove`, getSeat);
      });

      this.$refs.embed.addEventListener(`mouseout`, e => {
        this.$refs.embed
          .getSVGDocument()
          .removeEventListener(`mousemove`, getSeat);
      });

      this.$root.$on('moveLeft', () => {
            this.schemeLeftMove()
        });
      this.$root.$on('moveRight', () => {
            this.schemeRightMove()
        });
      this.$root.$on('moveUp', () => {
            this.schemeUpMove()
        });
      this.$root.$on('moveDown', () => {
            this.schemeRDownMove()
        });
    });
  },
  computed: {
    hallInfo() {
      return this.$store.getters.getHallInfo;
    },
    hallAdminInfo() {
      return this.$store.getters.getHallAdminInfo;
    },
    hallSrc() {
      return `/design/img/scheme/${this.hallInfo.hall.data.name}-admin.svg`;
    },
    hallTickets() {
      return this.hallInfo.tickets.data;
    },
    hallAdminTickets() {
      console.log(this.hallAdminInfo.tickets.data);
      return this.hallAdminInfo.tickets.data;
    },
    hallPrice() {
      return this.event.priceZones;
    },
    temporaryStorage() {
      return this.$store.getters.getTemporaryStorage;
    },
    temporaryCart() {
      return this.$store.getters.getCartTemporary;
    },
    cart() {
      return this.$store.getters.getCart;
    },
    autoscale() {
      return this.$store.getters.getHallAutoscale;
    }
  },
  methods: {
    schemeRightMove(){
      svgScheme.panBy({x: 50, y: 0})
    },
    schemeLeftMove(){
      svgScheme.panBy({x: -50, y: 0})
    },
    schemeUpMove(){
      svgScheme.panBy({x: 0, y: -50})
    },
    schemeRDownMove(){
      svgScheme.panBy({x: 0, y: 50})
    },
    cancelBooking() {
      this.$store
        .dispatch(`returnTicketsFromCart`, this.cart)
        .then(data => {
          this.$store.dispatch(`clearCart`);
          this.$emit(`refreshData`);
        })
        .catch(err => {
          console.warn(err);
        });
    },
    markSeats() {
      const svgObj = this.$refs.embed.getSVGDocument().documentElement;

      this.hallAdminTickets.forEach(ticket => {
        HallHelper.styleSeat(svgObj, ticket, this.hallPrice);
      });

      svgObj.querySelectorAll(`[data-seat]:not([data-id])`).forEach(item => {
        item.setAttribute(`data-not-available`, true);
        item.setAttribute(`data-not-markable`, true);
      });
    },
    addTicketToCart(target) {
      const ticket = HallHelper.getTicketFromTargetForCart(target);
      if (!HallHelper.canAddTicketToCart(this.cart, ticket)) {
        this.showPopup = true;
        return;
      }

      if (!this.temporaryCart.find(item => item.id == ticket.id)) {
        this.$store.commit(`addTicketToCartTemporary`, ticket);

        this.$store
          .dispatch(`addTicketToCart`, ticket)
          .then(data => {
            target.setAttribute(`data-check`, true);
            this.$store.commit(`removeTicketFromCartTemporary`, ticket);
            if(target.hasAttribute('data-selected-seat')){
              target.removeAttribute('data-selected-seat')
            }
          })
          .catch(err => {
            target.setAttribute(`data-not-available`, true);
            this.popupSeatIsNotAvailable = true;
            this.$store.commit(`removeTicketFromCartTemporary`, ticket);
            this.$emit(`refreshData`, true);
          });
      }
    },
    removeTicketFromCart(target) {
      const targetId = target.getAttribute(`data-id`);

      const ticket = this.cart.find(item => item.id == targetId)

        if (ticket) {
          this.$store.dispatch(`removeTicketFromCart`, [ticket]).then( () => {
          target.removeAttribute('data-check')
          target.removeAttribute('data-selected-seat')
        });

      }
    },
    addNotAvailableTicketToCart(target) {
      const targetId = target.getAttribute(`data-id`);
      const svgEl = this.$refs.embed.getSVGDocument();
      const orderId = target.getAttribute(`data-order-id`);
      const ticketsElements = svgEl.querySelectorAll(
        `[data-order-id="${orderId}"]`
      );

      let tickets = [];
      let ticketsId = [];
      if(this.cart.length === 0) {
        ticketsElements.forEach(ticketElement => {

          const cartContainsTicket =
            this.cart.filter(t => t.id == ticketElement.getAttribute(`data-id`))
              .length > 0;
          if (cartContainsTicket) {
            return;
          }
          const ticket = HallHelper.getNotAvailableTicketFromTargetForCart(
            ticketElement,
            target,
            orderId
          );

          if (!HallHelper.canAddTicketToCart(this.cart, ticket)) {
            this.showPopup = true;
            return;
          }

          tickets.push(ticket);
          ticketsId.push(ticket.id);

          if (!this.temporaryCart.find(item => item.id == ticket.id)) {
            this.$store.commit(`addTicketToCartTemporary`, ticket);
            ticketElement.setAttribute(`data-check`, true);
          }
        });
      } else {
        const cartContainsTicket =
          this.cart.filter(t => t.id == targetId)
            .length > 0;
        if (cartContainsTicket) {
          return;
        }
        const ticket = HallHelper.getNotAvailableTicketFromTargetForCart(
          target,
          target,
          orderId
        );

        if (!HallHelper.canAddTicketToCart(this.cart, ticket)) {
          this.showPopup = true;
          return;
        }

        tickets.push(ticket);
        ticketsId.push(ticket.id);

        if (!this.temporaryCart.find(item => item.id == ticket.id)) {
          this.$store.commit(`addTicketToCartTemporary`, ticket);
          target.setAttribute(`data-check`, true);
        }
      }
      this.$store
        .dispatch(`addNotAvailableTicketsToCart`, tickets)
        .then(data => {
          this.$store.commit(`removeTicketsFromCartTemporary`, ticketsId);
        })
        .catch(err => {
          console.warn(err);
          this.$store.commit(`removeTicketsFromCartTemporary`, ticketsId);
          this.$emit(`refreshData`, true);
        });
    },
    closeShowPopup() {
      this.showPopup = false;
    },
    closeNotAvailablePopup() {
      this.showNotAvailablePopup = false
      this.notAvailableTicketsForPopup = []
    },
    svgSchemeZoomIn() {
      if (Math.round(svgScheme.getZoom()) >= 10) {
        svgScheme.resetZoom();
        svgScheme.resetPan();
      } else {
        svgScheme.zoomIn();
      }
    },
    svgSchemeZoomOut() {
      if (Math.round(svgScheme.getZoom()) <= 1) {
        svgScheme.resetZoom();
        svgScheme.resetPan();
      } else {
        svgScheme.zoomOut();
      }
    },
    resetSeatStyle(ticketId, svgObj) {
        const target = svgObj.querySelector(`[data-id='${ticketId}']`);
        if (target.getAttribute('data-status')){

            let findedTicket = this.hallTickets.findIndex(
                item => item.id == ticketId
            );
            let ticket = this.hallTickets[findedTicket];

            ticket.isAvailable = 1;
            const circle = target.querySelector(`circle`);

            const text= target.querySelector(`text`);
            let color = this.hallPrice[ticket.seatPrice.data.price_zone_id].color;
            circle.style.fill = color;

            circle.style.stroke = color;
            text.style.fill = '#333';
            if (target.getAttribute('data-status') === 'sold'){
                this.event.seats_sold -= 1;
                this.event.seats_available += 1;
            } else {
                this.event.seats_booked -= 1;
                this.event.seats_available += 1;
            }

            target.removeAttribute('data-status');
            target.removeAttribute('data-check');
            target.removeAttribute('data-order-id');
            target.removeAttribute('data-not-available');
        }
    }
  },
  watch: {
    zoom(val, oldVal) {
      if (!svgScheme) return false;

      val > oldVal ? this.svgSchemeZoomIn() : this.svgSchemeZoomOut();
    },
    cart(newVal) {
      if (this.storeCart && newVal && this.storeCart.length > newVal.length) {
        this.storeCart.map(item => {
          if (!newVal.length || !newVal.find(el => el.id === item.id)) {
            const svgObj = this.$refs.embed.getSVGDocument().documentElement;
            const target = svgObj.querySelector(`[data-id='${item.id}']`)
            target.removeAttribute('data-check')
            target.removeAttribute('data-selected-seat')
          }
        })
      }
      this.storeCart = JSON.parse(JSON.stringify(newVal))
    },
    temporaryStorage(val) {
      if (!val.length) return false;
      if (!svgScheme) return false;
        const svgObj = this.$refs.embed.getSVGDocument().documentElement;
        val.forEach( ticketId => {
            this.resetSeatStyle(ticketId, svgObj)
        });
      this.$store.commit(`clearTemporaryStorage`);
    },
    autoscale(val) {
      if (!val) return false;

      svgScheme.resetZoom();
      svgScheme.resetPan();
    }
  }
};
</script>
<style scoped>
.hoveredCircle {
  stroke:rgb(255,255,0)
}
</style>
