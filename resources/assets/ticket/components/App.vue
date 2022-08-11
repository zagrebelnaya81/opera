<template>
  <div>
    <LineToIndex></LineToIndex>
    <div class="wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import LineToIndex from "./Common/LineToIndex/LineToIndex"

  export default {
    created() {
      this.deviceType();

      window.addEventListener(`resize`, () => this.deviceType())
    },
    components: {
      LineToIndex
    },
    methods: {
      deviceType() {
        this.$store.commit(`setMobile`, window.innerWidth < 768)
      }
    }
  }
</script>
