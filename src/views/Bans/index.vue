<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Bans</h1>
    </div>
    <div v-if="bans.length" class="container-fluid table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th colspan="2">User</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <ban-row v-for="ban in bans" :key="ban.id" :ban="ban" />
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <spinner />
    </div>
  </div>
</template>
<script>
import { get } from '@/api/bans'
import banRow from './ban-row.vue'
import spinner from '@/components/spinner'
import User from '@/store/models/user.js'

export default {
  components: { spinner, banRow },
  data () {
    return {
      bans: []
    }
  },
  created () {
    get().then(res => {
      this.bans = res.data.bans
      var users = []
      res.data.bans.forEach(ban => {
        if (!users.includes(ban.User)) users.push(ban.User)
      })
      User.insert({
        data: users
      })
    })
  }
}
</script>
