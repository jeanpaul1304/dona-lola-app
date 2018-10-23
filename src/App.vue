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
    <!--<v-toolbar-->
      <!--app-->
      <!--:clipped-left="clipped"-->
    <!--&gt;-->
      <!--<v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>-->
      <!--<v-btn icon @click.stop="miniVariant = !miniVariant">-->
        <!--<v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>-->
      <!--</v-btn>-->
      <!--<v-btn icon @click.stop="clipped = !clipped">-->
        <!--<v-icon>web</v-icon>-->
      <!--</v-btn>-->
      <!--<v-btn icon @click.stop="fixed = !fixed">-->
        <!--<v-icon>web</v-icon>-->
      <!--</v-btn>-->
      <!--<v-toolbar-title v-text="title"></v-toolbar-title>-->
      <!--<v-spacer></v-spacer>-->
      <!--<v-btn icon @click.stop="rightDrawer = !rightDrawer">-->
        <!--<v-icon>menu</v-icon>-->
      <!--</v-btn>-->
    <!--</v-toolbar>-->
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Dona Lola'
    }
  },
  components: {
  },
  mounted () {
    var config = {
      apiKey: "AIzaSyBT2R0MCritBu-VBgSlwjUMMlsolXI_H7A",
      authDomain: "dona-lola-inc.firebaseapp.com",
      databaseURL: "https://dona-lola-inc.firebaseio.com",
      projectId: "dona-lola-inc",
      storageBucket: "dona-lola-inc.appspot.com",
      messagingSenderId: "407182717123"
    }
    firebase.initializeApp(config)
    let user = 'jeanpaul1304@gmail.com'
    let pass = '123456'
    firebase.auth().signInWithEmailAndPassword(user, pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    })
  }
}
</script>
