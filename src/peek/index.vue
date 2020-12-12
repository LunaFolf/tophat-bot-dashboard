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
      <div class="peekWrapper">
        <component
          :is="layout"
          v-if="layout"
          :key="layout"
          :bind="showPeek.data"
          @close="closePeek"
          @go-back="goBack"
        />
        <button
          title="close peek"
          type="button"
          class="btn btn-primary btn-lg rounded-circle closePeek"
          @click="goBack"
          >
          <i class="fa-2x fad fa-arrow-circle-left"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    profile: () => import('./profile/index.vue'),
    user: () => import('./user/index.vue'),
    applicationNew: () => import('./application/new/index.vue'),
    applicationReview: () => import('./application/review/index.vue')
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
      if (typeof this.showPeek !== 'object') return layout
      switch (this.showPeek.page) {
        case 'profile':
          layout = 'profile'
          break
        case 'user':
          layout = 'user'
          break
        case 'application.new':
          layout = 'applicationNew'
          break
        case 'application.review':
          layout = 'applicationReview'
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
    },
    goBack () {
      this.$store.dispatch('ui/peekGoBack')
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

.closePeek
  position absolute
  left 16px
  bottom 16px
  width 64px
  height 64px
  display none!important
  i
    position absolute
    left 0
    right 0
    top calc(25% - 4px)
    bottom 0

.peek
  background-color rgba(#fafafa, 95%)
  background-image url('~assets/webb.png')
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

  .peekWrapper
    background-color rgba(#fafafa, 75%)
    width 100%
    height 100%

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
    &:not(.no-shadow)
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
      height 100%
      border-radius 100%

  .content
    .infoBox
      display block
      width 100%
      span
        display block

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
  .closePeek
    display inherit!important

@keyframes slideIn
  100%
    right 0

</style>
