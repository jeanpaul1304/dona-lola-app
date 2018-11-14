<template>
    <v-container fluid class="bg">
        <v-form class="login-ctn">
            <h1 class="title-ctn">
                <img src="../assets/img/logotipo.jpg" alt="dona lola">
            </h1>
            <v-form v-if="currentForm == 'login'" class="ctn-login">
                <v-text-field
                  v-validate="'required|email'"
                  prepend-icon="account_circle"
                  :error-messages="errors.collect('email')"
                  v-model="email"
                  label="E-mail"
                  data-vv-name="email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  prepend-icon="lock"
                  :append-icon="show1 ? 'visibility_off' : 'visibility'"
                  v-validate="'required'"
                  :error-messages="errors.collect('password')"
                  :type="show1 ? 'text' : 'password'"
                  name="password"
                  label="Password"
                  @click:append="show1 = !show1"
                ></v-text-field>
                <p v-if="error">{{error}}</p>
                <v-flex xs12 sm12 text-center style="margin-bottom:10px;">
                    <v-btn
                        style="color:#fff"
                        color="teal"
                        @click="submit"
                    >
                        INICIAR SESION
                    </v-btn> <br>
                    <a href="#" @click="currentForm = 'registration'" style="color:#42A5F5;text-decoration: none;"><b>Crea tu usuario</b></a> <br>
                    <a href="#" @click="currentForm = 'forgotPass'" style="color:#42A5F5;text-decoration: none;">Olvide mi contraseña</a>
                </v-flex>
            </v-form>
          <registration v-if="currentForm == 'registration'" @return="currentForm = 'login'"> </registration>
          <v-form v-if="currentForm == 'forgotPass'" class="ctn-login">
            <v-text-field
              v-validate="'required|email'"
              prepend-icon="account_circle"
              :error-messages="errors.collect('email')"
              v-model="emailRecover"
              label="E-mail"
              data-vv-name="email"
              required
            ></v-text-field>
            <v-flex xs12 sm6 text-center style="margin-bottom:10px;">
              <v-btn
                style="color:#fff"
                color="teal"
                @click="recoverPass"
              >
                Reestablecer password
              </v-btn> <br>
              <p v-if="textEmail">{{this.textEmail}}</p>
              <a href="#" @click="currentForm = 'login'" style="color:#42A5F5;text-decoration: none;"><b>ATRAS</b></a>
            </v-flex>
          </v-form>
        </v-form>
    </v-container>
</template>
<script>
import { mapActions } from 'vuex'
import registration from '../components/Registration'
export default {
  name: 'Login',
  components: {
    registration
  },
  data () {
    return {
      response: '',
      password: '123456',
      email: 'jeanpaul1304@gmail.com',
      show1: false,
      dictionary: {
        custom: {
          email: {
            required: 'Ingrese su correo',
            email: 'Ingrese un email valido'
          },
          password: {
            required: 'Ingrese su contraseña'
          }
        }
      },
      currentForm: 'login',
      error: '',
      textEmail: '',
      emailRecover: ''
    }
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
    this.setLoader(true)
  },
  methods: {
    submit () {
      // this.$validator.validateAll()
      let email = this.email
      let password = this.password
      this.error = ''
      this.login({ email, password }).then((data) => {
        firebase.auth().currentUser.getIdToken().then((data) => {
          this.setToken(data)
          this.$router.push('home')
        })
      }).catch((error) => {
        this.error = 'Ingrese credenciales validas'
        return error
      })
    },
    recoverPass () {
      firebase.auth().sendPasswordResetEmail(this.emailRecover).then(() => {
        this.textEmail = 'Se envió el correo de recuperación'
      }).catch((error) => {
        this.textAlign = error.message
      })
    },
    ...mapActions([
      'login',
      'setToken',
      'setLoader'
    ])
  }
}

</script>

<style lang="stylus">
  .bg
    padding 0
  .login-ctn
    background url('../assets/img/bg.jpg')
    padding-top 10vh
    position: absolute
    height: 100%
    width: 100vw
    left: 0
    right: 0
    background-size: cover
    padding-top: 9vh
    padding-bottom: 4vh
    overflow: auto
  .title-ctn
    text-align center
    display inline-block
    width 100%
    height auto
    img
      width 125px
      border-radius 5px
      overflow hidden
      padding 10px
      background #fff
  .ctn-login
    background rgba(255, 255, 255, .8)
    border-radius 10px
    width 90%
    margin 0 auto
    padding 22px 12px 2px 12px
  .text-center
    text-align center
    .login-link
      line-height 1.5
      display inline-block
      &.first
        margin-top 15px

</style>
