import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import entry from './modules/entry'
import reportKasir from './modules/reportKasir'
import reportKassDay from './modules/reportKassDay'
import ReportOnLineSale from './modules/ReportOnLineSale'
import reportSeniorKasir from './modules/reportSeniorKasir'
import reportDistributors from './modules/reportDistributors'
import reportPriceCut from './modules/reportPriceCut'
import reportEvents from './modules/reportEvents'
import reportDetailed from './modules/reportDetailed'
import reports from './modules/reports'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    reports,
    common,
    entry,
    reportKasir,
    reportKassDay,
    ReportOnLineSale,
    reportSeniorKasir,
    reportDistributors,
    reportPriceCut,
    reportEvents,
    reportDetailed
  }
})
