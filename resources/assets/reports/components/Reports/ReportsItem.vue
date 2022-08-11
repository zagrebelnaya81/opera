<template>
  <tr>
    <td v-html="order.name"></td>
    <td><input class="reports-table__input" name="from" type="date" v-model="order.from"></td>
    <td><input v-if="order.id!=9" class="reports-table__input" name="to" type="date" v-model="order.to"></td>
    <td>
      <router-link
        v-if="order.action.param !== 'constructed'"
        :to="action"
        class="btn btn-secondary btn-block btn-sm"
      >Сформувати</router-link>
      <router-link
      v-else
      :to="`reports/${order.action.name}/${order.id}`"
      class="btn btn-secondary btn-block btn-sm"
      >Сформувати</router-link>
    </td>
  </tr>
</template>

<script>

  export default {
    props: {
      order: {
        type: Object,
        required: true
      }
    },
    mounted() {
      console.log(this.order)
    },
    computed: {
      action() {
        if (this.order.action.param) {
          return {
            name: this.order.action.name,
            query: {
              from: this.order.from,
              to: this.order.to,
              param: this.order.action.param
            }
          }
        } else {
          return {
            name: this.order.action.name,
            query: {
              from: this.order.from,
              to: this.order.to
             }
          }
         }
       }
    }
  }
</script>
