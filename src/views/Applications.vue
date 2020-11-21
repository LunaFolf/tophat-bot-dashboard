<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Applications</h1>
    </div>
    <div v-if="applications.length" class="container-fluid table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th colspan="2">User</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody v-if="applications">
          <tr v-for="app in applications" :key="app.id">
            <td colspan="2" class="clickable" @click="$router.push({ name: 'UsersView', params: { id: app.User.id } })">
              <img class="rounded-circle" width="42px" :src="app.User | avatarUrl">
              <span class="mr-2 ml-2 text-gray-600">{{app.User ? app.User.tag : app.UserId}}</span>
              <span v-if="app.User.leftServer" class="badge badge-danger float-right">Left Server</span>
              <span v-if="app.User.bot" class="badge badge-primary float-right mr-1">BOT</span>
              <span v-if="app.User.clanMember" class="badge badge-info float-right mr-1">Clan Member</span>
              <span v-if="app.User.vip" class="badge badge-dark float-right mr-1">VIP</span>
            </td>
            <td>{{app.ApplicationType.name}}</td>
            <td>{{app.status | status}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <spinner />
    </div>
  </div>
</template>
<script>
import { get } from '../api/applications'
import spinner from '@/components/spinner'

export default {
  components: { spinner },
  filters: {
    status (status) {
      switch (status) {
        case 1:
          return 'Accepted'
        case 0:
          return 'Denied'
        case -1:
          return 'In-Progress'
        default:
          return status
      }
    },
    avatarUrl (user) {
      const cdn = `https://cdn.discordapp.com/`
      if (user.avatar) return `${cdn}avatars/${user.id}/${user.avatar}.jpg`
      return `${cdn}embed/avatars/${user.discriminator % 5}.png`
    }
  },
  data () {
    return {
      applications: []
    }
  },
  created () {
    get().then(res => {
      this.applications = res.data.applications
    })
  }
}
</script>
