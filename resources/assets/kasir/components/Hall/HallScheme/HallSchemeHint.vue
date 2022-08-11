<template>
  <section class="scheme-seat-hint" :style="position" :class="positionClass" ref="hint">
    <p v-if="config.seller && !isVipBooked">
      <b>Касир:</b>
      {{ config.seller }},
    </p>
    <p v-if="config.bookedFor">
      <b>Бронь:</b>
      {{ config.bookedFor }},
    </p>
    <p>{{ config.sectionName }},</p>
    <p>
      <b>Ряд:</b>
      {{ config.row }},
      <b>Місце:</b>
      {{ config.seat }},
    </p>
    <p>
      <b>Ціна:</b>
      {{ config.price }} грн.
    </p>
    <p v-if="config.ticketsAmount && config.ticketsAmount === 1">
      <b>Ціна замовлення:</b>
      {{ config.orderPrice }}
    </p>
    <p v-if="config.ticketsAmount && config.ticketsAmount === 1">
      <b>Всього:</b>
      {{config.ticketsAmount}}
    </p>
  </section>
</template>

<script>
export default {
  props: {
    config: {
      type: Object
    },
    scheme: {
      type: null
    }
  },
  data() {
    return {
      position: {},
      positionClass: {
        "scheme-seat-hint--left": false,
        "scheme-seat-hint--right": false,
        "scheme-seat-hint--top": false,
        "scheme-seat-hint--bottom": false
      }
    };
  },
  computed: {
    isVipBooked() {
      return this.config.status == "vip_booked";
    }
  },
  mounted() {
    const hintHeight = parseInt(getComputedStyle(this.$refs.hint).height),
      hintWidth = parseInt(getComputedStyle(this.$refs.hint).width),
      { left, top, bottom, right, width, height } = this.config.coordinates,
      schemeWidth = parseInt(getComputedStyle(this.scheme).width),
      schemeHeight = parseInt(getComputedStyle(this.scheme).height);

    let hintLeft = null,
      hintTop = null;

    if (left < hintWidth) {
      hintLeft = left + width / 2 - 13;
      this.positionClass[`scheme-seat-hint--left`] = true;
      this.positionClass[`scheme-seat-hint--right`] = false;
    } else {
      hintLeft = left + width / 2 - hintWidth + 13;
      this.positionClass[`scheme-seat-hint--left`] = false;
      this.positionClass[`scheme-seat-hint--right`] = true;
    }

    if (top - hintHeight - 14 < 0) {
      hintTop = top + height + 14;
      this.positionClass[`scheme-seat-hint--top`] = true;
      this.positionClass[`scheme-seat-hint--bottom`] = false;
    } else {
      hintTop = top - 14 - hintHeight;
      this.positionClass[`scheme-seat-hint--top`] = false;
      this.positionClass[`scheme-seat-hint--bottom`] = true;
    }
    if (this.config.orderPrice != null) {
      hintLeft = left;
      hintTop -= 30;
    }
    this.position = {
      left: `${hintLeft}px`,
      top: `${hintTop}px`,
      "flex-direction": this.config.orderPrice != null ? "column" : "row"
    };
  }
};
</script>
