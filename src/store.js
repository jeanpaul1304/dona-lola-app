import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from './services/AuthService'
import MapService from './services/MapService'
import MenuService from './services/MenuService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showMenu: false,
    logeado: false,
    token: '',
    chefs: [],
    loader: false
  },
  mutations: {
    setChefs (state, places) {
      state.chefs = places.filter(item => {
        return item
      })
    }
  },
  actions: {
    setLoader ({state}, flag) {
      state.loader = flag
    },
    login (context, data) {
      return AuthService.login(data.email, data.password)
    },
    changeMenu (flag) {
      this.state.showMenu = flag
    },
    getMarkers (context) {
      return MapService.getMarkers().then((data) => {
        context.commit('setChefs', data)
        return data
      })
    },
    getDishes (context, data) {
      return MenuService.getDishes(data.idMarker)
    },
    setToken (context, token) {
      context.state.logeado = true
      AuthService.setToken(token)
    },
    putOrder (context, data) {
      return MenuService.putOrder(data)
    },
    getMyOrders () {
      return MenuService.getMyOrders()
    },
    searchChefs (context, query) {
      return MapService.searchChefs(query)
    }

  },
  getters: {
    getChefs: state => {
      return state.chefs.filter(item => {
        return item
      })
    }
  }
})
