<template>
  <div>
    <KasirHeader></KasirHeader>
    <div class="wrap-full">
      <div class="poster">
        <div class="poster__aside">
          <PosterAside @loadDates="loadDates"></PosterAside>
        </div>
        <div class="poster__data">
          <template v-if="loading">
            <Preloader :inline="true"></Preloader>
          </template>
          <PosterList v-else></PosterList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Preloader from "../Common/Preloader/Preloader"
  import KasirHeader from "../Common/KasirHeader/KasirHeader"
  import PosterList from "./PosterList/PosterList"
  import PosterAside from "./PosterAside/PosterAside"

  export default {
    components: {
      Preloader,
      KasirHeader,
      PosterList,
      PosterAside
    },
    created() {
      this.loading = true;
      this.$store.commit(`clearEvents`);
      this.$store.dispatch(`getEventsDates`)
        .then(() => this.loading = false)
        .catch(err => {
          console.warn(err);
          this.loading = false;
        })
    },
    data() {
      return {
        loading: false
      }
    },
    methods: {
      loadDates(event) {
        this.loading = event;
      }
    }
  }
</script>
