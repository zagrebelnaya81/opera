<template>
  <embed
    type="image/svg+xml"
    :src="src"
    ref="embed"
  >
</template>

<script>
  import SvgPanZoom from "../../../../../../public/js/plugins/svg-pan-zoom.js";
  import Hammer from "../../../../../../public/js/plugins/hammer.js";

  let svgScheme = null,
      eventsHandler = {
        haltEventListeners: [`touchstart`, `touchend`, `touchmove`, `touchleave`, `touchcancel`],
        init: function(options) {
          let instance = options.instance,
              initialScale = 1,
              pannedX = 0,
              pannedY = 0;

          this.hammer = Hammer(options.svgElement, {
            inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
          })

          this.hammer.get(`pinch`).set({enable: true})

          this.hammer.on(`doubletap`, function(ev){
            instance.zoomIn()
          })

          // Handle pan
          this.hammer.on(`panstart panmove`, function(ev){
            // On pan start reset panned variables
            if (ev.type === `panstart`) {
              pannedX = 0
              pannedY = 0
            }

            // Pan only the difference
            instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
            pannedX = ev.deltaX
            pannedY = ev.deltaY
          })

          // Handle pinch
          this.hammer.on(`pinchstart pinchmove`, function(ev){
            // On pinch start remember initial zoom
            if (ev.type === `pinchstart`) {
              initialScale = instance.getZoom()
              instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
            }

            instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
          })

          // Prevent moving the page on some devices when panning over SVG
          options.svgElement.addEventListener(`touchmove`, function(e){ e.preventDefault(); });
        },
        destroy: function(){
          this.hammer.destroy()
        }
      };

  class Seat {
    constructor(item) {
      this.id = item.id;
      this.domElem = null;
      this.sectionName = null;
      this.section = item.seatPrice.data.section_number;
      this.row = item.seatPrice.data.row_number;
      this.seat = item.seatPrice.data.seat_number;
      this.price = item.seatPrice.data.price;
      this.isAvailable = item.isAvailable;
      this.recommended = item.seatPrice.data.seat_recommended;
      this.seat_preview = item.seatPrice.data.seat_preview;
      this.seat_poster = item.seatPrice.data.seat_poster;
    }

    setAvailable() {
      this.domElem.setAttribute(`class`, `available`);
    }

    setRecommended() {
      this.domElem.setAttribute(`class`, `best`);
    }

    setNotAvailable() {
      this.domElem.setAttribute(`class`, `not-available`);
    }

    setSelected() {
      this.domElem.setAttribute(`class`, `selected`);
    }

    setPartialVisible() {
      this.domElem.setAttribute(`data-partial-visible`, true);
    }

    removePartialVisible() {
      this.domElem.removeAttribute(`data-partial-visible`);
    }

    setDomElement(el) {
      this.domElem = el;
    }

    setSectionName(name) {
      this.sectionName = name;
    }
  }

  export default {
    props: {
      src: {
        type: String
      },
      zoom: {
        type: Number
      }
    },
    data() {
      return {
        seatsClass: [],
        translation: {
          scene: {
            ru: `СЦЕНА`,
            en: `SCENE`,
            ua: `СЦЕНА`
          }
        }
      }
    },
    mounted() {
      this.$refs.embed.addEventListener(`load`, () => {
        const sceneSelector = this.$refs.embed.getSVGDocument().querySelector(`.scene-text`);

        if (sceneSelector) sceneSelector.textContent = this.translation.scene[this.documentLang];

        this.setDomItemInSeatsArr();
        this.markSeats();

        svgScheme = SvgPanZoom(this.$refs.embed, {
          viewportSelector: ".svg-pan-zoom_viewport",
          panEnabled: true,
          controlIconsEnabled: false,
          zoomEnabled: true,
          dblClickZoomEnabled: false,
          mouseWheelZoomEnabled: true,
          preventMouseEventsDefault: true,
          zoomScaleSensitivity: 0.2,
          minZoom: 1,
          maxZoom: 10,
          fit: true,
          contain: false,
          center: true,
          refreshRate: "auto",
          eventsListenerElement: null,
          customEventsHandler: eventsHandler
        });

        let rightMouseTimer = null;

        this.$refs.embed.getSVGDocument().addEventListener(`contextmenu`, (e) => {
          e.preventDefault();

          if (rightMouseTimer) {
            this.svgSchemeZoomOut();
            clearTimeout(rightMouseTimer);
            rightMouseTimer = null;
          }

          rightMouseTimer = setTimeout(() => {
            clearTimeout(rightMouseTimer);
            rightMouseTimer = null;
          }, 300);
        });

        this.$refs.embed.getSVGDocument().addEventListener(`dblclick`, (e) => {
          e.preventDefault();

          this.svgSchemeZoomIn();
        });

        this.$refs.embed.getSVGDocument().addEventListener(`click`, (e) => {
          const target = e.target.closest(`[data-seat]`);
          if (target && !target.classList.contains(`not-available`) && !target.hasAttribute(`data-partial-visible`)) {
            if (!target.classList.contains(`selected`)) {
              this.addTicketToCart(target);
            } else {
              this.removeTicketFromCart(target);
            }
          }
        });

        let seat = null,
            timer = null;

        const getSeat = (e) => {
          clearTimeout(timer);

          const target = e.target.closest(`[data-seat]`);

          if (target) {
            if (target !== seat && !target.classList.contains(`not-available`)) {
              timer = setTimeout(() => {
                seat = target;

                const targetInArr = this.seatsClass.find(item => item.domElem === target);

                const obj = {
                  sectionName: targetInArr.domElem.closest(`[data-section]`).getAttribute(`data-name-${document.documentElement.getAttribute(`lang`)}`),
                  section: targetInArr.section,
                  row: targetInArr.row,
                  seat: targetInArr.seat,
                  price: targetInArr.price,
                  ticketId: targetInArr.id,
                  coordinates: target.getBoundingClientRect()
                };

                this.$emit(`seat-hover`, obj);
              }, 200);
            }
          } else {
            if (seat != null) {
              seat = null;

              this.$emit(`seat-hover`, null);
            }
          }
        };

        this.$refs.embed.addEventListener(`mouseover`, (e) => {
          this.$refs.embed.getSVGDocument().addEventListener(`mousemove`, getSeat);
        });

        this.$refs.embed.addEventListener(`mouseout`, (e) => {
          this.$refs.embed.getSVGDocument().removeEventListener(`mousemove`, getSeat);
        })
      });
    },
    watch: {
      zoom(val, oldVal) {
        if (!svgScheme) return false;

        val > oldVal ? this.svgSchemeZoomIn() : this.svgSchemeZoomOut();
      },
      perfomanceFilterPrice(val) {
        this.availableNotCartSeats.forEach(ticket => {
          if (ticket.price >= val[0] && ticket.price <= val[1]) {
            ticket.removePartialVisible();
          } else {
            ticket.setPartialVisible();
          }
        })
      },
      ticketsInCart(val) {
        this.availableNotCartSeats.forEach(seat => {
          seat.recommended ? seat.setRecommended() : seat.setAvailable();

          seat.price >= this.perfomanceFilterPrice[0] && seat.price <= this.perfomanceFilterPrice[1] ? seat.removePartialVisible() : seat.setPartialVisible();
        });

        this.setDomItemInSeatsArr();
        this.markSeats();
      }
    },
    methods: {
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
      markSeats() {
        this.seatsClass.forEach(seat => {
          if (!seat.isAvailable) {
            seat.setNotAvailable();
          } else {
            if (this.ticketsInCart.filter(item => item.id === seat.id).length) {
              seat.setSelected();
            } else {
              if (seat.recommended) {
                seat.setRecommended();
              } else {
                seat.setAvailable();
              }

              seat.price >= this.perfomanceFilterPrice[0] && seat.price <= this.perfomanceFilterPrice[1] ? seat.removePartialVisible() : seat.setPartialVisible();
            }
          }
        })
      },
      setDomItemInSeatsArr() {
        const svgObj = this.$refs.embed.getSVGDocument().documentElement;

        this.seatsClass = this.allSeats
          .filter(item => svgObj.querySelector(`[data-section="${item.seatPrice.data.section_number}"]`))
          .map(item => {
            const seat = new Seat(item);

            const sectionName = svgObj.querySelector(`[data-section="${seat.section}"]`).getAttribute(`data-name-${this.documentLang}`),
                  domElement = svgObj.querySelector(`[data-section="${seat.section}"] [data-row="${seat.row}"] [data-seat="${seat.seat}"]`);

            domElement.setAttribute(`data-ticket-id`, item.id)
            seat.setDomElement(domElement);
            seat.setSectionName(sectionName);

            return seat;
          });

        [...svgObj.querySelectorAll(`[data-seat]:not([data-id])`)].forEach(item => {
          item.classList.add(`not-markable`);
          item.classList.add(`not-available`);
        })
      },
      addTicketToCart(target) {
        if (this.ticketsInCart.length <= 8) {
          const targetInArr = this.seatsClass.find(item => item.domElem === target);

          this.$store.commit(`addTicketsToCart`, targetInArr);
          targetInArr.setSelected();
          this.$emit(`add-ticket-to-cart`);
        } else {
          this.$emit(`too-much-tickets`);
        }
      },
      removeTicketFromCart(target) {
        const targetInArr = this.seatsClass.find(item => item.domElem === target);

        this.$store.commit(`removeTickets`, [targetInArr]);
        this.$emit(`remove-ticket-from-cart`);
      }
    },
    computed: {
      documentLang() {
        return this.$store.getters.documentLang;
      },
      allSeats() {
        return this.$store.getters.allSeats;
      },
      perfomanceFilterPrice() {
        return this.$store.getters.perfomanceFilterPrices
      },
      availableSeats() {
        return this.seatsClass.filter(ticket => ticket.isAvailable == true)
      },
      availableNotCartSeats() {
        return this.availableSeats.filter(ticket => !this.ticketsInCart.find(item => item.id === ticket.id))
      },
      ticketsInCart() {
        return this.$store.getters.tickets
      }
    }
  }
</script>
