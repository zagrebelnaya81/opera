import Vue from 'vue'
import Vuex from 'vuex'

import ticket from './modules/ticket'
import ticketsList from './modules/tickets-list'
import actionField from './modules/actionField'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ticketsList,
    ticket,
    actionField
  }
})
