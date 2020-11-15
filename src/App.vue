<template>
  <div id="wrapper">
    <Sidebar v-show="shouldShow() && sidebarOpen" />
    <div id="content-wrapper" class="d-flex flex-column">
      <Navbar v-show="shouldShow()" />
      <div id="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue'
import Navbar from '@/components/navbar.vue'
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      sidebarOpen: 'ui/sidebarOpen'
    })
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

.clickable {
  cursor: pointer;
}
</style>