<template>
  <loading-screen message="Authorizing Discord Token..." />
</template>
<script>
import loadingScreen from '@/components/loadingScreen.vue';
import DiscordOauth2 from 'discord-oauth2';
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
    const oauth = new DiscordOauth2();
    oauth.tokenRequest({
      clientId: process.env.VUE_APP_discord_client_id,
      clientSecret: process.env.VUE_APP_discord_client_secret,
      code: this.$route.query.code,
      scope: 'identify guilds',
      grantType: 'authorization_code',

      redirectUri: window.location.origin + (this.$router.mode === 'hash' ? '/#/' : '/') + 'oauth2/discord'
    }).then(res => {
      var expiryDate = DateTime.local()
      this.$store.dispatch('authentication/saveToken', {
        token: res.access_token,
        expiry: expiryDate.plus({ seconds: res.expires_in }).toISO()
      })

      this.$router.push({ name: 'Login' })
    })
  }
}
</script>