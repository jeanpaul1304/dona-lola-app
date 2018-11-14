<template>
  <div>
    <v-form class="ctn-login" v-if="finalForm == 'btns'">
      <!--<v-btn @click="loginFacebook" class="fb">-->
        <!--Login con Facebook-->
      <!--</v-btn>-->
      <!--<v-btn @click="loginGoogle" class="google">-->
        <!--Login con Google-->
      <!--</v-btn>-->
      <!--<v-divider class="divider"></v-divider>-->
      <v-btn class="default" @click="finalForm = 'newRegister'">
        Login con Email
      </v-btn>
      <p v-if="error">{{error}}</p>
      <v-flex xs12 sm6 text-center style="margin-bottom:10px;">
        <a href="#" @click="back2Login" style="color:#42A5F5;text-decoration: none;"><b>ATRAS</b></a> <br>
      </v-flex>
    </v-form>
    <v-form class="ctn-login" v-if="finalForm == 'newRegister'">
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
        v-validate="'required|min:6'"
        :error-messages="errors.collect('password')"
        data-vv-name="password"
        data-vv-delay="300"
        :type="show1 ? 'text' : 'password'"
        name="password"
        label="Password"
        ref="password"
        @click:append="show1 = !show1"
      ></v-text-field>

      <v-text-field
        v-model="repassword"
        prepend-icon="lock"
        :append-icon="show1 ? 'visibility_off' : 'visibility'"
        v-validate="'required|min:6|confirmed:$password'"
        :error-messages="errors.collect('password')"
        :type="show1 ? 'text' : 'password'"
        name="repassword"
        label="Validar password"
        data-vv-as="password"
        data-vv-delay="300"
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-checkbox
        v-model="checkbox"
        required
      >
        <span slot="label">
          Acepto los <a href="#" @click.prevent="flagTerms = true"> terminos y condiciones</a>
        </span>
      </v-checkbox>
      <p class="error" v-if="error">{{error}}</p>
      <v-flex xs12 sm6 text-center style="margin-bottom:10px;">
        <v-btn
          style="color:#fff"
          color="teal"
          @click="loginMail"
        >
          REGISTRAR
        </v-btn>
        <v-flex xs12 sm6 text-center style="margin-bottom:10px;">
          <a href="#" @click="finalForm = 'btns'" style="color:#42A5F5;text-decoration: none;">
            <b>ATRAS</b>
          </a>
          <br>
        </v-flex>
      </v-flex>
    </v-form>
    <terms :flag-show="flagTerms" @close="flagTerms = false"></terms>
  </div>
</template>

<script>
import Terms from './Terms'
export default {
  name: 'Registration',
  components: {
    Terms
  },
  mounted () {
    this.$validator.localize('en', this.dictionary)
  },
  data () {
    return {
      flagTerms: false,
      error: '',
      email: '',
      repassword: '',
      password: '',
      show1: false,
      dictionary: {
        custom: {
          email: {
            required: 'Ingrese su email',
            email: 'Ingrese un email valido'
          },
          password: {
            required: 'Ingrese su password',
            confirmed: 'Los passwords no coinciden',
            min: 'El password debe tener minimo 6 caracteres'
          }
        }
      },
      finalForm: 'btns',
      checkbox: false
    }
  },
  methods: {
    loginFacebook () {
      var provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((data) => {
        firebase.auth().currentUser.getIdToken().then((data) => {
          this.setToken(data)
          this.$router.push('home')
        })
      })
    },
    loginGoogle () {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then((data) => {
        firebase.auth().currentUser.getIdToken().then((data) => {
          this.setToken(data)
          this.$router.push('home')
        })
      }).catch((error) => {
        this.error = 'Ingrese credenciales validas'
        return error
      })
    },
    loginMail () {
      this.$validator.validateAll()
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
        // Handle Errors here.
        console.log(error.code)
        console.log(error.message)
        // ...
      })
    },
    back2Login () {
      console.log('retur')
      this.$emit('return')
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
