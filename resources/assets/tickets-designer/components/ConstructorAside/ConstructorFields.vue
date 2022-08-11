<template>
  <div class="constructor-fields">
    <p class="mb-2 d-flex justify-content-between align-items-center">
      Поля для відображення:
      <button
        type="button"
        class="btn btn-sm btn-secondary"
        @click="addField"
      >Додати поле</button>
    </p>
    <div class="constructor-fields__wrap mb-2">
      <ConstructorFieldsList
        class="mb-3"
        v-if="ticketFieldsLength"
      ></ConstructorFieldsList>
    </div>
    <div class="d-flex justify-content-between">
      <ButtonLoader
        class="btn btn-secondary"
        @click="saveTicket"
        :load="saveTicketLoad"
      >Зберегти</ButtonLoader>
      <ButtonLoader
        class="btn btn-secondary"
        @click="resetTicket"
        :load="saveTicketLoad"
      >Відмінити</ButtonLoader>
    </div>
  </div>
</template>

<script>
import ConstructorFieldsList from "./ConstructorFieldsList"
import ButtonLoader from "../../../kasir/components/Common/ButtonLoader/ButtonLoader"

export default {
  name: `constructor-fields`,
  components: {
    ConstructorFieldsList,
    ButtonLoader
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      if (this.ticketFieldsLength) {
        this.id = this.ticketFields[this.ticketFieldsLength - 1].id + 1;
      }

      this.edit = true;
    }
  },
  data() {
    return {
      id: 0,
      saveTicketLoad: false,
      edit: false
    }
  },
  computed: {
    ticketFields() {
      return this.$store.getters.getTicketFields
    },
    ticketFieldsLength() {
      return this.ticketFields.length
    }
  },
  methods: {
    saveTicket() {
      this.saveTicketLoad = true;

      const data = new FormData(document.forms.ticket);

      data.append(`title`, this.$store.getters.getName);
      data.append(`json_code`, JSON.stringify(this.$store.getters.getTicketFields));
      data.append(`width`, this.$store.getters.getWidth);
      data.append(`height`, this.$store.getters.getHeight);
      data.append(`is_active_cash_box`, this.$store.getters.getActiveCashBox ? 1 : 0);
      data.append(`is_active_online`, 0);

      if (this.edit) {
        data.append("_method", "PUT");

        this.$store.dispatch(`updateTicket`, {id: this.$route.params.id, data: data})
        .then(data => this.saveTicketLoad = false)
        .catch(err => {
          console.warn(err);
          this.saveTicketLoad = false;
        })
      } else {
        this.$store.dispatch(`saveTicket`, data)
        .then(data => {
          this.saveTicketLoad = false;
          this.$router.push({name: `TicketsList`})
        })
        .catch(err => {
          console.warn(err);
          this.saveTicketLoad = false;
        })
      }
    },
    resetTicket() {
      this.$store.commit(`resetTicket`);
    },
    addField() {
      const ticket = {
        text: ``,
        type: `name`,
        id: this.id,
        posX: 20,
        posY: 20,
        angle: 0,
        fontFamily: `Times New Roman`,
        fontSize: `5`,
        width: 100,
        height: 30,
      };

      this.$store.commit(`addTicketField`, ticket);
      this.id++;
    }
  }
}
</script>
