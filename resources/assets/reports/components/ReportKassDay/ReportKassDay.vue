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
        <h2 class="title">Касовий звіт щоденний № ____ <br>
            за  {{ $route.query.from }}  року  </h2>
        <Preloader :inline="true" v-if="loading"></Preloader>
        <template v-else>
          <div class="reports-table-inner">
           <div style="max-width: 32em;
                      min-height: 2em;
                      margin-left: auto;
                      margin-right: 4.6em;"> Додаток 12<br>
                      до Інструкції з ведення квиткового<br>
                      господарства в театрально-видовищних<br>                            
                      підприємствах та культурно-освітніх закладах<br>
                      (пункт 9.3)<br></div>

            <div style="max-width: 25em;
                      min-height: 2em;
                      margin-left: auto;
                      margin-right: 4.6em;">Форма № КГ-13<br></div>

            <div style="max-width: 50em;
                      min-height: 2em;
                      margin: 0 auto;
                      ">ДП «Харківський національний академічний театр опери та балету ім. М.В. Лисенка»<br>
                               (найменування підприємства, організації, установи)<br></div>

Ідентифікаційний код<br>
<br>
ЄДРПОУ 38385217<br>
<br>

            <table class="table table-bordered report-kasir" ref="tableForExport">
              <thead>
                <tr>
                  <th
                    rowspan="1"
                    class="report-kasir__name"
                    @click="changeSortType('name')"
                    :class="{'active': sortType == 'name'}"
                  >Назва заходу</th>
                  <th colspan="1" class="report-kasir__total">Ціна квитка, грн</th>
                  <th colspan="1" class="report-kasir__total">Кількість, шт.</th>
                  <th colspan="1" class="report-kasir__total">Всього, грн</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(event, i) in allInOneTable"
                  :key="i"
                  :style="event.footer ? {background:'#bbb', fontWeight:'700'} : ''"
                >
                  <template v-if="!event.footer">
                    <td class="report-kasir__name">{{ event.title }}</td>
                  </template>
                  <template v-else>
                    <td :colspan="event.footer ? '1' : ''">Всього:</td>
                  </template>
                  <td class="report-kasir__amount">{{ event.full_price }}</td>
                  <td class="report-kasir__amount">{{ event.cashAmount + event.cardAmount - event.returnedAmount }}</td>
                  <td class="report-kasir__amount">{{ event.cashSum + event.cardSum - event.returnedSum }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr style="background:#bbb;font-size:120%;font-weight:700;">
                  <td colspan="1"><b>Всього:</b></td>
                  <td>X</td>
                  <td>{{ total.cashAmount + total.cardAmount - total.returnedAmount }}</td>
                  <td>{{ total.cashSum + total.cardSum - total.returnedSum }}</td>
                </tr>
              </tfoot>
            </table>
            <div>
              <br>
              Звіт здав<br>
                Старший квитковий касир   ______________________________________________________________<br>
                                                                  (підпис, ініціали, прізвище) 

            </div>
            <br>
            <div>
              Звіт прийняв<br>
                Бухгалтер   ______________________________________________________________<br>
                                                            (підпис, ініціали, прізвище) 
            </div>
            <div>{Інструкцію доповнено новим додатком 12 згідно з Наказом Міністерства культури № 488 від 13.07.2015}</div>
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
      this.$store.dispatch(`reportKassDay`, `?from=${query.from}`)
    },
    computed: {
      loading() {
        return this.$store.getters.loading
      },
      kasir() {
        return this.$store.getters.kasir
      },
      kasirEvents() {
        return this.$store.getters.reportKassDaySort
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

        this.$store.getters.reportKassDay.events.forEach(event => {
          for (const key in obj) {
            obj[key] += parseInt(event[key]);
          }
        });

        obj.footer = true;

        return obj
      },
      sortType() {
        return this.$store.getters.reportKassDaySortType
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
console.log(item)
          return item
        }).reduce((sum, item) => {
          item.forEach(event => sum.push(event))
          return sum
        }, [])
      }
    },
    methods: {
      changeSortType(type) {
        this.$store.commit(`reportKassDaySortType`, type)
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
