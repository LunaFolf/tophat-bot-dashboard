<template>
  <div>
    <div class="titleBar no-shadow">
      <div class="user">
        <img
          class="img-profile rounded-circle"
          :src="user.avatarFullUrl"
        >
      </div>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="$emit('close')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div v-if="user" class="content">
      <div class="title">
        {{ user.name }}
      </div>
      <div class="header m-0 mb-4">
        <span v-if="user.banned" class="badge badge-danger">Banned</span>
        <span v-else-if="user.leftServer" class="badge badge-light">Left Server</span>
        <span v-if="user.bot" class="badge badge-primary">BOT</span>
        <span v-if="user.clanMember" class="badge badge-info">Clan Member</span>
        <span v-if="user.vip" class="badge badge-dark">VIP</span>
      </div>

      <div class="infoBox">
        <span>
          <strong>Joined:</strong>&nbsp;{{ user.createdAt | date }}
        </span>
        <span>
          <strong>Discord ID:</strong>&nbsp;{{ user.id }} <clipboard :value="user.id" />
        </span>
      </div>

      <div class="header">
        Bans
      </div>
      <template v-if="canViewBans">
        <em>This information is currently unavailable</em>
      </template>
      <em v-else>You do not have permission to view this user's bans</em>

      <div class="header">
        Warns
      </div>
      <template v-if="canViewWarns">
        <em>This information is currently unavailable</em>
      </template>
      <em v-else>You do not have permission to view this user's warns</em>

      <div class="header">
        Applications
      </div>
      <template v-if="canViewApplications">
        <em>This information is currently unavailable</em>
      </template>
      <em v-else>You do not have permission to view this user's applications</em>

    </div>
    <div v-else class="text-center">
      <spinner />
    </div>
  </div>
</template>
<script>
import { DateTime } from 'luxon'
import User from '../../store/models/user.js'
import { get } from '../../api/users'
import spinner from '@/spinner'
import authentication from 'mixins/authentication'
import clipboard from '@/clipboard'

export default {
  mixins: [authentication],
  components: { spinner, clipboard },
  filters: {
    date (date) {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    }
  },
  computed: {
    user () {
      return User.find(this.$attrs.bind.userId)
    },
    userIsCurrentAuthUser () {
      return this.$store.state.authentication.id === this.user.id
    },
    canViewBans () {
      return this.userIsCurrentAuthUser
    },
    canViewWarns () {
      return this.userIsCurrentAuthUser
    },
    canViewApplications () {
      return this.userIsCurrentAuthUser
    }
  },
  created () {
    if (!this.user) {
      get().then(res => {
        User.insert({
          data: res.data.users
        })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.content
  padding 0
  padding-top 16px
  padding-left 32px

  .infoBox
    display block
    width 100%
    span
      display block

.titleBar
  height 150px
  padding 0
  padding-left 32px
  padding-top 32px
  padding-right 32px
  .close
    position relative
    width 32px
    height 32px
    *
      position absolute
      top 0
      left 0
      right 0
      bottom 0
</style>
