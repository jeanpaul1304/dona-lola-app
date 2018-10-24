import Service from './Service'
import AuthService from "./AuthService"

class MapService extends Service {
  constructor () {
    super()
    let token = AuthService.currentUser.getIdToken().then(data => data)
  }

  getMarkers () {
    
  }
}

export default new MapService()
