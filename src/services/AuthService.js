import Service from './Service'

class AuthService extends Service {
  constructor() {
    super()
  }

  login({
          email = '',
          pass = ''
        }) {
    if (email && pass) {
      console.log('here')
      firebase.auth().signInWithEmailAndPassword(user, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      })
    }
  }

  async logout() {
    let token
    await Service.$store(e => {
      token = e.state.refreshToken
    })
    return this.request({
      url: 'auth/logout',
      method: 'post',
      body: {},
      headers: new Headers({'authorization': 'Bearer ' + token})
    })
  }
}

export default new AuthService()
