import Service from './Service'

class AuthService extends Service {
  constructor () {
    super()
    let test = 'Msg test'
  }

  login (email = '', pass = '') {
    if (email && pass) {
      return firebase.auth().signInWithEmailAndPassword(email, pass).catch(function (error) {
        return Promise.reject(error)
      })
    }
  }

  async logout () {
    let token
    await Service.$store(e => {
      token = e.state.refreshToken
    })
    return this.request({
      url: 'auth/logout',
      method: 'post',
      body: {},
      headers: new Headers({ 'authorization': 'Bearer ' + token })
    })
  }
}

export default new AuthService()
