<template>
  <loading-screen message="Logging into Discord Account..." />
</template>
<script>
import loadingScreen from '@/loadingScreen'
import { auth } from '../api/auth'

export default {
  components: { loadingScreen },
  created() {
    auth().then(res => {
      this.$store.dispatch("authentication/saveUser", res.data.user)
      this.$router.push({ name: 'Dashboard' })
    })
  }
}
</script>
