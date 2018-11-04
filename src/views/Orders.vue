<template>
  <v-container fluid class="orders">
    <sidemenu></sidemenu>
    <h2 class="title">Pedidos en curso</h2>
    <div class="ctn-list">
      <div class="row" v-for="(order, i) in ordersList" v-bind:key="i">
        <div class="chef">
          <p v-for="(chef, o) in chefList" v-bind:key="o" v-if="chef.id == order.foodPlaceId">
            {{chef.name}}
          </p>
          <div class="items">
            <div v-for="(item, i) in order.items" v-bind:key="i">
            <span>
              {{item.itemMenuDetails.name}}
            </span>
              <span>
              {{item.itemMenuDetails.price | currency('S/')}}
            </span>
            </div>
          </div>
        </div>
        <div class="status">
          {{order.status}}
        </div>
      </div>
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
      'getChefInfo'
    ])
  },
  mounted () {
    this.getMyOrders().then((data) => {
      this.orders = data
    })
  }
}
</script>

<style lang="stylus" scoped>
.orders
  padding 0
  h2
    text-align center
    padding-top 20px
  .ctn-list
    margin-top 30px
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
</style>
