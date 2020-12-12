<template>
  <tr>
    <td colspan="2">
      <span class="cursor-pointer" @click="$store.dispatch('ui/setPeek', { page: 'user', data: { userId: app.User.id } })">
        <img class="rounded-circle d-none d-sm-inline" width="42px" :src="app.User | avatarUrl">
        <span class="mr-2 ml-2 text-gray-600">{{app.User ? app.User.tag : app.UserId}}</span>
        <span v-if="app.User.banned" class="badge badge-danger float-right d-none d-sm-inline">Banned</span>
        <span v-else-if="app.User.leftServer" class="badge badge-light float-right d-none d-sm-inline">Left Server</span>
        <span v-if="app.User.bot" class="badge badge-primary float-right mr-1 d-none d-sm-inline">BOT</span>
        <span v-if="app.User.clanMember" class="badge badge-info float-right mr-1 d-none d-sm-inline">Clan Member</span>
        <span v-if="app.User.vip" class="badge badge-dark float-right mr-1 d-none d-sm-inline">VIP</span>
      </span>
    </td>
    <td>{{app.ApplicationType.name}}</td>
    <td class="d-none d-sm-table-cell">{{app.status | status}}</td>
  </tr>
</template>
<script>
export default {
  filters: {
    status (status) {
      switch (status) {
        case 1:
          return 'Accepted'
        case 0:
          return 'Denied'
        case -1:
          return 'Pending'
        default:
          return status
      }
    },
    avatarUrl (user) {
      const cdn = `https://cdn.discordapp.com/`
      if (user.avatar) return `${cdn}avatars/${user.id}/${user.avatar}.jpg`
      return `${cdn}embed/avatars/${user.discriminator % 5}.png`
    }
  },
  props: {
    app: {
      required: true,
      type: Object
    }
  }
}
</script>
