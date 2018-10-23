import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from './services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu: false,
    auth: false
  },
  mutations: {
  },
  actions: {
    login (context, data) {
      return AuthService.login(data.email, data.password)
    },
    changeMenu (flag) {
      this.state.showMenu = flag
    }
  }
})
