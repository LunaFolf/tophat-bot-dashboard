<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Warns</h1>
    </div>
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
            <td>
            <img class="rounded-circle" width="42px" :src="warn.user.avatarUrl">
            <span class="mr-2 ml-2 text-gray-600">{{warn.user ? warn.user.tag : warn.UserId}}</span>
            <span v-if="warn.user.leftServer" class="badge badge-danger">Left Server</span>
            </td>
            <td>{{warn.reason}}</td>
            <td>{{warn.date | date}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { DateTime } from 'luxon'
import User from '../store/models/user.js'

export default {
  filters: {
    date (date) {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    },
    avatarUrl (user) {
      const cdn = `https://cdn.discordapp.com/`
      if (user.avatar) return `${cdn}avatars/${user.id}/${user.avatar}.jpg`
      return `${cdn}embed/avatars/${user.discriminator % 5}.png`
    }
  },
  data () {
    return {
      warns: []
    }
  },
  computed: {
    users () {
      return User.all()
    }
  },
  created () {
    axios.get('https://api.jaxbot.co.uk/warns').then(res => {
      const warns = res.data.data.warns.map(warn => {
        return {
          ...warn,
          user: this.users[warn.user.id] || warn.user
        }
      })

      console.log(this.users[warns[0].id])

      this.warns = warns
    })
  }
}
</script>
