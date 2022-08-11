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
        <h2 class="title">Детальний звіт по продажу квитків за період з {{ $route.query.from }} по {{ $route.query.to }} ({{ dateType ? "за датою продажу" : "за датою початку події"}})</h2>
        <Preloader :inline="true" v-if="loading"></Preloader>
        <div v-else class="reports-table-inner">
          <table class="table table-bordered report-kasir" ref="tableForExport">
            <thead>
              <tr>
                <th
                  rowspan="2"
                  class="report-kasir__date"
                  @click="changeSortType('date')"
                  :class="{'active': sortType == 'date'}"
                >Дата</th>
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
                <th
                  rowspan="2"
                  class="report-kasir__price"
                  @click="changeSortType('price')"
                  :class="{'active': sortType == 'price'}"
                >Ціна</th>
                <th
                  rowspan="2"
                  class="report-kasir__pib"
                  @click="changeSortType('pib')"
                  :class="{'active': sortType == 'pib'}"
                >ПIБ</th>
                <th
                  rowspan="2"
                  class="report-kasir__distributor"
                  @click="changeSortType('distributor')"
                  :class="{'active': sortType == 'distributor'}"
                >Розповсюджувач</th>
                <th colspan="3" class="report-kasir__detailed-total">Кількість проданих, шт.</th>
                <th colspan="3" class="report-kasir__detailed-total">Сума проданих, грн.</th>
              </tr>
              <tr>
                <th>Готiвкою</th>
                <th>Карткою</th>
                <th>Всього</th>
                <th>Готiвкою</th>
                <th>Карткою</th>
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
                  <td class="report-kasir__price">{{ event.price }}</td>
                  <td class="report-kasir__pib">{{ event.seller }}</td>
                  <td class="report-kasir__distributor">{{ event.buyer }}</td>
                </template>
                <template v-else>
                  <td :colspan="event.footer ? '6' : ''">Всього:</td>
                </template>

                <td class="report-kasir__detailed-amount">{{ event.cashAmount }}</td>
                <td class="report-kasir__detailed-amount">{{ event.cardAmount }}</td>
                <td class="report-kasir__detailed-amount">{{ event.cashAmount + event.cardAmount }}</td>
                <td class="report-kasir__detailed-amount">{{ event.cashSum }}</td>
                <td class="report-kasir__detailed-amount">{{ event.cardSum }}</td>
                <td class="report-kasir__detailed-amount">{{ event.cashSum + event.cardSum }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="background:#bbb;font-size:120%;font-weight:700;">
                <td colspan="6"><b>Всього:</b></td>
                <td>{{ total.cashAmount }}</td>
                <td>{{ total.cardAmount }}</td>
                <td>{{ parseInt(total.cashAmount) + parseInt(total.cardAmount) }}</td>
                <td>{{ total.cashSum }}</td>
                <td>{{ total.cardSum }}</td>
                <td>{{ parseInt(total.cashSum) + parseInt(total.cardSum) }}</td>
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

      if (query.param) {
        this.dateType = true;

        this.$store.dispatch(`reportDetailedDate`, `?from=${query.from}&to=${query.to}`);
      } else {
        this.$store.dispatch(`reportDetailed`, `?from=${query.from}&to=${query.to}`);
      }
    },
    data() {
      return {
        dateType: false
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
        return this.$store.getters.reportDetailedSort
      },
      total() {
        return this.$store.getters.reportDetailed.total
      },
      sortType() {
        return this.$store.getters.reportDetailedSortType
      },
      allInOneTable() {
        return this.kasirEvents.map(item => {
          const footerObj = {
            cardAmount: 0,
            cashAmount: 0,
            cardSum: 0,
            cashSum: 0
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
        this.$store.commit(`reportDetailedSortType`, type)
      },
      print() {
        window.print();
      },
      download() {
        if (!table) {
          table = new TableExport(this.$refs.tableForExport, {
            formats: [`xlsx`],
            filename: `Детальний звіт по продажу квитків за період з ${this.$route.query.from} по ${this.$route.query.to} (${this.dateType ? "за датою продажу" : "за датою початку події"})`,
            bootstrap: false
          });
        } else {
          table.update({
            formats: [`xlsx`],
            filename: `Детальний звіт по продажу квитків за період з ${this.$route.query.from} по ${this.$route.query.to} (${this.dateType ? "за датою продажу" : "за датою початку події"})`,
            bootstrap: false
          });
        }

        this.$refs.tableForExport.querySelector(`button`).click();
      }
    }
  }
</script>
