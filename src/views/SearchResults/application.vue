<template>
  <tr>
    <td class="clickable" @click="$router.push({ name: 'UsersView', params: { id: user.id } })">
      <img class="rounded-circle" width="42px" :src="user.avatarUrl">
      <span class="mr-2 ml-2 text-gray-600">{{user.name}}</span>
      <span v-if="user.leftServer" class="badge badge-danger float-right">Left Server</span>
      <span v-if="user.bot" class="badge badge-primary float-right mr-1">BOT</span>
      <span v-if="user.clanMember" class="badge badge-info float-right mr-1">Clan Member</span>
      <span v-if="user.vip" class="badge badge-dark float-right mr-1">VIP</span>
    </td>
    <td :title="application.ApplicationType.description" >{{application.ApplicationType.name}}</td>
    <td>{{application.status | status}}</td>
  </tr>
</template>
<script>
export default {
  props: ['application', 'user'],
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
  }
}
</script>
