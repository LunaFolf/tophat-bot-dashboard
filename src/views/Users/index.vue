<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Users</h1>
    </div>
    <div v-if="users && users.length" class="container-fluid table-responsive">
      <table class="table table-hover">
        <thead>
          <tr class="d-none d-xl-table-row">
            <th>Name</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          <user-row v-for="user in users" :key="user.id" :user="user" />
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <spinner />
    </div>
  </div>
</template>
<script>
import { get } from '../../api/users'
import User from '../../store/models/user.js'
import userRow from './user-row.vue'
import spinner from '@/components/spinner'

export default {
  components: { userRow, spinner },
  computed: {
    users () {
      return User.query()
        .orderBy('leftServer', 'asc')
        .orderBy('bot', 'asc')
        .orderBy('createdAt', 'asc')
        .get()
    }
  },
  created () {
    get().then(res => {
      this.users = res.data.users
      User.deleteAll()
      User.insert({
        data: res.data.users
      })
    })
  }
}
</script>
