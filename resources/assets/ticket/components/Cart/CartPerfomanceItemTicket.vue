<template>
  <li>
    <div class="cart-perfomance__ticket-info">
      <p>{{ getSectionName(ticket.seatPrice.data.section_number) }}</p>
      <p v-if="ticket.seatPrice.data.row_number">
        {{ translation.row[documentLang] }}
        {{ ticket.seatPrice.data.row_number }}
        {{ translation.seat[documentLang] }}
        {{ ticket.seatPrice.data.seat_number }}</p>
      <p v-else>
        {{ translation.ticket[documentLang] }}
        {{ ticket.seatPrice.data.seat_number }}
      </p>
    </div>
    <p class="cart-perfomance__currency">{{ ticket.seatPrice.data.price }}</p>
    <div class="cart-perfomance__ticket-remove">
      <Cross
        @click="removeTicket(ticket.id)"
        v-if="!load"
      >
        <span class="visually-hidden">{{ translation.deleteTicket[documentLang] }}</span>
      </Cross>
      <Preloader class="preloader--inline" :size="16" v-else></Preloader>
    </div>
  </li>
</template>

<script>
  import Cross from "../Common/Cross/Cross"
  import Preloader from "../Common/Preloader/Preloader"

  export default {
    props: {
      ticket: {
        required: true,
        type: Object
      },
      performance: {
        required: true,
        type: Object
      }
    },
    components: {
      Cross,
      Preloader
    },
    data() {
      return {
        translation: {
          row: {
            ru: `Ряд`,
            en: `Row`,
            ua: `Ряд`
          },
          seat: {
            ru: `Место`,
            en: `Seat`,
            ua: `Місце`
          },
          ticket: {
            ru: `Билет`,
            en: `Ticket`,
            ua: `Квиток`
          },
          deleteTicket: {
            ru: `Удалить билет`,
            en: `Remove ticket`,
            ua: `Видалити квиток`
          },
          parter: {
            ru: `Партер`,
            en: `Parquet`,
            ua: `Партер`
          },
          balconyLeft: {
            ru: `Балкон левая сторона`,
            en: `Balcony left side`,
            ua: `Балкон ліва сторона`
          },
          balconyRight: {
            ru: `Балкон правая сторона`,
            en: `Balcony right side`,
            ua: `Балкон права сторона`
          },
          balcony1: {
            ru: `Балкон I-го яруса`,
            en: `Balcony I-tier`,
            ua: `Балкон I-го ярусу`
          },
          balcony2: {
            ru: `Балкон II-го яруса`,
            en: `Balcony II tier`,
            ua: `Балкон II-го ярусу`
          }
        },
        load: false
      }
    },
    computed: {
      documentLang() {
        return this.$store.getters.documentLang
      }
    },
    methods: {
      getSectionName(sectionNumber) {
        const sectNum = parseInt(sectionNumber);

        switch(this.performanceHallType) {
          case "small":
            switch(sectNum) {
              case 1:
                return this.translation.parter[this.documentLang]
                break;

              case 2:
                return this.translation.balconyLeft[this.documentLang]
                break;

              case 3:
                return this.translation.balconyRight[this.documentLang]
                break;
            }
            break;

          case "big":
            switch(sectNum) {
              case 1:
                return this.translation.parter[this.documentLang]
                break;

              case 2:
              case 3:
              case 4:
                return this.translation.balcony1[this.documentLang]
                break;

              case 5:
              case 6:
              case 7:
                return this.translation.balcony2[this.documentLang]
                break;
            }
            break;

          case "muzsalon":
            return this.translation.parter[this.documentLang]
            break;

          case "outdoor":
            return ``
            break;
        }
      },
      removeTicket(ticketId) {
        this.load = true;

        if (this.above) {
          this.$store.commit(`removeTicketsAboveFromCart`, {
            perfomanceId: this.performance.data.id,
            tickets: [ticketId]
          })
          .then(() => this.load = false)
          .catch(err => {
            console.warn(err);
            this.load = false;
          })
        } else {
          this.$store.dispatch(`removeTicketsFromCart`, {
            perfomanceId: this.performance.data.id,
            tickets: [ticketId]
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
