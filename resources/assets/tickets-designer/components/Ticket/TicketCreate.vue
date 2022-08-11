<template>
    <div class="constructor">
      <ConstructorAside></ConstructorAside>
      <ConstructorResult></ConstructorResult>
    </div>
  </div>
</template>

<script>
  import ConstructorAside from "../ConstructorAside/ConstructorAside"
  import ConstructorResult from "../ConstructorResult/ConstructorResult"
  import Preloader from "../../../kasir/components/Common/Preloader/Preloader"

  export default {
    name: `ticket-create`,
    components: {
      Preloader,
      ConstructorAside,
      ConstructorResult
    },
    created() {
      this.$store.dispatch(`resetTicketData`);
    }
  }
</script>
