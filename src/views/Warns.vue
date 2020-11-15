<template>
  <div class="container-fluid table-responsive">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>User</th>
          <th>Reason</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody v-if="warns">
        <tr v-for="warn in warns" :key="warn.id">
          <td>{{warn.user ? warn.user.tag : warn.UserId}}</td>
          <td>{{warn.reason}}</td>
          <td>{{warn.date | date}}</td>
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
      warns: []
    }
  },
  created () {
    axios.get('https://api.jaxbot.co.uk/warns').then(res => {
      this.warns = res.data.data.warns
    })
  }
}
</script>