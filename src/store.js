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
    login (email, password) {
      console.log('entra?')
      return AuthService.login(email, password)
    }
    changeMenu (flag) {
      this.state.showMenu = flag
    }
  }
})
