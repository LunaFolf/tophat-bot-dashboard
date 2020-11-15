<template>
  <div>
    <div v-if="!auth.access_token" class="text-center">
      Please login
    </div>
    <div class="row" v-else-if="dashboard">

        <!-- Earnings (Monthly) Card Example -->
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

        <!-- Earnings (Monthly) Card Example -->
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

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Users
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

        <!-- Pending Requests Card Example -->
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
import axios from 'axios'
import spinner from '@/components/spinner'

export default {
  name: 'Dashboard',
  components: { spinner },
  data () {
    return {
      dashboard: null
    }
  },
  computed: {
    ...mapGetters({
      auth: 'authentication/authentication'
    })
  },
  created () {
    axios.get('https://api.jaxbot.co.uk/dashboard').then(res => {
      this.dashboard = res.data.data
    })
  }
}
</script>
