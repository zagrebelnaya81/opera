<template>
  <li>
    <div
      class="hall-price__color"
      :style="{backgroundColor: price.color}"
    >{{ price.price }}</div>
  </li>
</template>

<script>
  export default {
    props: {
      price: {
        required: true,
        type: Object
      }
    }
  }
</script>
