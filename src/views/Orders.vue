<template>
  <v-container fluid class="orders">
    <sidemenu></sidemenu>
    <h2 class="title">Pedidos en curso</h2>
    <div class="ctn-list" v-if="ordersList.length">
      <v-flex xs12>
        <v-card :color="statusListColors[order.status] + ' lighten-1'" class="white--text"  v-for="(order, i) in ordersList" v-bind:key="i">
          <v-layout>
            <v-flex xs5>
              <v-img
                v-for="(chef, o) in chefList" v-bind:key="o" v-if="chef.id == order.foodPlaceId"
                :src="chef.image"
                height="125px"
                contain
              ></v-img>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline" v-for="(chef, o) in chefList" v-bind:key="o" v-if="chef.id == order.foodPlaceId">
                    {{chef.name}}
                  </div>

                  <ul class="list-items">
                    <li v-for="(item, i) in order.items" v-bind:key="i">
                      <span>
                        {{item.itemMenuDetails.name}}
                      </span>
                      <b>
                        {{item.itemMenuDetails.price | currency('S/')}}
                      </b>
                    </li>
                  </ul>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
          <v-divider light></v-divider>
          <v-card-actions class="pa-3">
            <b>{{statusList[order.status]}}</b>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </div>
    <div class="text-center no-items" style="margin: 0 auto; width: 90%;" v-else>
      <v-icon class="icon-off">highlight_off</v-icon>
      <br>
      Aun no tiene pedidos
    </div>
  </v-container>
</template>

<script>
import Sidemenu from '../components/Sidemenu'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'orders',
  data () {
    return {
      showSide: false,
      orders: [],
      statusListColors: {
        'OPEN': 'orange',
        'CLOSE': 'light-green',
        'CANCEL': 'blue-grey'
      },
      statusList: {
        'OPEN': 'En proceso',
        'CLOSE': 'Entregado',
        'READY_TO_DELIVERY': 'Listo para entrega',
        'CANCEL': 'Cancelado'
      },
      ...mapState([
        'chefs'
      ])
    }
  },
  computed: {
    ordersList () {
      return this.orders
    },
    chefList () {
      return this.$store.getters.getChefs
    }
  },
  components: {
    Sidemenu
  },
  methods: {
    ...mapActions([
      'getMyOrders',
      'getChefInfo',
      'setLoader'
    ])
  },
  mounted () {
    this.setLoader(true)
    this.getMyOrders().then((data) => {
      this.orders = data
      this.setLoader(false)
    })
  }
}
</script>

<style lang="stylus" scoped>
.orders
  padding 0
  .title
    padding-top 20px
    text-align center
    color #2196F3
    margin-bottom 10px
  h2
    text-align center
    padding 20px 0
  .ctn-list
    padding 0 12px
    text-align center
  .row
    font-size 0
    .chef, .items, .status
      font-size 16px
      display inline-block
    .chef
      width 80%
      .items
        width 60%
    .status
      width 20%
  >>> .v-card
    padding: 8px
    margin-bottom: 10px
  >>> .v-divider
    margin 10px 0 0 0
.headline
  text-align left
.list-items
  text-align: left
  list-style: none
  padding: 0
.pa-3
  b
    display inline-block
    width 100%
    text-align right
.no-items
  .icon-off
    font-size: 45px
    color: red
    margin-bottom: 10px
</style>
