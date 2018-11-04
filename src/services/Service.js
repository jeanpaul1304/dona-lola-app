const axios = require('axios')
let auth
class Service {
  endPoint = '/'
  auth = ''
  constructor () {
    axios.defaults.baseURL = 'https://api.example.com'
  }

  setTokenAuth (token) {
    auth = token
    axios.defaults.headers.common['Authorization'] = token
  }

  async request ({ url, method = 'POST', body = {} }) {
    // debugger
    return axios({
      method: method,
      url: url,
      data: body,
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    }).then((response) => response.data)
  }
}

export default Service
