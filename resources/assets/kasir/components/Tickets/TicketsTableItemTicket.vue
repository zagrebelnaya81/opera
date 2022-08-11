<template>
  <tr>
    <td v-if="index == 0" :rowspan="rowSpan" class="booking__table-order">{{ order.id }}</td>
    <td v-if="index == 0" :rowspan="rowSpan" class="booking__table-fullname">{{ order.name }}</td>
    <td v-if="index == 0" :rowspan="rowSpan" class="booking__table-fullname">{{ order.seller }}</td>
    <td v-if="index == 0" :rowspan="rowSpan" class="booking__table-event">{{ eventName }}</td>
    <td v-if="index == 0" :rowspan="rowSpan" class="booking__table-date">
      <div class="booking__table-date-inner">{{ getDate }} {{ getYear }} | {{ getHours | addZero }}:{{ getMinutes | addZero }}</div>
    </td>
    <td v-if="index == 0" :rowspan="rowSpan" class="booking__table-cash">{{ orderPaymentType }}</td>
    <td class="booking__table-sector">{{ ticket.seatPrice.data.section_title }}</td>
    <td class="booking__table-row">{{ ticket.seatPrice.data.row_number }}</td>
    <td class="booking__table-place">{{ ticket.seatPrice.data.seat_number }}</td>
    <td class="booking__table-price">{{ ticket.seatPrice.data.price }}</td>
    <td class="booking__table-action">
      <div class="booking__table-action-inner">
        <button
          class="btn btn-secondary btn-sm"
          :load="globalProcessing"
          @click="printTicket"
        >Надрукувати</button>
        <ButtonLoader
          class="btn btn-secondary btn-sm"
          :load="globalProcessing"
          @click="removePopupOpen"
        >Повернути</ButtonLoader>
      </div>
      <Popup
        class="popup"
        v-if="removeTicketPopup"
        @popup-close="removeTicketPopup = false"
      >
        <section class="confirm-remove-tickets">
          <h2 class="confirm-remove-tickets__title">
            Ви впевненi, що бажаєте повернути квиток?
          </h2>
          <p class="confirm-remove-tickets__performance">
            {{ eventName }}
          </p>
          <p class="confirm-remove-tickets__date">
            {{ getDate }} {{ getYear }} | {{ getHours | addZero }}:{{ getMinutes | addZero }}
          </p>
          <div class="confirm-remove-tickets__seat">
            <p>
              <span class="confirm-remove-tickets__seat-name">Сектор:</span>
              <span class="confirm-remove-tickets__seat-value">{{ ticket.seatPrice.data.section_title }}</span>
            </p>
            <p>
              <span class="confirm-remove-tickets__seat-name">Ряд:</span>
              <span class="confirm-remove-tickets__seat-value">{{ ticket.seatPrice.data.row_number }}</span>
            </p>
            <p>
              <span class="confirm-remove-tickets__seat-name">Мiсце:</span>
              <span class="confirm-remove-tickets__seat-value">{{ ticket.seatPrice.data.seat_number }}</span>
            </p>
            <p>
              <span class="confirm-remove-tickets__seat-name">Цiна:</span>
              <span class="confirm-remove-tickets__seat-value">{{ ticket.seatPrice.data.price }} грн.</span>
            </p>
          </div>

          <ButtonLoader
            class="btn btn-block btn-secondary btn-sm"
            :load="globalProcessing"
            @click="removeOneTicketFromPayment"
            ref="removeBtn"
          >
            Повернути
          </ButtonLoader>
        </section>
      </Popup>
    </td>
  </tr>
</template>

<script>
  import ButtonLoader from "../Common/ButtonLoader/ButtonLoader"
  import dateFormat from "../../mixins/date-format"
  import Popup from "../Common/Popup/Popup"

  export default {
    mixins: [dateFormat],
    props: {
      ticket: {
        required: true,
        type: Object
      },
      globalProcessing: {
        default: false
      },
      order: {
        required: true,
        type: Object
      },
      index: {
        required: true,
        type: Number
      }
    },
    components: {
      ButtonLoader,
      Popup
    },
    data() {
      return {
        removeTicketPopup: false
      }
    },
    computed: {
      orderHash() {
        return `/ticket-download/${this.order.hash}`
      },
      tickets() {
        return this.order.tickets.data
      },
      ticketsLength() {
        return this.tickets.length
      },
      rowSpan() {
        return this.ticketsLength > 1 ? this.ticketsLength : false
      },
      eventName() {
        return this.tickets[0].performanceCalendar.data.performance.data.title
      },
      orderPaymentType() {
        return this.order.payment_type ? `безготiвковий` : `готiвковий`
      },
      eventDate() {
        return this.tickets[0].performanceCalendar.data.date
      }
    },
    methods: {
      removeOneTicketFromPayment(id) {
        this.$emit(`removeTicket`, true);

        if (this.order.tickets.data.length > 1) {
          this.$store.dispatch(`removeOneTicketFromBooking`, {
            orderId: this.order.id,
            ticketId: this.ticket.id,
            arrName: `soldTickets`
          })
            .catch(err => {
              console.warn(err);
              this.$emit(`removeTicket`, false);
            });
        } else {
          this.$store.dispatch(`returnAllPaymentTickets`, this.order.id)
            .catch(err => {
              console.warn(`Not delete`);
              this.$emit(`removeTicket`, false);
            });
        }
      },
      printTicket() {
        const printTickets = {
                hallInfo: JSON.parse(JSON.stringify(this.ticket.performanceCalendar.data)),
                order: {
                  data: {
                    id: this.order.id,
                    tickets: {
                      data: [JSON.parse(JSON.stringify(this.ticket))]
                    }
                  }
                }
              };

        this.$store.commit(`setOrderForPrint`, printTickets);
      },
      removePopupOpen() {
        this.removeTicketPopup = true;
        this.$nextTick(() => this.$refs.removeBtn.$el.focus());
      }
    }
  }
</script>
