import Service from './Service'
let base = 'https://api.donalolafood.com/api/'
class MenuService extends Service {
  getDishes (id) {
    return this.request({
      url: base + 'food-menu/local/' + id,
      method: 'GET',
      body: {
        'idLocal': id
      }
    })
  }
  putOrder (data) {
    return this.request({
      url: base + 'orders/add',
      method: 'POST',
      body: data
    })
  }
  getMyOrders () {
    return this.request({
      url: base + 'orders/user',
      method: 'GET'
    })
  }
}

export default new MenuService()
