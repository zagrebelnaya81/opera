<template>
  <div
    :class="{'print__el--barcode': ticket.type == 'barcode'}"
  >
  <!-- <img v-if="ticketTemplatePoster" :src="ticketTemplatePoster" alt=""> -->
    <template
      v-if="ticket.type !== 'barcode'"
    >
    <div v-for="field in ticketTemplate" :key="field.id">
        <div
          :style="ticketStyle(field)"
        ><!--{{ field.text }}:--> {{outerText(field)}}</div>
    </div>
    </template>
    <template v-if="getStyleBarcode" >
        <div :style="ticketStyle(getStyleBarcode)">
            <Barcode :code="getBarcode" :size="{width: 1, height: 50}" ></Barcode>
        </div>
    </template>
  </div>
</template>

<script>
import Barcode from "../Barcode/Barcode";
import _ from "lodash";

export default {
  props: {
    ticket: {
      required: true,
      type: Object
    },
    ticketTemplate: {
        required: true,
        type: Array
    },
      ticketInfo:{
        required: true,
        type: Object
      },
      ticketTemplatePoster:{}
  },
  components: {
    Barcode
  },
  computed: {
    getDate() {
      const date = new Date(Date.parse(this.ticketInfo.hallInfo.date));

      return `${this.checkZero(date.getDate())}.${this.checkZero(
        date.getMonth() + 1
      )}.${date.getFullYear()}`;
    },
    getTime() {
      const date = new Date(Date.parse(this.ticketInfo.hallInfo.date));

      return `${this.checkZero(date.getHours())}:${this.checkZero(
        date.getMinutes()
      )}`;
    },
    getRow() {
      return this.ticket.seatPrice.data.row_number;
    },
    getSeat() {
      return this.ticket.seatPrice.data.seat_number;
    },
    getCost() {
      return this.ticket.seatPrice.data.price;
    },
    getName() {
      return this.ticketInfo.hallInfo.performance.data.title;
    },
    getHall() {
      return this.ticketInfo.hallInfo.hall.data.title;
    },
    getStyleBarcode(){
        let style = _.find(this.ticketTemplate, ["type", "barcode"]);
        if(style) return style;
        return null;
    },
    getBarcode() {
      return `${
        this.ticket.orderId
          ? this.ticket.orderId
          : this.ticketInfo.order.data.id
      }-${this.ticket.id}`;
    },
    getSector() {
      if (
        this.ticketInfo.hallInfo.hall.data.name == `big` &&
        this.ticketInfo.hallInfo.hall.data.name == `small`
      ) {
        return this.ticket.seatPrice.data.section_title;
      } else {
        return ``;
      }
    }
  },
  methods: {
    ticketStyle(field) {
        return {
            position: 'absolute',
            left: field.posX ? `${field.posX}px` : ``,
            top: field.posY ? `${field.posY}px` : ``,
            fontFamily: field.fontFamily,
            fontSize: `${field.fontSize}mm`,
            lineHeight: `${field.lineHeight}`,
            width: `${field.width}px`,
            height: `${field.height}px`,
            transform: `rotate(${field.angle}deg)`,
            fontWeight: field.fontWeight ? field.fontWeight : ``,
            textDecoration: field.textDecoration ? `underline` : ``
        }
    },
    checkZero(val) {
      if (val < 10) {
        return `0${val}`;
      } else if (val == 0) {
        return `00`;
      } else {
        return val;
      }
    },
      outerText(field) {
          if (field.type === "date"){
              return this.getDate
          }
          if (field.type === "time"){
              return this.getTime
          }
          if (field.type === "row"){
              return this.getRow
          }
          if (field.type === "seat"){
              return this.getSeat
          }
          if (field.type === "cost"){
              return this.getCost
          }
          if (field.type === "name"){
              return this.getName
          }
          if (field.type === "hall"){
              return this.getHall
          }
        // ???
        //   if (field.type === "barcode"){
        //       return this.getBarcode
        //   }
          if (field.type === "sector"){
              return this.getSector
          }
          if (field.type === "ticket-id"){
              return this.getBarcode
          }
      },
  }
};
</script>
