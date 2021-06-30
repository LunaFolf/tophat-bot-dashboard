<template>
  <tr>
    <td colspan="2">
      <span class="cursor-pointer" @click="$store.dispatch('ui/setPeek', { page: 'user', data: { userId: user.id } })">
        <img class="rounded-circle" width="42px" :src="avatar.custom" @error="fallbackAvatar">
        <span class="mr-2 ml-2 text-gray-600">{{user.name}}</span>
        <user-role-tags :roles="user.roles" float />
        <span v-if="user.banned" class="badge badge-danger float-right">Banned</span>
        <span v-else-if="user.leftServer" class="badge badge-light float-right">Left Server</span>
      </span>
    </td>
    <td>{{ban.reason}}</td>
  </tr>
</template>
<script>
import { DateTime } from 'luxon'
import UserRoleTags from 'components/userRoleTags'
export default {
  components: {UserRoleTags},
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
    avatar () {
      const cdn = `https://cdn.discordapp.com/`
      return {
        custom: `${cdn}avatars/${this.ban.User.id}/${this.ban.User.avatar}.jpg`,
        fallback: `${cdn}embed/avatars/${this.ban.User.discriminator % 5}.png`
      }
    },
    user () {
      return this.$store.getters['entities/users/find'](this.ban.UserId)
    }
  },
  methods: {
    fallbackAvatar (err) {
      if (err.target.src === this.avatar.fallback) return
      err.target.src = this.avatar.fallback
    }
  }
}
</script>
