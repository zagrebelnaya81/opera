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
        <h2 class="title">Звіт по продажу квитків за період з {{ $route.query.from }} по {{ $route.query.to }} по виступам <template v-if="online">online</template> (за датою початку події)</h2>
        <Preloader :inline="true" v-if="loading"></Preloader>
        <div v-else class="reports-table-inner">
          <table class="table table-bordered report-kasir" ref="tableForExport">
            <thead>
              <tr>
                <th
                  :rowspan="online ? '' : 2"
                  class="report-kasir__date"
                  @click="changeSortType('date')"
                  :class="{'active': sortType == 'date'}"
                >Дата</th>
                <th
                  :rowspan="online ? '' : 2"
                  class="report-kasir__time"
                  @click="changeSortType('time')"
                  :class="{'active': sortType == 'time'}"
                >Час</th>
                <th
                  :rowspan="online ? '' : 2"
                  class="report-kasir__name"
                  @click="changeSortType('name')"
                  :class="{'active': sortType == 'name'}"
                >Назва</th>
                <th
                  :rowspan="online ? '' : 2"
                  class="report-kasir__hall"
                  @click="changeSortType('hall')"
                  :class="{'active': sortType == 'hall'}"
                >Зал</th>
                <th :colspan="online ? '' : 4" :class="online ? 'report-kasir__price-cut-total' : 'report-kasir__senior-total'">Кількість проданих, шт.</th>
                <th :colspan="online ? '' : 4" :class="online ? 'report-kasir__price-cut-total' : 'report-kasir__senior-total'">Сума проданих, грн.</th>
              </tr>
              <tr v-if="!online">
                <th>Готівкою</th>
                <th>Карткою</th>
                <th>Онлайн</th>
                <th>Всього</th>
                <th>Готівкою</th>
                <th>Карткою</th>
                <th>Онлайн</th>
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
                  <td class="report-kasir__hall">{{ event.hall }}</td>
                </template>
                <template v-else>
                  <td :colspan="event.footer ? '4' : ''">Всього:</td>
                </template>

                <template v-if="online">
                  <td class="report-kasir__price-cut-amount">{{ event.onlineAmount }}</td>
                  <td class="report-kasir__price-cut-amount">{{ event.onlineSum }}</td>
                </template>

                <template v-else>
                  <td class="report-kasir__senior-amount">{{ event.cashAmount }}</td>
                  <td class="report-kasir__senior-amount">{{ event.cardAmount }}</td>
                  <td class="report-kasir__senior-amount">{{ event.onlineAmount }}</td>
                  <td class="report-kasir__senior-amount">{{ event.cashAmount + event.cardAmount + event.onlineAmount }}</td>

                  <td class="report-kasir__senior-amount">{{ event.cashSum }}</td>
                  <td class="report-kasir__senior-amount">{{ event.cardSum }}</td>
                  <td class="report-kasir__senior-amount">{{ event.onlineSum }}</td>
                  <td class="report-kasir__senior-amount">{{ event.cashSum + event.cardSum + event.onlineSum }}</td>
                </template>
              </tr>
            </tbody>
            <tfoot>
              <tr style="background:#bbb;font-size:120%;font-weight:700;">
                <td colspan="4"><b>Всього:</b></td>
                <template v-if="online">
                  <td>{{ total.onlineAmount }}</td>
                  <td>{{ total.onlineSum }}</td>
                </template>

                <template v-else>
                  <td>{{ total.cashAmount }}</td>
                  <td>{{ total.cardAmount }}</td>
                  <td>{{ total.onlineAmount }}</td>
                  <td>{{ total.cashAmount + total.cardAmount + total.onlineAmount }}</td>

                  <td>{{ total.cashSum }}</td>
                  <td>{{ total.cardSum }}</td>
                  <td>{{ total.onlineSum }}</td>
                  <td>{{ total.cashSum + total.cardSum + total.onlineSum }}</td>
                </template>
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

      if (query.param) this.online = true;

      this.$store.dispatch(`reportEvents`, `?from=${query.from}&to=${query.to}`);
    },
    data() {
      return {
        online: false
      }
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      kasir() {
        return this.$store.getters.kasir
      },
      kasirEvents() {
        return this.$store.getters.reportEventsSort
      },
      total() {
        let obj = {
          cashAmount: 0,
          cashSum: 0,
          cardAmount: 0,
          cardSum: 0,
          onlineAmount: 0,
          onlineSum: 0
        };

        this.$store.getters.reportEvents.events.forEach(event => {
          for (const key in obj) {
            obj[key] += parseInt(event[key]);
          }
        });

        obj.footer = true;

        return obj
      },
      sortType() {
        return this.$store.getters.reportEventsSortType
      },
      allInOneTable() {
        return this.kasirEvents.map(item => {
          const footerObj = {
            cashAmount: 0,
            cashSum: 0,
            cardAmount: 0,
            cardSum: 0,
            onlineAmount: 0,
            onlineSum: 0
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
        this.$store.commit(`reportEventsSortType`, type)
      },
      print() {
        window.print();
      },
      download() {
        if (!table) {
          table = new TableExport(this.$refs.tableForExport, {
            formats: [`xlsx`],
            filename: `Звіт по продажу квитків за період з ${this.$route.query.from} по ${this.$route.query.to} по виступам ${this.online ? 'online' : ''} (за датою початку події)`,
            bootstrap: false
          });
        } else {
          table.update({
            formats: [`xlsx`],
            filename: `Звіт по продажу квитків за період з ${this.$route.query.from} по ${this.$route.query.to} по виступам ${this.online ? 'online' : ''} (за датою початку події)`,
            bootstrap: false
          });
        }

        this.$refs.tableForExport.querySelector(`button`).click();
      }
    }
  }
</script>
