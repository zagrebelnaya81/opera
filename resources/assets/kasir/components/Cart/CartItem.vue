<template>
  <tr>
    <template v-if="!hallOutdoor">
      <!-- <td>{{ ticket.sectionName }}</td> -->
      <td>{{ ticket.row }}</td>
      <td>{{ ticket.seat }}</td>
    </template>
    <td v-else colspan="2">{{ num + 1 }}</td>
    <td class="cart__table-price">{{ ticket.price }}</td>
    <td>
      <Cross v-if="!load" width="12" height="12" fill="red" @click="removeTicket(ticket)"></Cross>
      <Preloader :size="12" class="preloader--inline preloader--small" v-else></Preloader>
    </td>
  </tr>
</template>

<script>
import Cross from "../Common/Cross/Cross";
import Preloader from "../Common/Preloader/Preloader";

export default {
  props: {
    ticket: {
      required: true,
      type: Object
    },
    num: {
      required: false,
      type: Number
    }
  },
  data() {
    return {
      load: false
    };
  },
  components: {
    Cross,
    Preloader
  },
  computed: {
    hallOutdoor() {
      return this.$store.getters.getHallInfo.hall.data.name == `outdoor`;
    }
  },
  methods: {
    removeTicket(ticket) {
        this.load = true;

        this.$store.dispatch(`removeTicketFromCart`, [ticket]).then(() => (this.load = false)).catch(err => {
        console.warn(err);
          });
    }
  }
};
</script>
