<template>
    <v-container fluid class="bg">
        <div class="login-ctn">
            <h1 class="title-ctn">
                <img src="../assets/img/logo.png" alt="dona lola">
            </h1>
            <v-form class="ctn-login">
                <v-text-field
                  v-validate="'required|email'"
                  :error-messages="errors.collect('email')"
                  v-model="email"
                  label="E-mail"
                  data-vv-name="email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'visibility_off' : 'visibility'"
                  v-validate="'required'"
                  :error-messages="errors.collect('password')"
                  :type="show1 ? 'text' : 'password'"
                  name="password"
                  label="Password"
                  @click:append="show1 = !show1"
                ></v-text-field>

                <v-flex xs12 sm6 text-center>
                    <v-btn
                        @click="submit"
                    >
                        Entrar
                    </v-btn>
                  <p>-> {{this.response}}</p>
                </v-flex>
            </v-form>
        </div>
    </v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      response: '',
      password: '',
      email: '',
      show1: false,
      dictionary: {
        custom: {
          email: {
            required: 'Ingrese su correo'
          },
          password: {
            required: 'Ingrese su contraseña'
          }
        }
      }
    }
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
  },
  methods: {
    submit () {
      // this.$validator.validateAll()
      let user = 'jeanpaul1304@gmail.com'
      let pass = '123456'
      this.login(user, pass)
    }, ...mapActions([
      'login'
    ])
  }
}

</script>

<style lang="stylus" scoped>
  .bg
    padding 0
  .login-ctn
    background url('../assets/img/bg.jpg')
    position absolute
    height 100vh
    width 100vw
    left 0
    right 0
    background-size cover
    padding-top 10vh
  .title-ctn
    text-align center
    display inline-block
    width 100%
    height auto
    img
      width 125px
      border-radius 5px
      overflow hidden
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
