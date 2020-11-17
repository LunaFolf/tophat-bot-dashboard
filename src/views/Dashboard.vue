<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
    </div>
    <div v-if="!auth.access_token" class="text-center">
      <div>Please login</div>
      <br>
      <a class="nav-link" :href="`${discordOAuth.urlBase}?client_id=${discordOAuth.clientId}&redirect_uri=${discordOAuth.redirectUrl}&response_type=code&scope=identify%20guilds`">
        <span class="text-gray-600 small">Log in with Discord</span>
        <img class="img-profile" src="../assets/img/discord_logo_colour.svg" width="56px">
      </a>
    </div>
    <div class="row" v-else-if="dashboard">

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-danger shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Warnings (This Month)</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ dashboard.warns_monthly }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-calendar-exclamation fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                Warnings (Total)</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ dashboard.warns_total }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-file-exclamation fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Active Users
                            </div>
                            <div class="row no-gutters align-items-center">
                                <div class="col-auto">
                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ dashboard.users }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-users fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Pending Applications</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ dashboard.applications_pending }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-file-search fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center" v-else>
      <spinner />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { get } from '../api/dashboard'
import spinner from '@/components/spinner'

export default {
  name: 'Dashboard',
  components: { spinner },
  data () {
    return {
      dashboard: null,
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
  },
  created () {
    get().then(res => {
      this.dashboard = res.data
    })
  }
}
</script>
