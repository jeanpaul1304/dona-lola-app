<template>
  <v-container fluid class="search">
    <sidemenu></sidemenu>
  </v-container>
</template>

<script>
import sidemenu from '../components/Sidemenu'
export default {
  name: 'Search',
  components: {
    sidemenu
  }
}
</script>

<style lang="stylus" scoped>
.search
  padding 0
</style>
