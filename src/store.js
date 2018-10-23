import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu: false,
    auth: false
  },
  mutations: {
  },
  actions: {
    changeMenu (flag) {
      this.state.showMenu = flag
    }
  }
})
