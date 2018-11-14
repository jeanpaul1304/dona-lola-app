<template>
  <v-container fluid class="home">
    <sidemenu></sidemenu>
    <div id="map">
    </div>
    <div class="low-info" transition="slide-y-transition" v-show="currentMark.id ? 'show': ''">
      <v-btn fab dark icon color="red" class="close" @click="cleanCurrent">
        <v-icon>close</v-icon>
      </v-btn>
      <div class="seller">
        <div class="name">{{currentMark.name}}</div>
        <img :src="currentMark.image">
        <p>Solo para recoger en la dirección del ama de casa entre {{currentMark.openingSchedule}} y {{currentMark.closingSchedule}}</p>
        <p>{{currentMark.location.address}}, {{currentMark.location.district}}</p>
      </div>
      <div class="dish">
        <v-carousel class="carrousel" hide-delimiters interval="12000" v-if="currentDishes[0].id">
          <v-carousel-item
            v-for="(item, i) in currentDishes"
            :key="i"
            class="dish-info"
          >
            <p class="name">{{item.name}}</p>
            <div class="ctn-img">
              <img :src="item.image" alt="">
            </div>
            <div class="ctn-details">
              <p class="description">{{item.description}}</p>
              <p class="price">{{item.price | currency('S/') }}</p>
            </div>
          </v-carousel-item>
        </v-carousel>
        <div class="error" v-else style="width: 90%;margin: 24px auto;color:#fff;">
          <p>El chef seleccionado no cuenta con platos para hoy</p>
        </div>
        <v-btn small v-if="currentDishes[0].id"  @click="openOrder" color="primary">Pedir</v-btn>
      </div>
    </div>

    <v-dialog
      v-model="order"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click.native="order = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Pedido</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="order = false">Cerrar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-list three-line subheader class="seller">
            <div class="order">
              <div class="ctn-avatar">
                <v-avatar
                  :size="'20vh'"
                  color="grey lighten-4"
                >
                  <img :src="currentMark.image" alt="avatar">
                </v-avatar>
              </div>
              <div class="details">
              <div class="name">{{currentMark.name}}</div>
              <p>Solo para recoger en la dirección del ama de casa entre 12:00pm y 3:00pm</p>
              <p>{{currentMark.location.address}}</p>
            </div>
              <div class="step1" v-show="orderStep == 1">
                <div class="list-dishes">
                  <div class="dish" v-for="(item, i) in currentDishes" v-bind:key="i">
                    <div class="ctn-checkbox">
                      <v-checkbox v-model="selectedDishes" :value="item"
                      ></v-checkbox>
                    </div>
                    <div class="ctn-img">
                      <img :src="item.image" alt="">
                      <p class="price">{{item.price | currency('S/') }}</p>
                    </div>
                    <div class="ctn-details">
                      <p class="name">{{item.name}}</p>
                      <p class="description">{{item.description}}</p>
                    </div>
                  </div>
                </div>
                <div class="ctn-btns">
                  <v-btn large :disabled="!selectedDishes.length" @click="selectPayMethod" color="primary">Pedir</v-btn>
                </div>
              </div>
              <div class="step step2" v-show="orderStep == 2">
                <div class="detail-dishes">
                  <div class="ctn-detail-dishes" v-for="(item, i) in selectedDishes" v-bind:key="i">
                    <p class="name">{{item.name}}</p>
                    <p class="description">{{item.price | currency('S/')}}</p>
                  </div>
                  <div class="ctn-detail-dishes">
                    <p class="name"><b>Total</b></p>
                    <p class="description"><b>{{amountFinal | currency('S/')}}</b></p>
                  </div>
                </div>
                <div class="additional-info">
                  <h3 style="color:red;text-align: center;">¡Importante!</h3>
                  <p>{{currentMark.name}} te confirmará el pedido en máximo 10 minutos.</p>
                  <div class="ctn-pay-method">
                    <div class="method money">
                      <v-checkbox v-model="selectedPaymentMethod" value="CASH"></v-checkbox>
                      <img src="../assets/img/money.png" alt="">
                    </div>
                    <div class="method card">
                      <v-checkbox v-model="selectedPaymentMethod" value="CREDIT_CARD"></v-checkbox>
                      <img src="../assets/img/cc.png" alt="">
                    </div>
                  </div>
                </div>
                <div class="ctn-btns">
                  <v-btn large :disabled="!selectedPaymentMethod" @click="payOrder" color="primary">¡Lo quiero!</v-btn>
                </div>
              </div>
              <div class="step step3" v-show="orderStep == 3">
                <div class="detail-dishes">
                  <div class="ctn-detail-dishes" v-for="(item, i) in selectedDishes" v-bind:key="i">
                    <p class="name">{{item.name}}</p>
                    <p class="description">{{item.price | currency('S/')}}</p>
                  </div>
                  <div class="ctn-detail-dishes">
                    <p class="name"><b>Total</b></p>
                    <p class="description"><b>{{amountFinal | currency('S/')}}</b></p>
                  </div>
                </div>
                <div class="status-info">
                  <img src="../assets/img/order-status.png" alt="">
                  <p>¡{{this.currentMark.name}} recibió tu pedido!</p>
                </div>
                <div class="ctn-btns">
                  <v-btn large @click="order = false" color="primary">Volver al inicio</v-btn>
                </div>
              </div>
            </div>
          </v-list>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue2Filters from 'vue2-filters'
import { mapActions } from 'vuex'
import Sidemenu from '../components/Sidemenu'

Vue.use(Vue2Filters)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCplOQzYt_d7-3pTBkvuUuSWikVCIkWP7s'
  }
})
export default {
  name: 'Home',
  components: {
    Sidemenu
  },
  data () {
    return {
      showSide: false,
      markers: [{
        position: {
          lat: 12.09041094,
          lng: -77.02299172
        }
      }],
      currentLocation: {
        lat: 12.090410949812993,
        lng: -77.022991721078
      },
      mapOptions: {
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      },
      map: {},
      currentMark: {
        name: '',
        location: {
          address: ''
        },
        photoUrl: ''
      },
      defaultDishImage: 'https://i1.wp.com/www.foot.com/wp-content/uploads/2017/03/placeholder.gif?fit=300%2C185&ssl=1',
      currentDishes: [
        {
          image: 'https://i1.wp.com/www.foot.com/wp-content/uploads/2017/03/placeholder.gif?fit=300%2C185&ssl=1'
        }
      ],
      order: false,
      orderStep: 1,
      selectedDishes: [],
      selectedPaymentMethod: '',
      orderData: {},
      currentMenuofDay: {}
    }
  },
  computed: {
    amountFinal () {
      let a = this.selectedDishes.reduce((acu, nextVal) => {
        return acu + nextVal.price
      }, 0)
      return a
    }
  },
  watch: {
    order () {
      this.selectedDishes = []
      this.orderStep = 1
    }
  },
  mounted () {
    // debugger
    this.setLoader(true)
    this.getLocation()
  },
  methods: {
    ...mapActions([
      'getMarkers',
      'getDishes',
      'putOrder',
      'setLoader'
    ]),
    getLocation () {
      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        this.errorCallback,
        {
          maximumAge: 3000,
          timeout: 5000,
          enableHighAccuracy: true
        })
    },
    errorCallback (error) {
      console.log(error)
    },
    searchNearChefMenu () {
      this.showSide = false
    },
    searchByNameMenu () {
      this.showSide = false
    },
    myOrdersMenu () {
      this.showSide = false
      this.$router.push('orders')
    },
    configMenu () {
      this.showSide = false
    },
    showPosition (position) {
      this.currentLocation.lat = parseFloat(position.coords.latitude)
      this.currentLocation.lon = parseFloat(position.coords.longitude)
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: this.currentLocation.lat,
          lng: this.currentLocation.lon
        },
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      })
      this.showMarkers()
    },
    showMarkers () {
      this.getMarkers().then((response) => {
        let mark = {}
        for (let data of response) {
          mark = {
            LatLng: { lat: data.location.latitude, lng: data.location.longitude },
            name: data.name
          }
          this.generateMarkers(data, mark)
        }
        this.setLoader(false)
      }).catch((error) => {
        console.log(error)
        this.setLoader(false)
      })
    },
    generateMarkers (data, mark) {
      var marker = new google.maps.Marker({
        position: mark.LatLng,
        map: this.map,
        title: mark.name,
        icon: 'https://jeanpaul1304.github.io/dona-lola/dist/img/chef.png'
      })
      marker.addListener('click', (mrk) => {
        this.openInfo(data)
      })
      this.markers.push(marker)
      if (this.$route.params.chef) {
        this.openInfo(this.$route.params.chef)
      }
    },
    openInfo (data) {
      this.searchDishes(data.id)
      this.currentMark = data
      this.moveToLocation()
    },
    moveToLocation () {
      let location = this.currentMark.location
      var center = new google.maps.LatLng(location.latitude - 0.006, location.longitude)
      // using global variable:
      console.log(center)
      this.map.panTo(center)
    },
    searchDishes (idMarker) {
      this.getDishes({ idMarker }).then((response) => {
        this.currentMenuofDay = response[0]
        this.currentDishes = response[0].items
      })
      console.log('el marker consultado plato', idMarker)
    },
    cleanCurrent () {
      this.currentMark = {
        name: '',
        location: {
          address: ''
        },
        photoUrl: ''
      }
    },
    openOrder () {
      this.order = true
    },
    selectPayMethod () {
      this.orderStep = 2
    },
    payOrder () {
      this.email = firebase.auth().currentUser.email
      let items = this.selectedDishes.map((item, pos) => {
        return {
          'foodMenuId': this.currentMenuofDay.id,
          'itemMenuId': item.id,
          'quantity': 1
        }
      })
      this.orderData = {
        'comment': '',
        'foodPlaceId': this.currentMark.id,
        'items': items,
        'paymentMethod': this.selectedPaymentMethod
      }
      // this.orderStep = 3
      this.putOrder(this.orderData).then((data) => {
        this.orderStep = 3
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.order
  .ctn-pay-method
    font-size 0
    .method
      display: inline-block
      width 50%
      text-align center
      img, .v-input
        display inline-block
        vertical-align middle
  .ctn-btns
    text-align center
    margin-top 10px
  .ctn-avatar, .details
    display inline-block
    vertical-align top
  .ctn-avatar
    width 40%
    padding-top 10px
  .details
    width 59%
    padding-left: 8px
    p
      line-height 1.3em
  .name
    font-size: 17px
    font-weight: 600
  .list-dishes
    .dish
      padding 10px 0
      &:nth-child(2n)
        background aliceblue
    p
      margin 0
    .ctn-checkbox, .ctn-img, .ctn-details
      display inline-block
      vertical-align middle
    .ctn-checkbox
      width 15%
      >>> .v-input__control
        margin 0 auto
    .ctn-img
      width 35%
      text-align center
      overflow hidden
      img
        width 90%
    .ctn-details
      width 49%
      vertical-align top
  .ctn-detail-dishes
    margin-top 20px
    .name, .description
      display inline-block
      vertical-align top
    .name
      width 70%
      font-weight 400
    .description
      font-weight 600
      width 29%
      text-align right
  .status-info
    text-align: center
    margin-top 20px
    p
      font-size 1.2em
.low-info
  position: absolute
  bottom: 0
  left: 0
  width: 100%
  height: auto
  background: rgb(226, 255, 207)
  font-size 0
  padding 30px 12px 8px 12px
  box-shadow 1px -1px 8px 0px #d2d2d2
  max-height 60vh
  overflow auto
  .dish, .seller
    font-size 14px
    display inline-block
  .dish
    width 60%
    vertical-align top
    text-align center
    .error
      margin-right: 0
    .carrousel
      width: 90%
      margin: 0 auto
      height auto !important
      box-shadow none
      >>> .v-btn__content
        background: #a5a5a5
        i
          font-size 28px !important
      .v-carousel__next, .v-carousel__prev
        top: 58%
      .dish-info
        .name
          margin-bottom: 3px
        .ctn-img
          height 130px
          display: flex
          align-items: center
          overflow hidden
        >>> .v-image
          height auto !important
        .ctn-details
          margin 10px 0
          .description, .price
            display: inline-block
            vertical-align top
            line-height: 1em
            margin-bottom 0
          .description
            width 60%
            text-align left
          .price
            width 39%
            text-align right
            font-weight bold
        img
          max-width 100%
  .close
    position: absolute
    right: 0
    top 0
    width 25px
    height 25px
    i
      font-size 14px
  .seller
    width 40%
    p
      font-size 11px
    .name
      font-size 16px
      text-align center
      font-weight 600
    img
      max-width 100%
#map
  width: 100vw
  height: 100vh
.home
  padding: 0
h1, h2
  font-weight: normal
ul
  list-style-type: none
  padding: 0
li
  display: inline-block
  margin: 0 10px
a
  color: #42b983
</style>
