<template>
  <tr class="position-relative">
    <td colspan="2">
      <span class="cursor-pointer" @click="$store.dispatch('ui/setPeek', { page: 'user', data: { userId: app.User.id } })">
        <img class="rounded-circle d-none d-sm-inline" width="42px" :src="avatar.custom" @error="fallbackAvatar">
        <span class="mr-2 ml-2 text-gray-600">{{app.User ? app.User.tag : app.UserId}}</span>
        <user-role-tags :roles="user.roles" float />
        <span v-if="app.User.banned" class="badge badge-danger float-right d-none d-sm-inline">Banned</span>
        <span v-else-if="app.User.leftServer" class="badge badge-light float-right d-none d-sm-inline">Left Server</span>
      </span>
    </td>
    <div class="tags status">
      <span v-if="app.status === -1" class="badge badge-warning"><i class="fas fa-question"></i></span>
      <span v-else-if="app.status === 0" class="badge badge-danger"><i class="fas fa-times"></i></span>
      <span v-else-if="app.status === 1" class="badge badge-success"><i class="fas fa-check"></i></span>
    </div>
    <div class="tags type">
      <span v-if="app.ApplicationType.tag === 'clan.new'" class="badge badge-info"><i class="fas fa-users-crown"></i></span>
      <span v-else class="badge badge-info"><i class="fas fa-question"></i></span>
    </div>
  </tr>
</template>
<script>
import UserRoleTags from 'components/userRoleTags'
export default {
  components: {UserRoleTags},
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
  },
  computed: {
    avatar () {
      const cdn = `https://cdn.discordapp.com/`
      return {
        custom: `${cdn}avatars/${this.app.User.id}/${this.app.User.avatar}.jpg`,
        fallback: `${cdn}embed/avatars/${this.app.User.discriminator % 5}.png`
      }
    },
    user () {
      return this.$store.getters['entities/users/find'](this.app.UserId)
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
<style scoped>
.tags {
  position: absolute;
  left: -12px;
}

.status {
  top: 0;
}

.type {
  bottom: 0;
}

.tags .badge {
  width: 24px;
  height: 24px;
  margin: 4px 0;
}

.tags .badge i {
  margin-top: 50%;
  transform: translateY(-37.5%);
}
</style>
