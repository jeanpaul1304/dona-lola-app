<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      clipped: false,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Dona Lola',
      ...mapState([
        'showMenu'
      ])
    }
  },
  methods: {
    ...mapActions([
      'changeMenu',
      'setToken'
    ]),
    openMenu () {
      this.changeMenu(true)
    }
  },
  components: {
  },
  mounted () {
    var config = {
      apiKey: 'AIzaSyBT2R0MCritBu-VBgSlwjUMMlsolXI_H7A',
      authDomain: 'dona-lola-inc.firebaseapp.com',
      databaseURL: 'https://dona-lola-inc.firebaseio.com',
      projectId: 'dona-lola-inc',
      storageBucket: 'dona-lola-inc.appspot.com',
      messagingSenderId: '407182717123'
    }
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('ýaaaaaaaa', user)
        firebase.auth().currentUser.getIdToken().then((data) => {
          this.setToken(data)
          this.$router.push('home')
        })
      } else {
        console.log('aun no!!!')
      }
    })
  }
}
</script>
<style lang="stylus">
.menu-btn
  position absolute
  z-index 1

</style>
