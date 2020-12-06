<template>
  <tr>
    <td colspan="2">
      <router-link :to="{ name: 'UsersView', params: { id: user.id } }">
        <img class="rounded-circle" width="42px" :src="user.avatarUrl">
        <span class="mr-2 ml-2 text-gray-600">{{user.name}}</span>
        <span v-if="user.leftServer" class="badge badge-danger float-right">{{ user.banned ? 'Banned' : 'Left Server' }}</span>
        <span v-if="user.bot" class="badge badge-primary float-right mr-1">BOT</span>
        <span v-if="user.clanMember" class="badge badge-info float-right mr-1">Clan Member</span>
        <span v-if="user.vip" class="badge badge-dark float-right mr-1">VIP</span>
      </router-link>
    </td>
    <td>{{ban.reason}}</td>
  </tr>
</template>
<script>
import { DateTime } from 'luxon'
import User from 'store/models/user.js'

export default {
  filters: {
    date (date) {
      return DateTime.fromISO(date).toISODate()
    }
  },
  props: {
    ban: {
      required: true,
      type: Object
    }
  },
  computed: {
    user () {
      return User.find(this.ban.UserId)
    }
  }
}
</script>
