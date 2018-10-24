<template>
  <v-container fluid class="home">
    <GmapMap
      :center="currentLocation"
      :zoom="15"
      style="width: 100wh; height: 100vh;"
      :options="mapOptions"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </v-container>
</template>

<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { mapActions } from 'vuex'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCplOQzYt_d7-3pTBkvuUuSWikVCIkWP7s'
  }
})
export default {
  name: 'Home',
  data () {
    return {
      markers: [
        {
          location: { lat: 12.090410949812993, lng: -77.022991721078 }
        }
      ],
      currentLocation: {
        lat: 12.090410949812993,
        lng: -77.022991721078
      },
      mapOptions: {
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }
    }
  },
  mounted () {
    this.showMarkers()
    this.getLocation()
  },
  methods: {
    ...mapActions([
      'getMarkers'
    ]),
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition)
      }
    },
    showPosition (position) {
      console.log('test')
      this.currentLocation.lat = parseFloat(position.coords.latitude)
      this.currentLocation.lon = parseFloat(position.coords.longitude)
    },
    showMarkers () {
      this.getMarkers().then((data) => {
        console.log(data)
      })
    }
  }
}
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
.home {
  padding: 0;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
