<template>
  <div class="print">
    <PrintTicket
      v-for="ticket in ticketsList"
      :key="ticket.id"
      :ticket="ticket"
      :ticketInfo="tickets"
      :ticketTemplate="ticketTemplate"
      :ticketTemplatePoster="ticketTemplatePoster"
      :style="sizeTicketStyle"
    ></PrintTicket>
  </div>
</template>

<script>
import PrintTicket from "./PrintTicket";

export default {
  props: {
    tickets: {
      required: true,
      type: Object
    }
  },
  components: {
    PrintTicket
  },
  async created() {
    await this.$store
        .dispatch(`getTicketTemplate`)
        .catch(err => console.warn(err));
    this.globalTicketTemplate = this.$store.getters.getTicketTemplate;
    this.ticketTemplate = JSON.parse(this.globalTicketTemplate.json_code);
    this.ticketTemplatePoster = this.globalTicketTemplate.poster;
    this.print();
  },
  data() {
      return {
          ticketTemplate: [],
          ticketTemplatePoster: '',
          globalTicketTemplate:{}
      }
  },
  computed: {
    ticketsList() {
      return this.tickets.order.data.tickets.data;
    },
      sizeTicketStyle(){
        return {
          // display: `inline-block`,
          display: `block`,
          width: `${this.globalTicketTemplate.width}mm`,
          height: `${this.globalTicketTemplate.height}mm`,
          position: `relative`,
          pageBreakAfter: `always`
          // borderBottom: `solid 1px`
        }
      }
  },
  methods: {
    print() {
      setTimeout(() => {
        this.$store.commit(`setOrderForPrint`);
        window.print();
      }, 500);
    }
  }
};
</script>
