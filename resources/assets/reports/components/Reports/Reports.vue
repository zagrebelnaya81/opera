<template>
  <div>
    <KasirHeader></KasirHeader>
    <div class="wrap-full">
      <div class="reports-table-wrap">
        <table class="table table-bordered reports-table table-hover table-striped">
          <thead>
            <tr>
              <th rowspan="2">Назва звіту</th>
              <th colspan="2" class="reports-table__period">Період</th>
              <th rowspan="2" class="reports-table__action">Дія</th>
            </tr>
            <tr>
              <th style="text-align:center;">З</th>
              <th style="text-align:center;">По</th>
            </tr>
          </thead>
          <tbody  >
              <ReportsItem
              v-for="order in getOrdersList"
              :key="order.id"
              :order="order"
              >
              </ReportsItem>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import ReportsItem from "./ReportsItem.vue"
  import ReportConstructed from "./ReportConstructed.vue"
  import KasirHeader from "../Common/KasirHeader/KasirHeader"

  export default {
    components: {
      ReportsItem,
      KasirHeader,
      ReportConstructed
    },
    computed: {
      getOrdersList() {
        return this.$store.getters.getOrdersList
      }
    }
  }
</script>
