const axios = require('axios')

class Service {
  constructor () {
    this.customHeaders = {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}
  }

  async request ({url, method = 'get', body}) {

  }
}

export default Service
