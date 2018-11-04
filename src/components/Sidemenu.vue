<template>
  <div>
    <div class="menu-side" transition="slide-x-transition" v-show="showSide">
      <div class="bar">
        <v-icon class="back-menu" @click="showSide = false">keyboard_arrow_left</v-icon>
        <p>MENU</p>
      </div>
      <a href="javascript:;" @click="searchNearChefMenu" v-ripple>
        <img src="../assets/img/chefs.png" alt="chefs">
        <p>Buscar chefs cerca de ti</p>
      </a>
      <a href="javascript:;" @click="searchByNameMenu" v-ripple>
        <img src="../assets/img/nombre.png" alt="chefs">
        <p>Buscar chefs por nombre</p>
      </a>
      <a href="javascript:;" @click="myOrdersMenu" v-ripple>
        <img src="../assets/img/curso.png" alt="chefs">
        <p>Pedidos en curso</p>
      </a>
      <a href="javascript:;" @click="configMenu" v-ripple>
        <img src="../assets/img/config.png" alt="chefs">
        <p>Configuración</p>
      </a>
      <div class="text-center" style="text-align: center;">
        <v-btn big @click="closeSession" color="error">
          Cerrar sesión
        </v-btn>
      </div>
    </div>
    <v-btn fab dark small color="blue" class="menu-btn" @click="showSide = true">
      <v-icon dark>menu</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Sidemenu',
  data () {
    return {
      showSide: false
    }
  },
  methods: {
    closeSidenav () {
      this.$emit('close')
    },
    searchNearChefMenu () {
      this.$router.push('home')
    },
    searchByNameMenu () {
      this.$router.push('search')
    },
    myOrdersMenu () {
      this.$router.push('orders')
    },
    configMenu () {
      this.$router.push('config')
    },
    closeSession () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      }).catch(function(error) {
        console.log(error)
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.menu-side
  font-size 0
  height: 100vh
  position: absolute
  z-index: 2
  background: rgba(255,255,255,.9)
  .back-menu
    position: absolute
    left: 3px
    z-index: 1
    font-size: 30px
    color: #fff
  .bar
    background #F44336
    color #fff
    text-align center
    font-size 20px
    height: 46px
    display: flex
    align-self: center
    align-items: center
    justify-content: center
    box-shadow: 1px 1px 1px #999
    p
      margin: 8px
  a
    display: inline-block
    width 50%
    font-size 18px
    text-align center
    padding 18px
    color #2196f3

.menu-btn
  position absolute
</style>
