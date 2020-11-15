<template>
  <tr>
    <td class="clickable" @click="$router.push({ name: 'UsersView', params: { id: user.id } })">
      <img class="rounded-circle" width="42px" :src="user.avatarUrl">
      <span class="mr-2 ml-2 text-gray-600">{{user.name}}</span>
    </td>
    <td>{{warn.reason}}</td>
    <td>{{warn.date | date}}</td>
  </tr>
</template>
<script>
import { DateTime } from 'luxon'
import User from '../../store/models/user.js'

export default {
  filters: {
    date (date) {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    }
  },
  props: {
    warn: {
      required: true,
      type: Object
    }
  },
  computed: {
    user () {
      return User.find(this.warn.user.id)
    }
  }
}
</script>
