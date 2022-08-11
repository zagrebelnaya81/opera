<template>
  <tr>
    <td>{{ ticket.id }}</td>
    <td class="text-left">{{ ticket.title }}</td>
    <td>{{ ticket.width }}mm</td>
    <td>{{ ticket.height }}mm</td>
    <td class="tickets-list__table-bg" :style="bgImage"></td>
    <td>
      <label class="tickets-list__label">
        <input
          type="checkbox"
          :checked="usedCashBoxData"
          @change="useThisTicketCashBox"
          :disabled="disabledTicket"
        >Використовувати
      </label>
    </td>
    <td>
      <div class="tickets-list__table-btns">
        <ButtonLoader
          class="btn btn-secondary btn-sm"
          :load="deleteTicketLoad"
          @click="editTicket"
        >Редагувати</ButtonLoader>
        <ButtonLoader
          class="btn btn-secondary btn-sm"
          :load="deleteTicketLoad"
          @click="deleteTicket"
        >Видалити</ButtonLoader>
      </div>
    </td>
  </tr>
</template>

<script>
  import ButtonLoader from "../../../kasir/components/Common/ButtonLoader/ButtonLoader"

  export default {
    name: `ticekt-list-item`,
    props: {
      ticket: {
        type: Object,
        required: true
      }
    },
    components: {
      ButtonLoader
    },
    data() {
      return {
        deleteTicketLoad: false,
        disabledTicket: false,
        usedCashBoxData: false
      }
    },
    created() {
      this.usedCashBoxData = this.usedCashBox
    },
    computed: {
      usedCashBox() {
        return this.ticket.is_active_cash_box
      },
      // usedOnline() {
      //   if (this.ticket.is_active_online) return `Online`

      //   return false
      // },
      bgImage() {
        return {
          backgroundImage: `url(${this.ticket.poster})`
        }
      }
    },
    methods: {
      deleteTicket() {
        this.deleteTicketLoad = true;
        this.$store.dispatch(`deleteTicket`, this.ticket.id)
          .then(data => this.deleteTicketLoad = false)
          .catch(err => {
            console.warn(err);
            this.deleteTicketLoad = false;
          })
      },
      editTicket() {
        this.$router.push({name: `Ticket`, params: {id: this.ticket.id}})
      },
      useThisTicketCashBox(event) {
        this.disabledTicket = true;

        const val = event.target.checked ? 1 : 0,
              data = new FormData();

        this.$store.commit(`setActiveCashBox`, {ticket: this.ticket, payload: val});

        data.append(`title`, this.ticket.title);
        data.append(`json_code`, this.ticket.json_code);
        data.append(`width`, this.ticket.width);
        data.append(`height`, this.ticket.height);
        data.append(`is_active_cash_box`, val);
        data.append(`is_active_online`, 0);
        data.append("_method", "PUT");

        this.$store.dispatch(`updateTicket`, {id: this.ticket.id, data: data})
          .then(data => {
            this.disabledTicket = false;
            this.$emit(`refreshData`);
          })
          .catch(err => {
            console.warn(err);
            this.disabledTicket = false;
            this.$store.commit(`setActiveCashBox`, {ticket: this.ticket, payload: !val});
          })
      }
    },
    watch: {
      usedCashBox(val) {
        this.usedCashBoxData = val;
      }
    }
  }
</script>
