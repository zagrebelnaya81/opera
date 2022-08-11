<template>
  <div>
    <template v-if="loading">
      <Preloader></Preloader>
    </template>
    <template v-else>
      <KasirHeader>
        <router-link class="btn btn-secondary btn-sm mr-3" :to="{name: 'Poster'}" exact>До афiши</router-link>
      </KasirHeader>

      <div class="wrap-full booking">
        <h1 class="booking__title">Пошук за бронею</h1>
        <form class="booking__form booking__form--short" @submit.prevent="search">
          <div class="booking__search">
            <label for="search" class="booking__search-label">Пошук:</label>
            <input
              type="text"
              class="form-control booking__search-input"
              id="search"
              name="search"
              v-model.trim="searchValue"
              :disabled="searching"
            />
            <ButtonLoader
              type="submit"
              class="btn btn-secondary btn-sm booking__search-btn"
              :load="searching"
            >Шукати</ButtonLoader>
          </div>
          <!-- <div class="booking__search-type">
            <label class="form-check">
              <input
                type="radio"
                class="form-check-input"
                name="id"
                value="id"
                v-model="searchType"
              >
              <span class="form-check-label">За номером замовлення</span>
            </label>
            <label class="form-check">
              <input
                type="radio"
                class="form-check-input"
                name="name"
                value="name"
                v-model="searchType"
              >
             <span class="form-check-label">За ім'ям</span>
            </label>
            <label class="form-check">
              <input
                type="radio"
                class="form-check-input"
                name="phone"
                value="phone"
                v-model="searchType"
              >
              <span class="form-check-label">За номером телефону</span>
            </label>
          </div>-->
        </form>
        <div class="booking__result">
          <BookingTable v-if="searchResult.length"></BookingTable>
        </div>
      </div>
    </template>
    <Print v-if="printAccept" :tickets="printTickets"></Print>
  </div>
</template>

<script>
import Preloader from "../Common/Preloader/Preloader";
import KasirHeader from "../Common/KasirHeader/KasirHeader";
import ButtonLoader from "../Common/ButtonLoader/ButtonLoader";
import BookingTable from "./BookingTable";
import Print from "../Common/Print/Print";

export default {
  components: {
    Preloader,
    KasirHeader,
    ButtonLoader,
    BookingTable,
    Print
  },
  data() {
    return {
      searchValue: ``,
      searchType: `name`,
      searching: false
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    searchResult() {
      return this.$store.getters.getSearchResult;
    },
    printAccept() {
      return this.$store.getters.getPrintAccept;
    },
    printTickets() {
      return this.$store.getters.getOrderForPrint;
    }
  },
  methods: {
    search() {
      const payload = `param=${this.searchType}&query=${this.searchValue}&status=booked`;

      this.searching = true;

      this.$store
        .dispatch(`getSearchResult`, payload)
        .then(data => (this.searching = false))
        .catch(err => (this.searching = false));
    }
  }
};
</script>
