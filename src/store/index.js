import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user' // user 模块
import getters from './getters' // getters
import VuexPersistence from 'vuex-persist'
import rights from './modules/rights'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  mutations: {
  },

  modules: {
    user,
    rights
  },
  plugins: [vuexLocal.plugin]
})
