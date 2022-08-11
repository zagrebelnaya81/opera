<template>
    <div>
        <div class="wrap-full ">
            <div class="reports-table-wrap report-constructor">
                <h2 class="title">Конструктор Звiтiв</h2>
                <Preloader :inline="true" v-if="loading"></Preloader>
                <div class="fields-container">
                    <div :class="`${field.block !== undefined ? 'block-field' : 'main-fields'}`" v-for="(field, index) in fields" :key="`${index}-field`">
                        <div :class="`${field.block !== undefined ? 'block-title' : ''}`">
                            {{field.title}}
                        </div>
                        <div class="sub-fields-container" v-if="field.block !== undefined">
                            <div class="sub-fields" v-for="(blockElement, index) in field.block" :key="`${index}-element}`">
                                <div>{{blockElement.title}}</div> 
                            </div>
                        </div>
                    </div>
                </div>
                <ReportConstructorNew 
                class="report"
                v-for="(report, index) in reports" 
                :key="`${index}-report`"
                :index="index"
                :fieldsCount="fields.length"
                @deleteReport="deleteReport($event)"
                />
                <div class="add-button">
                    <input type="button" value="Додати" @click="addNewReport">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import KasirHeader from "../Common/KasirHeader/KasirHeader";
import Preloader from "../Common/Preloader/Preloader";
import ReportConstructorNew from "./ReportConstructorNewReport.vue"
export default {
    components: {
        KasirHeader,
        Preloader,
        ReportConstructorNew
    },
    data() {
        return {
            fields: [
                {
                    title: 'Найменування',
                    checked: false
                },
                {
                    title: 'ФІО касира',
                    checked: false
                },
                {
                    title: 'Назва події',
                    checked: false
                },
                {
                    title: 'Дата початку',
                    checked: false
                },
                {
                    title: 'Час початку',
                    checked: false
                },
                {
                    title: 'Акції',
                    checked: false
                },
                {
                    title: 'Ціна квитка',
                    checked: false
                },
                {
                    title: 'Кількість проданих',
                    checked: false,
                    block: [
                        {
                            title: 'Повна (кількість проданих квитків без урахування знижки, якщо значення знижки <0%),',
                            checked: false,
                            
                        },
                        {
                            title: 'Знижка (кількість проданих по знижці, якщо значення знижки> 0%)',
                            checked: false
                        },
                        {
                            title: 'За готівковий розрахунок ',
                            checked: false
                        },
                        {
                            title: 'За безготівковий розрахунок',
                            checked: false
                        },
                        {
                            title: ' Онлайн',
                            checked: false
                        },
                        {
                            title: 'Всього',
                            checked: false
                        }
                    ]
                },
                
                {
                    title: 'Сума проданих',
                    checked: false,
                    block: [
                        {
                            title: 'Повна (вартість проданих квитків без урахування знижки, якщо значення знижки <0%),',
                            checked: false
                        },
                        {
                            title: 'Знижка (вартість проданих по знижці, якщо значення знижки> 0%),',
                            checked: false
                        },
                        {
                            title: 'За готівковий розрахунок',
                            checked: false
                        },
                        {
                            title: 'За безготівковий розрахунок',
                            checked: false
                        },
                        {
                            title: 'Онлайн',
                            checked: false
                        },
                        {
                            title: 'Всього',
                            checked: false
                        }
                    ]
                },
                {
                    title: 'дата початку події',
                    checked: false
                },
                {
                    title: 'час початку події',
                    checked: false
                },
                {
                    title: 'Назва події',
                    checked: false
                },
                {
                    title: 'Назва залу',
                    checked: false
                },
                {
                    title: 'Ціна квитка',
                    checked: false
                },
                {
                    title: 'ПІБ того, хто провів (продав) квиток в системі',
                    checked: false
                },
                {
                    title: 'Ім`я розповсюджувача (найменування дистриб`ютора, каса, сайт) ',
                    checked: false
                },
                {
                    title: 'Кількість проданих',
                    checked: false,
                    block: [
                        {
                            title: 'За готівковий розрахунок',
                            checked: false
                        },
                        {
                            title: 'За безготівковий розрахунок',
                            checked: false
                        },
                        {
                            title: 'онлайн',
                            checked: false
                        },
                        {
                            title: 'Попередньо продані квитки (ті квитки (кількість), за які гроші не надійшли, але квитки роздруковані (чи ні) )',
                            checked: false
                        },
                        {
                            title: 'Розповсюджувач',
                            checked: false
                        },
                        {
                            title: 'Всього',
                            checked: false
                        },
                    ]
                },
                
                {
                    title: 'Сума проданих',
                    checked: false,
                    block: [
                        {
                            title: 'За готівковий розрахунок',
                            checked: false
                        },
                        {
                            title: 'За безготівковий розрахунок',
                            checked: false
                        },
                        {
                            title: 'онлайн',
                            checked: false
                        },
                        {
                            title: 'Попередньо продані квитки (ті квитки (сума грошей), за які гроші не надійшли, але квитки роздруковані (чи ні).',
                            checked: false
                        },
                    ]
                }, 
            ],
            reports: ['New Report']
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
            return this.$store.getters.reportDistributorsSort
        },
        total() {
            return this.$store.getters.reportDistributors.total
        },
        sortType() {
            return this.$store.getters.reportDistributorsSortType
        },
    },
    methods: {
        addNewReport() {
            this.reports.push('New Report')
        },
        deleteReport(index) {
            this.reports.splice(index, 1)
        },
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
    }
}
</script>
<style scoped>
@import url('./ReportConstructor.scss');
.add-button {
    margin: 5px 55px;
}
.report {
    margin:5px 0;
}
</style>