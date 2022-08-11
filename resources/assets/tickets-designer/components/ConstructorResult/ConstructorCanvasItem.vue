<template>
  <VueDragResize
    class="constructor-canvas-item"
    :style="ticketStyle"
    :isActive="activateComp"
    :x="posX"
    :y="posY"
    @resizing="resize"
    @dragging="resize"
    :minw="1"
    :minh="1"
    :w="width"
    :h="height"
    ref="item"
  >{{ field.text }}</VueDragResize>
</template>

<script>
  import VueDragResize from "vue-drag-resize"

  export default {
    name: `constructor-canvas-item`,
    props: {
      field: {
        required: true,
        type: Object
      }
    },
    components: {
      VueDragResize
    },
    data() {
      return {
        activate: false,
        timerId: null
      }
    },
    mounted() {
      this.$refs.item.$el.addEventListener(`mouseenter`, (e) => {
        this.mouseEnter();
      })
      this.$refs.item.$el.addEventListener(`mouseleave`, (e) => {
        this.mouseLeave();
      })
    },
    computed: {
      posX() {
        return this.field.posX
      },
      posY() {
        return this.field.posY
      },
      width() {
        return this.field.width
      },
      height() {
        return this.field.height
      },
      ticketStyle() {
        return {
          fontFamily: this.field.fontFamily,
          fontSize: `${this.field.fontSize}mm`,
          lineHeight: `${this.field.lineHeight}`,
          transform: `rotate(${this.field.angle}deg)`,
          fontWeight: this.field.fontWeight ? 700 : ``,
          textDecoration: this.field.textDecoration ? `underline` : ``,
          backgroundColor: this.currentFieldIsActive ? `rgba(0, 0, 0, 0.2)` : ``,
          backgroundColor: this.activate ? `rgba(0, 0, 0, 0.2)` : ``
        }
      },
      activeId() {
        return this.$store.getters.getActiveId
      },
      currentFieldIsActive() {
        return this.activeId == this.field.id ? true : false;
      },
      activateComp() {
        return this.activate || (this.$store.getters.activeId && this.$store.getters.activeId == this.field.id) ? true : false;
      }
    },
    methods: {
      resize(newRect) {
        this.$store.commit(`ticketFieldResize`, {
          field: this.field,
          posX: newRect.left,
          posY: newRect.top,
          width: newRect.width,
          height: newRect.height
        })
      },
      mouseEnter() {
        clearTimeout(this.timerId);
        this.activate = true;
        this.$store.dispatch(`fieldActivated`, this.field);
      },
      mouseLeave() {
        this.$store.dispatch(`fieldDisabled`);

        this.timerId = setTimeout(() => {
          this.activate = false;
        }, 300)
      }
    }
  }
</script>
