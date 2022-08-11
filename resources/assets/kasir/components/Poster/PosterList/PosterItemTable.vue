<template>
  <tr>
    <td class="poster-list__table-date">
      {{ event.time }}
    </td>
    <td class="poster-list__table-info" @click="$router.push(eventLink)">
      <span class="poster-list__table-title">{{ event.title }}</span>
      <span class="poster-list__table-hall">{{ event.hall }}</span>
    </td>
    <td class="poster-list__table-seat">
      <span>Всього місць:</span>
      {{ event.seats_count }}
    </td>
    <td class="poster-list__table-seat">
      <span>Вiльно:</span>
      {{ event.seats_available }}
    </td>
    <td class="poster-list__table-seat">
      <span>Бронь:</span>
      {{ event.seats_booked }}
    </td>
    <td class="poster-list__table-seat">
      <span>Продано:</span>
      {{ event.seats_sold }}
    </td>
    <td class="poster-list__table-btn">
      <button
        class="btn btn-secondary btn-sm"
        @click="priceToggle"
      >Наявність за цінами</button>

      <PosterPrice
        v-if="priceShow"
        @close="priceShow = false"
        :prices="event.priceZones"
      ></PosterPrice>
    </td>
    <td>
      <ButtonReload
        ref="buttonReload"
        @click="refreshEvent"
        :reload="eventReload"
      ></ButtonReload>
    </td>
  </tr>
</template>

<script>
  import ButtonReload from "../../Common/ButtonReload/ButtonReload"
  import PosterPrice from "../PosterPrice/PosterPrice"

  export default {
    props: {
      event: {
        type: [Object, Array],
        required: true
      }
    },
    components: {
      ButtonReload,
      PosterPrice
    },
    data() {
      return {
        eventReload: false,
        priceShow: false
      }
    },
    computed: {
      eventLink() {
        console.log(`${this.$route.path}/hall/${this.event.id}`);
        return `${this.$route.path}/hall/${this.event.id}`
      }
    },
    methods: {
      refreshEvent() {
        this.eventReload = true;
        this.$store.dispatch(`refreshEventById`, this.event.id)
          .then(data => this.eventReload = false)
      },
      priceToggle() {
        this.priceShow = !this.priceShow;
      }
    }
  }
</script>
