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
                <amplify-authenticator v-bind:authOptions="authOptions"></amplify-authenticator>
            </v-form>
        </div>
    </v-container>
</template>
<script>
const axios = require('axios')
var auth = 'eyJraWQiOiI1WWxJT2FhUVlGK1k5eCtaN2FhcHVYYnlaVUc1MmVQVXhiSWRVSnZRRVZnPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiWW5WQVVpSm5lMDJraUtZb0ExY1A1QSIsInN1YiI6ImU2MmFlYThiLTM3Y2EtNDc0Yi05ZWQ3LTg1M2YzYjA1ZWNhZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJnZW5kZXIiOiJNIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfRmRwU3hZRXFWIiwiY29nbml0bzp1c2VybmFtZSI6ImU2MmFlYThiLTM3Y2EtNDc0Yi05ZWQ3LTg1M2YzYjA1ZWNhZSIsImdpdmVuX25hbWUiOiJKdWFuIiwiYXVkIjoiN2MybTFtdDMzcHFzczQ5amI5MDEzajBqcDMiLCJldmVudF9pZCI6IjE3OTFlMDZiLWQ0MjMtMTFlOC05ODYzLTI3NTMxNDI3NjJkYyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTQwMDEwNzgyLCJwaG9uZV9udW1iZXIiOiIrNTE5NzM4NjQzOTIiLCJleHAiOjE1NDAwMTQzODIsImlhdCI6MTU0MDAxMDc4MiwiZmFtaWx5X25hbWUiOiJDcmlzYW50byIsImVtYWlsIjoiZGllZ29jcmlzYW50bzA2QGdtYWlsLmNvbSJ9.d3cqPLn5sTcToKclIQeWjTP_Vq0NtcM2aM9tLs2ZHLSFA08TI-XMN24A1XdYoyFFIUNGd-2C-tmrXrvlUnPOupg-lbrqBywW8nzwXxpFkDJEw_qGm1zgRgABxeOkD23jDsDAyFdMoXZNis2LZtv2M4olfWo9PxU_9NV1lPNfHmyQSDHgy0z5KaigGjhyJzykGHVTa34E6KE4iJfBbXRWsM9GpQeIS1HfCm2XVTs5jy1LDWTeLpfs8pXe6mGS6qV17B0Y8FP9eVi39wfZ-RWIfhunxT3N3D4Bkpw52VtziZHVBw9gpsJAjTFZcqj6U61W3v8ugEzxQXBVpys8ej6X-Q'
var endPoint = 'http://apidonaloladev.us-east-1.elasticbeanstalk.com/api/'
export default {

  name: 'Login',
  data () {
    return {
      response: '',
      password: '',
      email: '',
      show1: false,
      authOptions: {
        confirmSignInOptions: {
          header: 'This is a label at the top of the component',
          user: 'The user who is attempting to log in'
        },
        confirmSignUpOptions: {
          header: 'This is a label at the top of the component', // type: string, default: 'Confirm Sign Up', required: false
          username: 'The username of the user who is attempting to sign up' // type: string, default: username of user who completed sign up step, required: false
        },
        forgotPasswordOptions: {
          header: 'This is a label at the top of the component' // type: string, default: 'Forgot Password', required: false
        },
        signInOptions: {
          username: 'This is the default value for the username input field', // type: string, default: '' (unless user has completed signup actions), required: false
          header: 'This is a label at the top of the component' // type: string, default: 'Sign In', required: false
        },
        signOutOptions: {
          msg: 'This is a message that appears above the sign out button', // type: string, default: null
          signOutButton: 'This is a label on the signout button' // type: string, default: 'Sign Out', required: false
        },
        signUpOptions: {
          header: 'This is a label at the top of the component' // type: string, default: 'Sign Up', required: false
        }
      },
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
    console.log('as')
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + auth
    axios
      .get(endPoint + '/food-menu/local/1')
      .then(response => (this.response = response))
  },
  methods: {
    submit () {
      this.$validator.validateAll()
    }
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
