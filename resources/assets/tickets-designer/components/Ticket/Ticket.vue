<template>
    <div class="constructor">
      <template v-if="ticketLoad">
        <Preloader></Preloader>
      </template>
      <template v-else>
        <ConstructorAside></ConstructorAside>
        <ConstructorResult></ConstructorResult>
      </template>
    </div>
  </div>
</template>

<script>
  import ConstructorAside from "../ConstructorAside/ConstructorAside"
  import ConstructorResult from "../ConstructorResult/ConstructorResult"
  import Preloader from "../../../kasir/components/Common/Preloader/Preloader"

  export default {
    name: `ticket`,
    components: {
      Preloader,
      ConstructorAside,
      ConstructorResult
    },
    created() {
      let id = this.$route.params.id;

      this.ticketLoad = true;

      this.$store.dispatch(`getTicketTemplate`, id)
        .then(data => this.ticketLoad = false)
        .catch(err => {
          console.warn(err);
          this.ticketLoad = false;
        })
    },
    data() {
      return {
        ticketLoad: false
      }
    }
  }
</script>
