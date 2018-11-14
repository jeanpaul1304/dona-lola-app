import Service from './Service'

class MapService extends Service {
  getMarkers () {
    return this.request({
      url: 'https://api.donalolafood.com/api/chef/nearby',
      method: 'POST',
      body: {
        'latitude': -12.089433,
        'longitude': -77.0228733,
        'radius': 5000
      }
    })
  }

  searchChefs (query) {
    return this.request({
      url: 'https://api.donalolafood.com/api/chef/by/name',
      method: 'POST',
      body: {
        'name': query
      }
    })
  }
}

export default new MapService()
