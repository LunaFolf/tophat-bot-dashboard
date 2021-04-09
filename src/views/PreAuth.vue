<template>
  <div class="login-screen">
    <div class="center">
      <img alt="Jax logo" src="../assets/spinner-title.png" height="112px">
      <a :href="`${discordOAuth.urlBase}?client_id=${discordOAuth.clientId}&redirect_uri=${discordOAuth.redirectUrl}&response_type=code&scope=identify%20guilds`">
        <div class="list-group list-grouo-flush">
          <div class="list-group-item">
            <span class="text-gray-600 small">Log in with Discord</span>
            <img src="../assets/img/discord_logo_colour.svg" width="56px">
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Login',
  data () {
    return {
      discordOAuth: {
        urlBase: 'https://discord.com/api/oauth2/authorize',
        clientId: '711948797017718804',
        redirectUrl: encodeURIComponent(window.location.origin + (this.$router.mode === 'hash' ? '/#/' : '/') + 'oauth2/discord')
      }
    }
  }
}
</script>
<style scoped>
  .login-screen {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(to bottom right, #209cff, #68e0cf);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-align: center;
  }
  .center * {
    margin: 16px;
  }

  a, a:hover {
    text-decoration: none;
  }
</style>
