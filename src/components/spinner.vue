<template>
  <img v-if="white" src="../assets/spinner-white-transparent.gif" width="56px">
  <img v-else src="../assets/spinner-transparent.gif" width="56px">
</template>
<script>
export default {
  props: {
    white: {
      type: Boolean,
      default: false
    }
  }
}
</script>