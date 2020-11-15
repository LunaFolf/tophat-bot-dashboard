<template>
  <div id="wrapper">
    <Sidebar v-show="shouldShow()" />
    <div id="content-wrapper" class="d-flex flex-column">
      <Navbar v-show="shouldShow()" />
      <div id="content">
        <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">{{ $route.name }}</h1>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue'
import Navbar from '@/components/navbar.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Navbar
  },
  data () {
    return {
      routesToFullscreen: ['Login', 'OAuthDiscord']
    }
  },
  methods: {
    shouldShow () {
      if (this.routesToFullscreen.includes(this.$route.name)) return false
      return true
    }
  }
}
</script>
<style>
@import './assets/css/sb-admin-2.css';

#content {
  padding: 16px;
  padding-top: 0px;
}
</style>