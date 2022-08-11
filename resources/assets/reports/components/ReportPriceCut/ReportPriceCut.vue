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
        <h2 class="title">Звіт по продажу квитків за період з {{ $route.query.from }} по {{ $route.query.to }} у розрізі цін (за датою початку події)</h2>
        <Preloader :inline="true" v-if="loading"></Preloader>
        <div v-else class="reports-table-inner">
          <table class="table table-bordered report-kasir" ref="tableForExport">
            <thead>
              <tr>
                <th
                  class="report-kasir__date"
                  @click="changeSortType('date')"
                  :class="{'active': sortType == 'date'}"
                >Дата</th>
                <th
                  class="report-kasir__time"
                  @click="changeSortType('time')"
                  :class="{'active': sortType == 'time'}"
                >Час</th>
                <th
                  class="report-kasir__name"
                  @click="changeSortType('name')"
                  :class="{'active': sortType == 'name'}"
                >Назва</th>
                <th
                  class="report-kasir__hall"
                  @click="changeSortType('hall')"
                  :class="{'active': sortType == 'hall'}"
                >Зал</th>
                <th
                  class="report-kasir__price"
                  @click="changeSortType('price')"
                  :class="{'active': sortType == 'price'}"
                >Ціна</th>
                <th class="report-kasir__price-cut-total">Кількість проданих, шт.</th>
                <th class="report-kasir__price-cut-total">Сума проданих, грн.</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(event, i) in allInOneTable"
                :key="i"
                :style="event.footer ? {background:'#bbb', fontWeight:'700'} : ''"
              >
              
                <template v-if="!event.footer && event.totalAmount !=0">
                  <td class="report-kasir__date">{{ event.date }}</td>
                  <td class="report-kasir__time">{{ event.time }}</td>
                  <td class="report-kasir__name">{{ event.title }}</td>
                  <td class="report-kasir__hall">{{ event.hall }}</td>
                  <td class="report-kasir__price">{{ event.price }}</td>
                </template>
                <template v-else-if="event.totalAmount !=0">
                  <td :colspan="event.footer ? '5' : ''">Всього:</td>
                </template>
                <template  v-if="event.totalAmount !=0">
                <td class="report-kasir__price-cut-amount">{{ event.totalAmount }}</td>
                <td class="report-kasir__price-cut-amount">{{ event.totalSum }}</td>
                </template>
               
              </tr>
            </tbody>
            <tfoot>
              <tr style="background:#bbb;font-size:120%;font-weight:700;">
                <td colspan="5"><b>Всього:</b></td>
                <td>{{ total.totalAmount }}</td>
                <td>{{ total.totalSum }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let table = null;
  import Preloader from "../Common/Preloader/Preloader";
  import KasirHeader from "../Common/KasirHeader/KasirHeader";

  export default {
    components: {
      Preloader,
      KasirHeader
    },
    created() {
      const query = this.$route.query;

      this.$store.dispatch(`reportPriceCut`, `?from=${query.from}&to=${query.to}`);
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      kasir() {
        return this.$store.getters.kasir
      },
      kasirEvents() {
        return this.$store.getters.reportPriceCutSort
      },
      total() {
        return this.$store.getters.reportPriceCut.total
      },
      sortType() {
        return this.$store.getters.reportPriceCutSortType
      },
      allInOneTable() {
        return this.kasirEvents.map((item, index) => {
          
          const footerObj = {
            totalAmount: 0,
            totalSum: 0
          };

          item.forEach(event => {
            for (const key in footerObj) {
              footerObj[key] += parseInt(event[key]);
            }
          });

          footerObj.footer = true;
          item.push(footerObj);
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
        this.$store.commit(`reportPriceCutSortType`, type)
      },
      print() {
        window.print();
      },
      download() {
        if (!table) {
          table = new TableExport(this.$refs.tableForExport, {
            formats: [`xlsx`],
            filename: `Звіт по продажу квитків за період з ${this.$route.query.from} по ${this.$route.query.to} у розрізі цін (за датою початку події)`,
            bootstrap: false
          });
        } else {
          table.update({
            formats: [`xlsx`],
            filename: `Звіт по продажу квитків за період з ${this.$route.query.from} по ${this.$route.query.to} у розрізі цін (за датою початку події)`,
            bootstrap: false
          });
        }

        this.$refs.tableForExport.querySelector(`button`).click();
      }
    }
  }
</script>
