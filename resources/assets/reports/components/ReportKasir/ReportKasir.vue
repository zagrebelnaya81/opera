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
        <h2 class="title">Звіт по продажу квитків за період з {{ $route.query.from }} по {{ $route.query.to }} по касиру - <span>{{ kasir.fullName }}</span>  (за датою продажу)</h2>
        <Preloader :inline="true" v-if="loading"></Preloader>
        <template v-else>
          <div class="reports-table-inner">
            <table class="table table-bordered report-kasir" ref="tableForExport">
              <thead>
                <tr>
                  <th
                    rowspan="2"
                    class="report-kasir__date"
                    @click="changeSortType('date')"
                    :class="{'active': sortType == 'date'}"
                  >Дата заходу </th>
                  <th
                    rowspan="2"
                    class="report-kasir__time"
                    @click="changeSortType('time')"
                    :class="{'active': sortType == 'time'}"
                  >Час</th>
                  <th
                    rowspan="2"
                    class="report-kasir__name"
                    @click="changeSortType('name')"
                    :class="{'active': sortType == 'name'}"
                  >Назва</th>
                  <th colspan="5" class="report-kasir__total">Кількість проданих, шт.</th>
                  <th colspan="5" class="report-kasir__total">Сума проданих, грн.</th>
                </tr>
                <tr>
                  <th>Готівкою</th>
                  <th>Карткою</th>
                  <th>Продано</th>
                  <th>Повернуто</th>
                  <th>Всього</th>
                  <th>Готівкою</th>
                  <th>Карткою</th>
                  <th>Продано</th>
                  <th>Повернуто</th>
                  <th>Всього</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(event, i) in allInOneTable"
                  :key="i"
                  :style="event.footer ? {background:'#bbb', fontWeight:'700'} : ''"
                >
                  <template v-if="!event.footer">
                    <td class="report-kasir__date">{{ event.date }}</td>
                    <td class="report-kasir__time">{{ event.time }}</td>
                    <td class="report-kasir__name">{{ event.title }}</td>
                  </template>
                  <template v-else>
                    <td :colspan="event.footer ? '3' : ''">Всього:</td>
                  </template>

                  <td class="report-kasir__amount">{{ event.cashAmount }}</td>
                  <td class="report-kasir__amount">{{ event.cardAmount }}</td>
                  <td class="report-kasir__amount">{{ event.cashAmount + event.cardAmount }}</td>
                  <td class="report-kasir__amount">{{ event.returnedAmount }}</td>
                  <td class="report-kasir__amount">{{ event.cashAmount + event.cardAmount - event.returnedAmount }}</td>
                  <td class="report-kasir__amount">{{ event.cashSum }}</td>
                  <td class="report-kasir__amount">{{ event.cardSum }}</td>
                  <td class="report-kasir__amount">{{ event.cashSum + event.cardSum }}</td>
                  <td class="report-kasir__amount">{{ event.returnedSum }}</td>
                  <td class="report-kasir__amount">{{ event.cashSum + event.cardSum - event.returnedSum }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr style="background:#bbb;font-size:120%;font-weight:700;">
                  <td colspan="3"><b>Всього:</b></td>
                  <td>{{ total.cashAmount }}</td>
                  <td>{{ total.cardAmount }}</td>
                  <td>{{ total.cashAmount + total.cardAmount }}</td>
                  <td>{{ total.returnedAmount }}</td>
                  <td>{{ total.cashAmount + total.cardAmount - total.returnedAmount }}</td>

                  <td>{{ total.cashSum }}</td>
                  <td>{{ total.cardSum }}</td>
                  <td>{{ total.cashSum + total.cardSum }}</td>
                  <td>{{ total.returnedSum }}</td>
                  <td>{{ total.cashSum + total.cardSum - total.returnedSum }}</td>
                </tr>
              </tfoot>
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
      this.$store.dispatch(`reportKasir`, `?from=${query.from}&to=${query.to}`)
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      kasir() {
        return this.$store.getters.kasir
      },
      kasirEvents() {
        return this.$store.getters.reportKasirSort
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

        this.$store.getters.reportKasir.events.forEach(event => {
          for (const key in obj) {
            obj[key] += parseInt(event[key]);
          }
        });

        obj.footer = true;

        return obj
      },
      sortType() {
        return this.$store.getters.reportKasirSortType
      },
      allInOneTable() {
        return this.kasirEvents.map(item => {
          const footerObj = {
            cashAmount: 0,
            cardAmount: 0,
            returnedAmount: 0,
            cashSum: 0,
            cardSum: 0,
            returnedSum: 0
          };

          item.forEach(event => {
            for (const key in footerObj) {
              footerObj[key] += parseInt(event[key]);
            }
          });

          footerObj.footer = true;
          item.push(footerObj);

          return item
        }).reduce((sum, item) => {
          item.forEach(event => sum.push(event))
          return sum
        }, [])
      }
    },
    methods: {
      changeSortType(type) {
        this.$store.commit(`reportKasirSortType`, type)
      },
      print() {
        window.print();
      },
      download() {
        if (!table) {
          table = new TableExport(this.$refs.tableForExport, {
            formats: [`xlsx`],
            filename: `Звіт по продажу квитків за період з ${this.$route.query.from} по ${this.$route.query.to} по касиру - ${this.kasir.fullName} (за датою продажу)`,
            bootstrap: false
          });
        } else {
          table.update({
            formats: [`xlsx`],
            filename: `Звіт по продажу квитків за період з ${this.$route.query.from} по ${this.$route.query.to} по касиру - ${this.kasir.fullName} (за датою продажу)`,
            bootstrap: false
          });
        }

        this.$refs.tableForExport.querySelector(`button`).click();
      }
    }
  }
</script>
