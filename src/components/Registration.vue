<template>
  <v-form class="ctn-login">
    <v-btn class="fb">
      Login con Facebook
    </v-btn>
    <v-btn @click="loginGoogle" class="google">
      Login con Google
    </v-btn>
    <v-divider class="divider"></v-divider>
    <v-btn class="default">
      Login con Email
    </v-btn>
    <p v-if="error">{{error}}</p>
    <v-flex xs12 sm6 text-center style="margin-bottom:10px;">
      <a href="#" @click="currentForm = 'registration'" style="color:#42A5F5;text-decoration: none;"><b>ATRAS</b></a> <br>
    </v-flex>
  </v-form>
</template>

<script>
export default {
  name: 'Registration',
  methods: {
    loginGoogle () {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((data) => {
        firebase.auth().currentUser.getIdToken().then((data) => {
          this.setToken(data)
          // console.log(firebase.auth().userInfo().getEmail())
          let currentUser = firebase.auth().currentUser
          this.$router.push('home')
        })
      }).catch((error) => {
        this.error = 'Ingrese credenciales validas'
        return error
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.ctn-login
  text-align center
  .fb, .google, .default
    width: 60%
    color: #fff
.fb
  background #4267b2 !important
.google
  background #DB4E42 !important
.default
  background #656565 !important
.divider
  margin 15px
</style>
