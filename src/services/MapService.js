import Service from './Service'
import AuthService from "./AuthService"

class MapService extends Service {
  constructor () {
    super()
  }

  getMarkers () {
    return this.request({
      url: 'http://apidonaloladev.us-east-1.elasticbeanstalk.com/api/foodPlace/listNearby',
      body: {
        'latitude': -12.082988,
        'longitude': -77.0235867,
        'radius': 100000000
      }
    })
  }
}

export default new MapService()
