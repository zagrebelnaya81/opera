<template>
    <div>
    <KasirHeader>
      <template v-if="!loading">
        <button type="button" class="btn btn-secondary btn-sm ml-2" @click="print">Друк</button>
        <button type="button" class="btn btn-secondary btn-sm ml-2" @click="download">Завантажити XLSX</button>
      </template>
    </KasirHeader>
    <div class="wrap-full">
      <div class="reports-table-wrap">
        <h2 class="title">Звiт</h2>
        <Preloader :inline="true" v-if="loading"></Preloader>
        <div class="reports-table-inner" v-else>
          <table class="table table-bordered report-kasir" ref="tableForExport">
            <thead>
              <tr>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
export default {
    methods: {
      print() {
        window.print();
      },
      download() {
        if (!table) {
          table = new TableExport(this.$refs.tableForExport, {
            formats: [`xlsx`],
            filename: `Звіт по продажу квитків за період з ${this.$route.query.from} по ${this.$route.query.to} по розповсюджувачами (за датою продажу)`,
            bootstrap: false
          });
        } else {
          table.update({
            formats: [`xlsx`],
            filename: `Звіт по продажу квитків за період з ${this.$route.query.from} по ${this.$route.query.to} по розповсюджувачами (за датою продажу)`,
            bootstrap: false
          });
        }

        this.$refs.tableForExport.querySelector(`button`).click();
      }
    },
    created() {
      console.log(this.$route.params.id)
    }
    
}
</script>