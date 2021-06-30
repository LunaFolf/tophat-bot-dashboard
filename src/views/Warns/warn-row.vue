<template>
  <tr>
    <td colspan="2">
      <span class="cursor-pointer" @click="$store.dispatch('ui/setPeek', { page: 'user', data: { userId: user.id } })">
        <img class="rounded-circle" width="42px" :src="avatar.custom" @error="fallbackAvatar">
        <span class="mr-2 ml-2 text-gray-600">{{user.name}}</span>
        <user-role-tags :roles="user.roles" float />
        <span v-if="user.banned" class="badge badge-danger float-right">Banned</span>
        <span v-else-if="user.leftServer" class="badge badge-light float-right">Left Server</span>
        <!-- <span v-if="user.bot" class="badge badge-primary float-right mr-1">BOT</span>
        <span v-if="user.clanMember" class="badge badge-info float-right mr-1">Clan Member</span>
        <span v-if="user.vip" class="badge badge-dark float-right mr-1">VIP</span> -->
      </span>
    </td>
    <td>{{warn.reason}}</td>
  </tr>
</template>
<script>
import UserRoleTags from 'components/userRoleTags'
import { DateTime } from 'luxon'

export default {
  components: {UserRoleTags},
  filters: {
    date (date) {
      return DateTime.fromISO(date).toISODate()
    }
  },
  props: {
    warn: {
      required: true,
      type: Object
    }
  },
  computed: {
    avatar () {
      const cdn = `https://cdn.discordapp.com/`
      return {
        custom: `${cdn}avatars/${this.warn.User.id}/${this.warn.User.avatar}.jpg`,
        fallback: `${cdn}embed/avatars/${this.warn.User.discriminator % 5}.png`
      }
    },
    user () {
      return this.$store.getters['entities/users/find'](this.warn.UserId)
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
