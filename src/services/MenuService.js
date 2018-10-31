import Service from './Service'
import AuthService from "./AuthService"

class MenuService extends Service {
  constructor () {
    super()
  }

  getDishes (id) {
    return this.request({
      url: 'https://api.donalolafood.com/api/food-menu/local/' + id,
      method: 'GET',
      body: {
        "idLocal ": id
      }
    })
  }
  putOrder (data) {
    return this.request({
     url: 'https://api.donalolafood.com/api/orders/add',
     method: 'POST',
     body: data
    })
  }
}

export default new MenuService()
