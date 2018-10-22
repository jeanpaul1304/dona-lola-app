import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Amplify from 'aws-amplify'
// import * as AmplifyModules from 'aws-amplify'
// import * as AmplifyVue from 'aws-amplify-vue'
import AwsExports from './aws-exports'
Amplify.configure(AwsExports)

// Vue.use(AmplifyVue.plugins.amplifyPlugin, {AmplifyModules});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
