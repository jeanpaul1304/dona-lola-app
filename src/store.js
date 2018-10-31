import Vue from 'vue'
import Vuex from 'vuex'
import Service from './services/Service'
import AuthService from './services/AuthService'
import MapService from './services/MapService'
import MenuService from './services/MenuService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu: false,
    logeado: false,
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
    getDishes (context, data) {
      return MenuService.getDishes(data.idMarker)
    },
    setToken (context, token) {
      console.log(context)
      context.state.logeado = true
      AuthService.setToken(token)
    },
    putOrder (context, data) {
      return MenuService.putOrder(data)
    }
  }
})




