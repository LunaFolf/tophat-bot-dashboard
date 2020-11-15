<template>
  <div class="container-fluid">
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>User</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody v-if="applications">
        <tr v-for="app in applications" :key="app.id">
          <td>{{app.id}}</td>
          <td>{{app.user.tag}}</td>
          <td>{{app.type.name}}</td>
          <td>{{app.status | status}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'

export default {
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
    }
  },
  data () {
    return {
      applications: []
    }
  },
  created () {
    axios.get('https://api.jaxbot.co.uk/applications').then(res => {
      this.applications = res.data.data.applications
    })
  }
}
</script>