<template>
  <div>
    Discord Auth goes here
  </div>
</template>
<script>
export default {
  beforeRouteEnter (to, from, next) {
    console.log(to.query)
    console.log(to.params)
    next()
  }
}
</script>