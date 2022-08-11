<template>
  <li
    class="constructor-field"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    :class="active"
    ref="field"
  >

    <CrossButton
      class="constructor-field__remove"
      @click="removeField"
      title="Видалити квиток"
    ></CrossButton>
    <div class="form-row align-items-end">
      <label class="form-group mb-0 col-4">
        <span>I'мя</span>
        <select
          class="form-control form-control-sm"
          v-model="type"
          ref="type"
        >
          <option value="name">Назва подiї</option>
          <option value="date">Дата початку</option>
          <option value="time">Час початку</option>
          <option value="hall">Зала</option>
          <option value="sector">Сектор</option>
          <option value="row">Ряд</option>
          <option value="seat">Місце</option>
          <option value="cost">Вартість</option>
          <option value="barcode">Штрих-код</option>
          <option value="owner">Ім'я</option>
          <option value="ticket-id">№ квитка</option>
        </select>
      </label>
      <label class="form-group mb-0 col-2">
        <span>Розмір</span>
        <input
          type="number"
          step="0.1"
          class="form-control form-control-sm"
          v-model.number="fontSize"
        >
      </label>
      <label class="form-group col-2 mb-0">
        <span>X</span>
        <input
          type="number"
          class="form-control form-control-sm"
          v-model.number="posX"
        >
      </label>
      <label class="form-group col-2 mb-0">
        <span>Y</span>
        <input
          type="number"
          class="form-control form-control-sm"
          v-model.number="posY"
        >
      </label>
      <label class="form-group col-2 mb-0">
        <span>Кут</span>
        <input
          type="number"
          class="form-control form-control-sm"
          v-model.number="angle"
        >
      </label>
    </div>
  </li>
</template>

<script>
  import CrossButton from "../common/CrossButton"

  export default {
    name: `constructor-field`,
    components: {
      CrossButton
    },
    props: {
      field: {
        type: Object,
        required: true
      }
    },
    computed: {
      posX: {
        get() {
          return this.field.posX
        },
        set(value) {
          this.changeField(`posX`, value);
        }
      },
      posY: {
        get() {
          return this.field.posY
        },
        set(value) {
          this.changeField(`posY`, value);
        }
      },
      angle: {
        get() {
          return this.field.angle
        },
        set(value) {
          this.changeField(`angle`, value);
        }
      },
      type: {
        get() {
          return this.field.type
        },
        set(value) {
          this.changeField(`type`, value);
        }
      },
      fontSize: {
        get() {
          return this.field.fontSize
        },
        set(value) {
          this.changeField(`fontSize`, value);
        }
      },
      active() {
        return this.$store.getters.activeField && this.$store.getters.activeField.id == this.field.id ? `active` : ``;
      }
    },
    methods: {
      removeField() {
        this.$store.commit(`removeTicketField`, this.field.id)
      },
      changeField(type, value) {
        this.$store.commit(`changeTicketField`, {
          field: this.field,
          type,
          value
        })
      },
      mouseEnter() {
        this.$store.commit(`pushActiveId`, this.field.id);
      },
      mouseLeave() {
        this.$store.commit(`deleteActiveId`);
      }
    },
    watch: {
      "field.type": {
        handler(val) {
          this.$nextTick(() => {
            const select = this.$refs.type;

            if (select) this.changeField(`text`, select[select.selectedIndex].textContent);
          });
        },
        immediate: true
      },
      active(val) {
        if (!val) return false;

        this.$refs.field.scrollIntoView(true);
      }
    }
  }
</script>
