<template>
  <div class="hall-seats">
    <div class="d-block">
      <div class="text-center">
        <a @click="up()"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 0l8 9h-6v15h-4v-15h-6z"/></svg></a>
      </div>
      <div class="d-flex center-arrows">
        <a @click="left()"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M0 12l9-8v6h15v4h-15v6z"/></svg></a>
        <a @click="right()"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M24 12l-9-8v6h-15v4h15v6z"/></svg></a>
      </div>
      <div class="text-center">
        <a @click="down()"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 24l-8-9h6v-15h4v15h6z"/></svg></a>
      </div>
    </div>
    <p>Всього:
      <span>{{ count }}</span>
    </p>
    <p>Бронь:
      <span style="color: blue;">{{ booked }}</span>
    </p>
    <p>Продано:
      <span style="color: red;">{{ sold }}</span>
    </p>
    <p>Вiльно:
      <span style="color: green;">{{ available }}</span>
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      event: {
        type: Object,
        required: true
      }
    },
    computed: {
      available() {
        return this.event.seats_available
      },
      booked() {
        return this.event.seats_booked
      },
      count() {
        return this.event.seats_count
      },
      sold() {
        return this.event.seats_sold
      }
    },
    methods: {
      left(){
        this.$root.$emit('moveLeft') 
      },
      right(){
        this.$root.$emit('moveRight')
      },
      up(){
        this.$root.$emit('moveUp')
      },
      down(){
        this.$root.$emit('moveDown')
      }
    }
  }
</script>

<style scoped>
  .center-arrows{
    justify-content: space-between;
  }

</style>
