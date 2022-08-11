<template>
  <div class="preloader" :class="{'preloader--inline': inline}">
    <Spinner :size="size"></Spinner>
  </div>
</template>

<script>
  import Spinner from 'vue-simple-spinner'

  export default {
    props: {
      size: {
        type: Number,
        default: 100
      },
      inline: {
        type: Boolean
      }
    },
    components: {
      Spinner
    }
  }
</script>
