<template>
  <div class="poster-aside">
    <button
      type="button"
      class="btn btn-secondary btn-block btn-sm"
      @click="posterRefresh"
    >Оновити афiшу</button>
    <router-link
      :to="{name: 'Booking'}"
      class="btn btn-secondary btn-block btn-sm"
    >Бронi</router-link>
    <router-link
      :to="{name: 'Tickets'}"
      class="btn btn-secondary btn-block btn-sm"
    >Квитки</router-link>
    <div>
      <datepicker
        :language="datepicker.language"
        :inline="true"
        :full-month-name="true"
        :monday-first="true"
        v-model="datepicker.activeDate"
        @selected="changeDate"
        :highlighted="datepicker.highlighted"
        :calendar-class="'poster-aside__calendar'"
      ></datepicker>
    </div>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import {uk} from 'vuejs-datepicker/dist/locale'

  export default {
    components: {
      Datepicker
    },
    data() {
      return {
        datepicker: {
          language: uk,
          activeDate: new Date(),
          // disabledDates: {
          //   to: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
          // },
          highlighted: {
            dates: [
              new Date()
            ]
          }
        }
      }
    },
    methods: {
      posterRefresh() {
        this.$store.dispatch(`getEventsDates`)
          .then(data => this.$store.commit(`clearEvents`));
      },
      changeDate(data) {
        let year = data.getFullYear(),
            month = data.getMonth() + 1,
            date = data.getDate();

        this.$emit(`loadDates`, true);
        this.$store.dispatch(`getEventsDates`, `${year}-${month}-${date}`)
          .then(() => this.$emit(`loadDates`, false))
          .catch(err => {
            console.warn(err);
            this.$emit(`loadDates`, false)
          })
      }
    }
  }
</script>
