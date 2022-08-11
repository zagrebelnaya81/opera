<template>
  <div class="preloader">
    <Spinner :size="size"></Spinner>
  </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'

  export default {
    components: {
      Spinner
    },
    props: {
      size: {
        required: false,
        type: Number,
        default: 100
      }
    }
  }
</script>
