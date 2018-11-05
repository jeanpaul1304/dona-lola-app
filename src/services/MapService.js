import Service from './Service'
import AuthService from "./AuthService"

class MapService extends Service {
  constructor () {
    super()
  }

  getMarkers () {
    return this.request({
      url: 'https://api.donalolafood.com/api/foodPlace/listNearby',
      body: {
        "latitude": -12.089433,
        "longitude": -77.0228733,
        "radius": 1000
      }
    })
  }

  searchChefs (query) {
    return this.request({
      url: 'https://api.donalolafood.com/api/foodPlace/by/name',
      method: 'POST',
      body: {
        'name': query
      }
    })
  }
}

export default new MapService()
