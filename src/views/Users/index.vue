<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Users</h1>
    </div>
    <div class="container-fluid row justify-content-center">
      <div
        v-for="user in users"
        :key="'user-' + user.id"
        @click="$router.push({ name: 'UsersView', params: { id: user.id } })"
        class="card col-lg-12 col-xl-5 m-1 clickable"
      >
        <div class="card-body">
          <img class="rounded-circle" width="42px" :src="user.avatarUrl">
          <span class="mr-2 ml-2 text-gray-600">{{user.name}}</span>
          <span v-if="user.leftServer" class="badge badge-danger float-right">Left Server</span>
          <span v-if="user.bot" class="badge badge-primary float-right mr-1">BOT</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from '../../api/users'
import { DateTime } from 'luxon'
import User from '../../store/models/user.js'

export default {
  filters: {
    date (date) {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    }
  },
  computed: {
    users () {
      return User.all()
    }
  },
  created () {
    get().then(res => {
      this.users = res.data.users
      User.insert({
        data: res.data.users
      })
    })
  }
}
</script>
