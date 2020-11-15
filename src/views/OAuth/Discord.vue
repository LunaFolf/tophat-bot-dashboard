<template>
  <loading-screen message="Authorizing Discord Token..." />
</template>
<script>
import loadingScreen from '@/components/loadingScreen.vue';
import axios from 'axios';
import { DateTime } from 'luxon';

export default {
  components: { loadingScreen },
  beforeRouteEnter (to, from, next) {
    const discordAuthCode = to.query.code
    if (!discordAuthCode) {
      next({ name: 'Dashboard' })
    }
    next()
  },
  created () {
    const formData = new FormData();
    formData.append('client_id', process.env.VUE_APP_discord_client_id)
    formData.append('client_secret', process.env.VUE_APP_discord_client_secret)
    formData.append('code', this.$route.query.code)
    formData.append('scope', 'identify guilds')
    formData.append('grant_type', 'authorization_code')
    formData.append('redirect_uri', window.location.origin + (this.$router.mode === 'hash' ? '/#/' : '/') + 'oauth2/discord')

    axios.post('https://discord.com/api/v8/oauth2/token', formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }).then(res => {
      var expiryDate = DateTime.local()
      this.$store.dispatch('authentication/saveToken', {
        token: res.data.access_token,
        expiry: expiryDate.plus({ seconds: res.data.expires_in }).toISO()
      })

      this.$router.push({ name: 'Login' })
    })
  }
}
</script>