<template>
  <div class="container-fluid table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Tag</th>
        </tr>
      </thead>
      <tbody v-if="users">
        <tr v-for="user in users" :key="user.id">
          <td>{{user.id}}</td>
          <td>{{user.tag}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
import { DateTime } from 'luxon'

export default {
  filters: {
    date (date) {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    }
  },
  data () {
    return {
      users: []
    }
  },
  created () {
    axios.get('https://api.jaxbot.co.uk/users').then(res => {
      this.users = res.data.data.users
    })
  }
}
</script>