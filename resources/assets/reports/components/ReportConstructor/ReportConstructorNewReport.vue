<template>
<div class="newReportWrap">
    
    <div v-for="(field, index) in fields" :key="`${index}-field`" :class="field.block === undefined ? 'main-field' : `block-field-${Object.keys(field.block).length}`">
        <div v-if="index === 0">
            <div v-if="edit">
                <input type="text" v-model="reportName">
            </div>
            <div v-else>
                {{reportName}}
            </div>
            <span>
                <input type="button" value="Edit" @click="switchEditReportTitle">
                <input type="button" value="Delete" @click="deleteReport">
            </span>
        </div>
        <input type="checkbox" name="" id="" v-if="field.block === undefined && index !== 0">
        <div class="block" v-for="(blockElement, index) in field.block" :key="`${index}-element}`">
            <template v-if="field.block !== undefined"> 
                <input type="checkbox" name="" id="" >
            </template>
            
        </div>
       
    </div>
</div>
</template>
<script>
export default {
    props: ['fieldsCount', 'index'],
    data() {
        return {
            reportName: 'New Report',
            edit: false,
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
        }
    },
    methods: {
        addNewReport() {
            return
        },
        
        switchEditReportTitle() {
            this.edit = !this.edit
        },
        deleteReport() {
            this.$emit('deleteReport', this.index)
        },
    }
               
                    
}
</script>
<style scoped>
.newReportWrap {
    display: flex;
    position: relative;
}
.main-field {
    min-width: 100px;
    max-width:100px;
    padding: auto;
    text-align: center;
    border: solid 1px #eee;
}
.main-field > input, .block > input {
    margin: 12px;
}
.main-field:nth-child(1) {
    min-width: 200px;
    max-width: 200px;
    position: fixed;
    left: 5px;
    background-color: #fff;
}
.main-field:nth-child(2) {
    margin-left: 200px;
}
.block {
    min-width: 100px;
    max-width:100px;
    padding: auto;
    text-align: center;
    border: solid 1px #eee;
}
.block-field-4 {
    display:flex;
    min-width: 400px;
}
.block-field-6 {
    display:flex;
    min-width: 600px;
}
</style>