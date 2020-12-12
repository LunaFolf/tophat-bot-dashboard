<template>
  <div id="wrapper">
    <Sidebar v-show="shouldShow() && sidebarOpen" />
    <div
      id="content-wrapper"
      :class="{ dontScroll: hideOverflowY }"
      class="d-flex flex-column"
    >
      <Navbar v-show="shouldShow()" />
      <div id="content">
        <router-view/>
      </div>
    </div>
    <peek />
  </div>
</template>

<script>
import Sidebar from '@/sidebar.vue'
import Navbar from '@/navbar.vue'
import { mapGetters } from 'vuex'
import peek from 'peek'

export default {
  name: 'App',
  components: {
    peek,
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
    }),
    hideOverflowY () {
      return this.$store.getters['ui/showPeek']
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.name ? `JaxBot - ${to.name}` : 'JaxBot'
      }
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
<style lang="stylus">
@import '~styles/sb-admin-2.min.css'

.cursor-pointer
  cursor pointer

#wrapper
  background-image url('~assets/webb.png')
  max-height 100vh

#content-wrapper
  background-color rgba(255, 255, 255, 0.85)!important
  overflow-y auto

#content
  padding 16px
  padding-top 0px

.clickable
  cursor pointer

.dontScroll
  overflow-y hidden!important

.btn-accept
  color #1cc88a
.btn-deny
  color #e74a3b

.btn-accept, .btn-deny
  &:not(.active)
    color #858796

</style>
