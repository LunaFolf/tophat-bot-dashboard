<template>
  <!-- Topbar -->
  <div>
    <nav class="navbar navbar-expand navbar-light bg-white topbar static-top shadow mb-4">

      <button
        class="btn btn-link rounded-circle mr-3"
        @click="$store.dispatch('ui/toggleSidebar')"
      >
        <i
          v-if="!sidebarOpen"
          class="fa fa-bars"
        ></i>
        <i
          v-else
          class="fa fa-chevron-double-left"
        ></i>
      </button>

      <search-bar
        v-model="newSearchQuery"
        @search="search"
      />

      <!-- Topbar Navbar -->
      <ul class="navbar-nav ml-auto">

        <!-- Nav Item - User Information -->
        <li class="nav-item dropdown no-arrow">
          <template v-if="auth.access_token">
            <a
              class="nav-link dropdown-toggle"
              @click="$store.dispatch('ui/setPeek', 'profile')"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span class="mr-2 d-none d-lg-inline text-gray-600 small">{{ auth.username }}</span>
              <img
                class="img-profile rounded-circle"
                :src="avatarUrl"
              >
            </a>
          </template>
          <template v-else>
            <a
              class="nav-link"
              :href="`${discordOAuth.urlBase}?client_id=${discordOAuth.clientId}&redirect_uri=${discordOAuth.redirectUrl}&response_type=code&scope=identify%20guilds`"
            >
              <span class="mr-2 d-none d-lg-inline text-gray-600 small">Log in with Discord</span>
              <span class="mr-2 d-none d-sm-inline d-lg-none text-gray-600 small">Login</span>
              <img
                class="img-profile"
                src="../assets/img/discord_logo_colour.svg"
              >
            </a>
          </template>
        </li>

      </ul>

    </nav>
  </div>
  <!-- End of Topbar -->
</template>
<script>
import { mapGetters } from 'vuex'
import searchBar from '@/searchbar.vue'

export default {
  components: {
    searchBar
  },
  data () {
    return {
      discordOAuth: {
        urlBase: 'https://discord.com/api/oauth2/authorize',
        clientId: '711948797017718804',
        redirectUrl: encodeURIComponent(window.location.origin + (this.$router.mode === 'hash' ? '/#/' : '/') + 'oauth2/discord')
      },
      newSearchQuery: null
    }
  },
  computed: {
    ...mapGetters({
      auth: 'authentication/authentication',
      sidebarOpen: 'ui/sidebarOpen',
      searchQuery: 'search/query'
    }),
    avatarUrl () {
      const cdn = `https://cdn.discordapp.com/`
      const ext = this.auth.avatar && this.auth.avatar.startsWith('a_') ? 'gif' : 'jpg'
      if (this.auth.avatar) return `${cdn}avatars/${this.auth.id}/${this.auth.avatar}.${ext}`
      return `${cdn}embed/avatars/${Number(this.auth.discriminator) % 5}.png`
    }
  },
  watch: {
    searchQuery (val) {
      this.newSearchQuery = val
    }
  },
  methods: {
    search () {
      if (this.newSearchQuery && this.newSearchQuery.length >= 3) {
        this.$store.dispatch('search/setQuery', this.newSearchQuery)
      } else alert('Query length must be 3 characters or longer')
    }
  }
}
</script>
