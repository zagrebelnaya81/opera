<template>
  <div class="popup" @click="popupClose">
    <div class="popup__inner">
      <div class="popup__wrap">
        <Cross
          class="popup__close"
          @click="$emit('popup-close')"
        >
          <span class="visually-hidden">Закрити вікно</span>
        </Cross>
        <slot></slot>
        <div v-for="(ticket, index) in notAvailableTickets" :key="`${index}-ticket`">
            <div>{{ticket.row}} - ряд  {{ticket.seat}} - место</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cross from "../Cross/Cross";

  export default {
    props: ['notAvailableTickets'],
    components: {
      Cross
    },
    methods: {
      popupClose(e) {
        if (!e.target.closest(`.popup__wrap`)) {
          this.$emit(`popup-close`);
        }
      }
    },
    data() {
      return {
        escFunc: (e) => {
          if (e.keyCode === 27) this.$emit(`popup-close`);
        }
      }
    },
    mounted() {
      document.addEventListener(`keyup`, this.escFunc);
    },
    beforeDestroy() {
      document.removeEventListener(`keyup`, this.escFunc);
    }
  }
</script>
