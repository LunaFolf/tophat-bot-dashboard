<template>
  <div>
    <div class="titleBar">
      <button
        class="btn btn-primary logout"
        @click="logout"
      >
        <i class="fad fa-sign-out-alt mr-2" /> Logout
      </button>
      <div class="user">
        <img
          class="img-profile rounded-circle"
          :src="avatarUrl"
        >
      </div>
    </div>
    <div class="content">
      <div class="title">
        {{ auth.username }}
      </div>
      <div class="header">
        Permissions
      </div>
      <h5>
        <span
          v-for="permission in auth.permissions"
          :key="`badge-${permission}`"
          class="badge badge-pill badge-primary mx-1 my-1"
        >
          {{ permission }}
        </span>
      </h5>
    </div>
    <div class="footer">

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
export default {
  computed: {
    ...mapGetters({
      auth: 'authentication/authentication'
    }),
    avatarUrl () {
      const cdn = `https://cdn.discordapp.com/`
      const ext = this.auth.avatar && this.auth.avatar.startsWith('a_') ? 'gif' : 'jpg'
      if (this.auth.avatar) return `${cdn}avatars/${this.auth.id}/${this.auth.avatar}.${ext}`
      return `${cdn}embed/avatars/${Number(this.auth.discriminator) % 5}.png`
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('ui/setPeek', false)
      this.$store.dispatch('authentication/logout')
    }
  }
}
</script>
<style lang="stylus" scoped>
.content
  padding 16px
</style>
