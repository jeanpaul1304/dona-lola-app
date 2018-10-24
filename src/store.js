import Vue from 'vue'
import Vuex from 'vuex'
import Service from './services/Service'
import AuthService from './services/AuthService'
import MapService from './services/MapService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu: false,
    auth: false,
    token: ''
  },
  mutations: {
  },
  actions: {
    login (context, data) {
      return AuthService.login(data.email, data.password)
    },
    changeMenu (flag) {
      this.state.showMenu = flag
    },
    getMarkers () {
      return MapService.getMarkers()
    },
    setToken (context, token) {
      AuthService.setToken(token)
    }
  }
})
