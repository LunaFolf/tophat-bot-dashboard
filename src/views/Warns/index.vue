<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Warns</h1>
    </div>
    <div v-if="warns.length" class="container-fluid table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th colspan="2">User</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <warn-row v-for="warn in warns" :key="warn.id" :warn="warn" />
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <spinner />
    </div>
  </div>
</template>
<script>
import { get } from '@/api/warns'
import warnRow from './warn-row.vue'
import spinner from '@/components/spinner'
import User from '@/store/models/user.js'

export default {
  components: { spinner, warnRow },
  data () {
    return {
      warns: []
    }
  },
  created () {
    get().then(res => {
      this.warns = res.data.warns
      var users = []
      res.data.warns.forEach(warn => {
        if (!users.includes(warn.User)) users.push(warn.User)
      })
      User.insert({
        data: users
      })
    })
  }
}
</script>
