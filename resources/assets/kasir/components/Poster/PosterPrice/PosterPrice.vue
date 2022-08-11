<template>
  <div class="poster-price">
    <table class="poster-price__table">
      <thead>
        <tr>
          <th>Пояс</th>
          <th>Цiна</th>
          <th>Доступно</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(price, key) in filterPrices" :key="key">
          <td
            class="poster-price__color"
            :style="{'background-color': price.color}"
          ></td>
          <td>{{ price.price }}</td>
          <td>{{ price.seats_count }}</td>
        </tr>
      </tbody>
    </table>
    <button
      type="button"
      class="btn btn-secondary btn-sm btn-block"
      @click="$emit(`close`)"
    >Закрити</button>
  </div>
</template>

<script>
  export default {
    props: {
      prices: {
        type: [Array, Object],
        required: true
      }
    },
    computed: {
      filterPrices() {
        const obj = {};

        for (const key in this.prices) {
          if (parseInt(this.prices[key].seats_count) != 0) {
            obj[key] = this.prices[key]
          }
        }

        return obj
      }
    }
  }
</script>
