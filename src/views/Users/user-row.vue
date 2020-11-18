<template>
  <tr class="clickable" @click="$router.push({ name: 'UsersView', params: { id: user.id } })">
    <td>
      <img class="rounded-circle" width="42px" :src="user.avatarUrl">
      <span class="mr-2 ml-2 text-gray-600">{{user.name}}</span>
      <span v-if="user.leftServer" class="badge badge-danger float-right">Left Server</span>
      <span v-if="user.bot" class="badge badge-primary float-right mr-1">BOT</span>
    </td>
    <td class="d-none d-xl-table-cell">
      {{ user.id }}
    </td>
  </tr>
</template>
<script>
import { DateTime } from 'luxon'
export default {
  filters: {
    date (date) {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    }
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  }
}
</script>
