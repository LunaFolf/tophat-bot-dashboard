<template>
  <tr>
    <td>
      <span class="cursor-pointer" @click="$store.dispatch('ui/setPeek', { page: 'user', data: { userId: user.id } })">
        <img class="rounded-circle" width="42px" :src="user.avatarUrl">
        <span class="mr-2 ml-2 text-gray-600">{{user.name}}</span>
        <span v-if="user.banned" class="badge badge-danger float-right">Banned</span>
        <span v-else-if="user.leftServer" class="badge badge-light float-right">Left Server</span>
        <span v-if="user.bot" class="badge badge-primary float-right mr-1">BOT</span>

        <user-role-tags :roles="user.roles" float />
      </span>
    </td>
  </tr>
</template>
<script>
import UserRoleTags from 'components/userRoleTags'
import { DateTime } from 'luxon'
export default {
  components: {
    UserRoleTags
  },
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
  },
  computed: {
    sortedRoles () {
      let roles = [...this.user.roles]
      if (!roles.length) return []

      roles = roles.sort((a, b) => a.level - b.level)
      return roles
    }
  }
}
</script>
