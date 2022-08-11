import Vue from "vue"
import VueRouter from "vue-router"
import {store} from "./store"

Vue.use(VueRouter)

import TicketsList from "./components/TicketsList/TicketsList"
import Ticket from "./components/Ticket/Ticket"
import TicketCreate from "./components/Ticket/TicketCreate"

const path = `/admin/tickets-designer`;

export const router = new VueRouter({
  mode: `history`,
  routes: [
    {
      path: `${path}/tickets`,
      name: `TicketsList`,
      component: TicketsList
    },
    {
      path: `${path}/ticket/:id`,
      name: `Ticket`,
      component: Ticket
    },
    {
      path: `${path}/create-ticket`,
      name: `CreateTicket`,
      component: TicketCreate
    },
    {
      path: `*`,
      redirect: { name: `TicketsList` }
    }
  ]
})
