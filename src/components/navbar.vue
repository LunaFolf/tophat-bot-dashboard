<template>
    <!-- Topbar -->
  <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      <!-- Sidebar Toggle (Topbar) -->
      <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
          <i class="fa fa-bars"></i>
      </button>

      <form
        class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div class="input-group">
            <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..."
                aria-label="Search" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                    <i class="fas fa-search fa-sm"></i>
                </button>
            </div>
        </div>
      </form>

      <!-- Topbar Navbar -->
      <ul class="navbar-nav ml-auto">

          <!-- Nav Item - User Information -->
          <li class="nav-item dropdown no-arrow">
              <template v-if="auth.access_token">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ auth.username }}</span>
                    <img class="img-profile rounded-circle" :src="`https://cdn.discordapp.com/avatars/${auth.id}/${auth.avatar}.jpg`">
                </a>
              </template>
              <template v-else>
                <a class="nav-link" :href="`${discordOAuth.urlBase}?client_id=${discordOAuth.clientId}&redirect_uri=${discordOAuth.redirectUrl}&response_type=code&scope=identify%20guilds`">
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small">Log in with Discord</span>
                  <img class="img-profile" src="../assets/img/discord_logo_colour.svg">
                </a>
              </template>
          </li>

      </ul>

  </nav>
  <!-- End of Topbar -->
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      discordOAuth: {
        urlBase: 'https://discord.com/api/oauth2/authorize',
        clientId: '711948797017718804',
        redirectUrl: encodeURIComponent(window.location.origin + (this.$router.mode === 'hash' ? '/#/' : '/') + 'oauth2/discord')
      }
    }
  },
  computed: {
    ...mapGetters({
      auth: 'authentication/authentication'
    })
  }
}
</script>