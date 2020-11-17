<template>
  <loading-screen message="Logging into Discord Account..." />
</template>
<script>
import loadingScreen from '@/components/loadingScreen'
import { getUser } from '../api/discord'

export default {
  components: { loadingScreen },
  created() {
    const auth = this.$store.getters["authentication/authentication"]
    if (!auth.access_token) {
      this.$router.push({ name: 'Dashboard' })
      return
    }
    getUser(auth.access_token).then(res => {
      this.$store.dispatch("authentication/saveUser", res.data)
      this.$router.push({ name: 'Dashboard' })
    })
  }
}
</script>
