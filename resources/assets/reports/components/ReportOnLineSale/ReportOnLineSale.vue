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
        <h2 class="title">Звіт по on-line продажам</h2>
        <Preloader :inline="true" v-if="loading"></Preloader>
        <template v-else>
          <div class="reports-table-inner">
              <table class="table table-bordered report-kasir" ref="tableForExport">
              <thead>
                <tr>
                  <th
                    rowspan="1"
                    class="report-kasir__name"
                    @click="changeSortType('id')"
                    :class="{'active': sortType == 'id'}"
                  >ID</th>
                  <th colspan="1" class="report-kasir__total">ПІБ</th>
                  <th colspan="1" class="report-kasir__total">Квиток</th>
                  <th colspan="1" class="report-kasir__total">Ціна, грн</th>
                </tr>
              </thead>
              <tbody v-for="(event, i) in allInOneTable"
                  :key="i">
                <tr>
                   <td colspan="5"> <strong>{{ event.title }} {{ event.date }} {{ event.time }}</strong></td>
                </tr>
                <tr v-for="(event, i) in event.tickets"
                  :key="i">
                   <td class="report-kasir__name">{{ event.id }}</td>
                   <td class="report-kasir__total">{{ event.order.seller.firstName+" "+event.order.seller.lastName}}</td>
                   <td class="report-kasir__total">{{ event.id }}</td>
                   <td class="report-kasir__total">{{ event.full_price }}</td>
                </tr>
              </tbody>
            </table>


           </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  let table = null;

  import Preloader from "../Common/Preloader/Preloader";
  import KasirHeader from "../Common/KasirHeader/KasirHeader"

  export default {
    components: {
      Preloader,
      KasirHeader
    },
    created() {
      const query = this.$route.query;
      console.log(`?from=${query.from}&to=${query.to}`); 
      this.$store.dispatch(`ReportOnLineSale`, `?from=${query.from}`)
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      kasir() {
        return this.$store.getters.kasir
      },
      kasirEvents() {
        return this.$store.getters.ReportOnLineSaleSort
      },
      total() {
        let obj = {
          cashAmount: 0,
          cashSum: 0,
          cardAmount: 0,
          cardSum: 0,
          returnedAmount: 0,
          returnedSum: 0
        };

        this.$store.getters.ReportOnLineSale.events.forEach(event => {
          for (const key in obj) {
            obj[key] += parseInt(event[key]);
          }
        });

        obj.footer = true;

        return obj
      },
      sortType() {
        return this.$store.getters.ReportOnLineSaleSortType
      },
      allInOneTable() {
        return this.kasirEvents.map(item => {
          console.log(item);
          return item
        }).reduce((sum, item) => {
          item.forEach(event => sum.push(event))
          return sum
        }, [])
      }
    },
    methods: {
      changeSortType(type) {
        this.$store.commit(`ReportOnLineSaleSortType`, type)
      },
      print() {
        window.print();
      },
      download() {
        if (!table) {
          table = new TableExport(this.$refs.tableForExport, {
            formats: [`xlsx`],
            filename: `Касовий звіт щоденний № ____ 
            за  ${ this.$route.query.from }  року`,
            bootstrap: false
          });
        } else {
          table.update({
            formats: [`xlsx`],
            filename: `Касовий звіт щоденний № ____ 
            за  ${ this.$route.query.from }  року`,
            bootstrap: false
          });
        }

        this.$refs.tableForExport.querySelector(`button`).click();
      }
    }
  }
</script>
