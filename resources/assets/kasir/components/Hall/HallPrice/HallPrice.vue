<template>
  <div class="hall-price">
    <ul class="hall-price__list" v-if="hallPriceLength">
      <HallPriceItem
        v-for="price in hallPrice"
        :key="price.color"
        :price="price"
      ></HallPriceItem>
    </ul>
  </div>
</template>

<script>
  import HallPriceItem from "./HallPriceItem"
  import _ from 'lodash'

  export default {
    props: {
      event: {
        type: Object,
        required: true
      }
    },
    components: {
      HallPriceItem
    },
    computed: {
      hallPrice() {
        const filterObj = {};

        for (const key in this.event.priceZones) {
          if (parseInt(this.event.priceZones[key].seats_count) != 0) {
            filterObj[key] = this.event.priceZones[key]
          }
        }

        return _.orderBy(filterObj, 'price')
      },
      hallPriceLength() {
        return Object.keys(this.hallPrice).length
      }
    }
  }
</script>
