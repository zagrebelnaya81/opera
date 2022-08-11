<template>
  <li>
    <button
      type="button"
      class="poster-list__header"
      @click="getEvents"
      :disabled="loading"
    >
      <span class="poster-list__date">{{ getDate }}</span>
      <span class="poster-list__day">{{ getWeekday }}</span>
      <template v-if="ifCurrentDate">
        <span class="poster-list__date-current">Сьогоднi</span>
      </template>
      <span
        v-if="!loading"
        class="poster-list__btn"
      >
        <ArrowDown></ArrowDown>
      </span>
      <Spinner
        class="poster-list__spinner"
        :size="20"
        v-else
      ></Spinner>
    </button>
    <table
      class="poster-list__table"
      v-if="eventsTableOpen">
      <tbody>
        <PosterItemTable
          v-for="(event, index) in events"
          :key="index"
          :event="event"
        ></PosterItemTable>
      </tbody>
    </table>
  </li>
</template>

<script>
  import ArrowDown from "../../Common/ArrowDown/ArrowDown"
  import PosterItemTable from "./PosterItemTable"
  import Spinner from 'vue-simple-spinner'
  // import ButtonLoader from "../../Common/ButtonLoader/ButtonLoader"

  export default {
    props: {
      eventDate: {
        required: true,
        type: String
      }
    },
    components: {
      ArrowDown,
      PosterItemTable,
      Spinner
      // ButtonLoader
    },
    data() {
      return {
        documentLang: `uk`,
        eventsTableOpen: false,
        loading: false
      }
    },
    computed: {
      events() {
        const filteredItem = this.$store.getters.events.find(item => item.date == this.eventDate);

        if (filteredItem) {
          return filteredItem.data;
        } else {
          this.eventsTableOpen = false;
          return null
        }
      },
      ifCurrentDate() {
        return Date.parse(this.eventDate.split(" ")[0]) == new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
      },
      getWeekday() {
        const formatter = new Intl.DateTimeFormat(this.documentLang, {
          weekday: `long`
        });

        return formatter.format(new Date(this.eventDate)).charAt(0).toUpperCase() + formatter.format(new Date(this.eventDate)).slice(1);
      },
      getDate() {
        const formatter = new Intl.DateTimeFormat(this.documentLang, {
          month: `long`,
          day: `numeric`
        });

        return formatter.format(new Date(this.eventDate));
      }
    },
    methods: {
      getEvents() {
        if (!this.eventsTableOpen) {
          const hasData = this.$store.getters.events.find(item => item.date == this.eventDate);

          if (!hasData) {
            this.loading = true;
            this.$store.dispatch(`getEventByDate`, this.eventDate)
              .then(data => {
                this.eventsTableOpen = true;
                this.loading = false;
              })
              .catch(err => {
                console.warn(err);
                this.loading = false;
              })
            } else {
              this.eventsTableOpen = true;
            }
        } else {
          this.eventsTableOpen = false;
        }
      }
    }
  }
</script>
