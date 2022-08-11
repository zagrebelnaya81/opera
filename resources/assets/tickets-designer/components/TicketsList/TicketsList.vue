<template>
  <div class="tickets-list">
    <h2 class="tickets-list__title">
      <a
        href="/admin/dashboard"
        style="margin-right: 10px;"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#007bff" viewBox="0 0 460.298 460.297">
          <path d="M230.149,120.939L65.986,256.274c0,0.191-0.048,0.472-0.144,0.855c-0.094,0.38-0.144,0.656-0.144,0.852v137.041
            c0,4.948,1.809,9.236,5.426,12.847c3.616,3.613,7.898,5.431,12.847,5.431h109.63V303.664h73.097v109.64h109.629
            c4.948,0,9.236-1.814,12.847-5.435c3.617-3.607,5.432-7.898,5.432-12.847V257.981c0-0.76-0.104-1.334-0.288-1.707L230.149,120.939
            z"/>
          <path d="M457.122,225.438L394.6,173.476V56.989c0-2.663-0.856-4.853-2.574-6.567c-1.704-1.712-3.894-2.568-6.563-2.568h-54.816
            c-2.666,0-4.855,0.856-6.57,2.568c-1.711,1.714-2.566,3.905-2.566,6.567v55.673l-69.662-58.245
            c-6.084-4.949-13.318-7.423-21.694-7.423c-8.375,0-15.608,2.474-21.698,7.423L3.172,225.438c-1.903,1.52-2.946,3.566-3.14,6.136
            c-0.193,2.568,0.472,4.811,1.997,6.713l17.701,21.128c1.525,1.712,3.521,2.759,5.996,3.142c2.285,0.192,4.57-0.476,6.855-1.998
            L230.149,95.817l197.57,164.741c1.526,1.328,3.521,1.991,5.996,1.991h0.858c2.471-0.376,4.463-1.43,5.996-3.138l17.703-21.125
            c1.522-1.906,2.189-4.145,1.991-6.716C460.068,229.007,459.021,226.961,457.122,225.438z"/>
        </svg>
      </a>
      Шаблони квитків
      <router-link
        :to="{name: 'CreateTicket'}"
        class="btn btn-secondary tickets-list__btn"
      >Створити новий шаблон</router-link>
    </h2>
    <template v-if="ticketsLoad">
      <Preloader :inline="true"></Preloader>
    </template>
    <div class="tickets-list-content" v-else>
      <p class="tickets-list__empty" v-if="!ticketsList.length">Немає шаблонів квитків</p>
      <table class="table table-hover table-bordered tickets-list__table" v-else>
        <thead>
          <tr>
            <th class="tickets-list__table-id">ID</th>
            <th class="tickets-list__table-name">Назва</th>
            <th class="tickets-list__table-width">Ширина</th>
            <th class="tickets-list__table-height">Висота</th>
            <th class="tickets-list__table-bg">Фон</th>
            <th class="tickets-list__table-use">Використовувати в касi</th>
            <th class="tickets-list__table-action">Дія</th>
          </tr>
        </thead>
        <tbody>
          <TicketListItem
            v-for="ticket in ticketsList"
            :key="ticket.id"
            :ticket="ticket"
            @refreshData="refreshData"
          ></TicketListItem>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Preloader from "../../../kasir/components/Common/Preloader/Preloader"
  import TicketListItem from "./TicketsListItem"

  export default {
    name: `ticket-list`,
    components: {
      Preloader,
      TicketListItem
    },
    created() {
      this.refreshData();
    },
    data() {
      return {
        ticketsLoad: false
      }
    },
    computed: {
      ticketsList() {
        console.log(this.$store.getters.ticketsList)
        return this.$store.getters.ticketsList
      }
    },
    methods: {
      refreshData() {
        this.ticketsLoad = true;

        this.$store.dispatch(`getTicketsList`)
          .then(data => this.ticketsLoad = false)
          .catch(err => {
            console.warn(err);
            this.ticketsLoad = false;
          })
      }
    }
  }
</script>
