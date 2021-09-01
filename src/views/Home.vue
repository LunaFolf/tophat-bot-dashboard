<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0">My Home</h1>
    </div>
    <div class="row justify-content-center">
      <div class="col-6 text-center">
        <img :src="image" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      image: require('assets/memes/' + Math.round(Math.random() * 12) + '.gif')
    }
  }
}
</script>
<style lang="stylus" scoped>
.cookie
  color #c3854c
  font-size 5em
</style>
