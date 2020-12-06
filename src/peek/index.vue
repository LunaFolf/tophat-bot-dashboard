<template>
  <div
    v-if="showPeek"
    class="peekContainer"
    @mousedown.stop="checkClose"
  >
    <div class="overlay" />
    <div
      v-if="layout"
      class="peek"
    >
      <component
        :is="layout"
        v-if="layout"
        :key="layout"
      />
    </div>
  </div>
</template>
<script>
export default {
  components: {
    profile: () => import('./profile/index.vue')
  },
  computed: {
    showPeek () {
      return this.$store.getters['ui/showPeek']
    },
    peekInfo () {
      return this.$store.getters['ui/peekInfo']
    },
    layout () {
      var layout = null
      switch (this.showPeek) {
        case 'profile':
          layout = 'profile'
          break
      }
      return layout
    }
  },
  methods: {
    checkClose (i) {
      if (i.target === this.$el) this.closePeek()
    },
    closePeek () {
      this.$store.dispatch('ui/setPeek', false)
    }
  }
}
</script>
<style lang="stylus">
.peekContainer
  z-index 9999
  position absolute
  width 100vw
  height 100vh
  left 0
  top 0
  overflow hidden
  background-color rgba(black, 0.75)


.peek
  background-color rgba(#fafafa, 95%)
  width 720px
  position absolute
  top 0
  right -720px
  height 100vh
  animation-name slideIn
  animation-duration 0.15s
  animation-fill-mode forwards
  animation-timing-function ease-out
  overflow hidden

  .title
    display inline
    font-family eurostile, sans-serif
    font-weight 400
    font-size 38px

  .titleBar
    height 70px
    padding 16px
    display flex
    align-items space-between
    justify-content space-between
    box-shadow 0 1px 8px 1px rgba(black, 0.1)
    background-color white

    .logout
      cursor pointer
      height 100%
      display inline-flex
      align-self flex-start
      align-items center
      justify-content center

    .user
      height 100%
      display inline-flex
      align-self flex-end
      align-items center
      justify-content center

    img
      width 45px
      border-radius 100%

  .header
    font-family politica, sans-serif
    font-weight 700
    margin-bottom 8px

    &:nth-child(n+2)
      margin-top 16px

  .footer
    position fixed
    bottom 0
    right 0
    padding 16px

@media only screen and (max-width 720px)
  .peek
    width 100vw
    right -100vw

@keyframes slideIn
  100%
    right 0

</style>
