<template>
  <v-container fluid class="search">
    <sidemenu></sidemenu>
    <h2 class="title">Busqueda de Chefs</h2>
    <div class="search-ctn">
      <v-text-field
        prepend-icon="fastfood"
        v-model="search"
        label="Ingrese el nombre del chef"
        required
      ></v-text-field>
      <div class="text-center">
        <v-btn color="red" class="white--text" :disabled="search == ''" @click="searchByName">Buscar</v-btn>
      </div>
      <v-divider class="divisor"></v-divider>
      <v-flex xs12 class="chefs-row" v-for="(item, i) in searchedChefs" v-if="searchedChefs.length" v-bind:key="i">
        <v-card color="blue" class="white--text">
          <v-layout row>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{item.name}}</div>
                  <div>{{item.location.address}}</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs5>
              <v-img
                :src="item.image"
                height="125px"
                contain
              ></v-img>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <v-card-actions class="pa-3 text-center">
            <v-btn @click="checkmenu(item)">Ver Menu</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <div class="nochefs" v-if="!searchedChefs.length">
        <p class="text-center">No se hay chefs para listar</p>
      </div>
    </div>
  </v-container>
</template>

<script>
import sidemenu from '../components/Sidemenu'
import { mapActions } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      search: '',
      searchedChefs: []
    }
  },
  methods: {
    searchByName () {
      this.setLoader(true)
      this.searchChefs(this.search).then((data) => {
        this.searchedChefs = data
        this.setLoader(false)
      }).catch((error) => {
        console.log(error)
        this.setLoader(false)
      })
    },
    checkmenu (data) {
      this.$router.push({
        name: 'home',
        params: {
          chef: data
        }
      })
    },
    ...mapActions([
      'searchChefs',
      'setLoader'
    ])
  },
  components: {
    sidemenu
  }
}
</script>

<style lang="stylus" scoped>
.search
  padding 0
  .title
    padding-top 20px
    text-align center
    color #2196F3
    margin-bottom 20px
  .search-ctn
    padding 12px
.divisor
  margin 20px 0
.chefs-row
  width 100%
  >>> .v-card
    padding: 8px
    margin-bottom: 10px
  >>> .v-divider
    margin 10px 0 0 0
</style>
