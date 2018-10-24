import Service from './Service'

class AuthService extends Service {
  login (email = '', pass = '') {
    if (email && pass) {
      return firebase.auth().signInWithEmailAndPassword(email, pass).then((data) => {
        return data
      }).catch(function (error) {
        return Promise.reject(error)
      })
    }
  }
  setToken (token) {
    this.setTokenAuth('Bearer ' + token)
  }
}

export default new AuthService()
