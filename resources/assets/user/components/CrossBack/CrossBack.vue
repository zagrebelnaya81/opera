<template>
  <button type="button" class="cross-back" @click="goToPrevPage">
    <span class="visually-hidden">{{ translation.back[documentLang] }}</span>
    <svg viewBox="0 0 224.512 224.512" width="24" height="24" fill="#111111">
      <path d="M224.507 6.997L217.521 0 112.256 105.258 6.998 0 .005 6.997l105.258 105.257L.005 217.512l6.993 7L112.256 119.24l105.265 105.272 6.986-7-105.258-105.258z"></path>
    </svg>
  </button>
</template>

<script>
  import translation from "../../mixins/translation"

  export default {
    mixins: [translation],
    props: {
      link: Object
    },
    methods: {
      goToPrevPage() {
        history.back()
      }
    }
  }
</script>
