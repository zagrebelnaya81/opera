import Vue from "vue"
import VueRouter from "vue-router"
import {store} from "./store"

Vue.use(VueRouter)

import Reports from "./components/Reports/Reports"
import ReportKasir from "./components/ReportKasir/ReportKasir"
import ReportSeniorKasir from "./components/ReportSeniorKasir/ReportSeniorKasir"
import ReportDistributors from "./components/ReportDistributors/ReportDistributors"
import ReportPriceCut from "./components/ReportPriceCut/ReportPriceCut"
import ReportEvents from "./components/ReportEvents/ReportEvents"
import ReportDetailed from "./components/ReportDetailed/ReportDetailed"
import ReportConstructor from "./components/ReportConstructor/ReportConstructor"
import ReportConstructed from "./components/Reports/ReportConstructed"
import ReportKassDay from "./components/ReportKassDay/ReportKassDay"
import ReportOnLineSale from "./components/ReportOnLineSale/ReportOnLineSale"

const path = `/admin/reports`;

export const router = new VueRouter({
  mode: `history`,
  routes: [
    {
      path: `${path}/`,
      name: `Reports`,
      component: Reports
    },
    {
      path: `${path}/report-kasir`,
      name: `ReportKasir`,
      component: ReportKasir
    },
    {
      path: `${path}/report-kassday`,
      name: `ReportKassDay`,
      component: ReportKassDay
    },
    {
      path: `${path}/report-online`,
      name: `ReportOnLineSale`,
      component: ReportOnLineSale
    },
    {
      path: `${path}/report-senior-kasir`,
      name: `ReportSeniorKasir`,
      component: ReportSeniorKasir
    },
    {
      path: `${path}/report-distributors`,
      name: `ReportDistributors`,
      component: ReportDistributors
    },
    {
      path: `${path}/report-price-cut`,
      name: `ReportPriceCut`,
      component: ReportPriceCut
    },
    {
      path: `${path}/report-events`,
      name: `ReportEvents`,
      component: ReportEvents
    },
    {
      path: `${path}/report-detailed`,
      name: `ReportDetailed`,
      component: ReportDetailed
    },
    {
      path: `${path}/report-constructor`,
      name: `ReportConstructor`,
      component: ReportConstructor
    },
    {
      path: `${path}/report-constructed/:id`,
      name: `ReportConstructed`,
      component: ReportConstructed
    },
    {
      path: `/admin/dashboard`,
      beforeEnter(to, from, next) {
        window.location = `/admin/dashboard`;
      }
    }
  ]
})

