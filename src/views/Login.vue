<template>
  <loading-screen message="Logging into Discord Account..." />
</template>
<script>
import loadingScreen from '@/components/loadingScreen';
import axios from 'axios';

export default {
  components: { loadingScreen },
  created() {
    const auth = this.$store.getters["authentication/authentication"]
    if (!auth.access_token) {
      this.$router.push({ name: 'Dashboard' })
      return
    }
    axios.get('https://discord.com/api/v8/users/@me', {
      headers: { "Authorization": "Bearer " + auth.access_token }
    }).then(res => {
      this.$store.dispatch("authentication/saveUser", res.data)
      this.$router.push({ name: 'Dashboard' })
    })
  }
}
</script>