<template>
    <!-- Sidebar -->
  <ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <router-link class="sidebar-brand d-flex align-items-center justify-content-center clickable" :to="{name:'Dashboard'}">
          <img alt="Jax logo" src="../assets/spinner-title.png" height="56px">
      </router-link>

      <span v-for="(section, sectionKey) in sections" :key="'section-' + sectionKey">
        <template v-if="!section.requiresAuth || auth.access_token">
        <hr v-if="sectionKey < 1" class="sidebar-divider my-0">

        <div v-if="section.title" class="sidebar-heading">
          {{section.title}}
        </div>

          <template
            v-for="(link, linkKey) in section.links"
          >
            <li
              v-if="link.permission ? hasPermission(link.permission) : true"
              :key="'section-' + sectionKey + '-link-' + linkKey"
              :class="{active: $route.name === link.name}"
              class="nav-item"
              >
              <router-link class="nav-link" :to="{name:link.name}">
                  <i :class="`${link.icon}`"></i>
                  <span>{{link.name}}</span>
              </router-link>
            </li>
          </template>

        <hr class="sidebar-divider">
        </template>
      </span>

      <!-- Sidebar Toggler (Sidebar) -->
      <div v-if="auth.access_token" class="text-center">
          <button class="rounded-circle border-0 rounded-btn" title="Sign out" @click="signout">
              <i class="fas fa-sign-out-alt"></i>
          </button>
      </div>

  </ul>
  <!-- End of Sidebar -->
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      sections: [
        {
          links: [
            { name: 'Dashboard', icon: 'fas fa-tachometer-alt' }
          ]
        },
        {
          title: 'Database',
          requiresAuth: true,
          links: [
            { name: 'Users', icon: 'far fa-users' },
            { name: 'Applications', icon: 'far fa-folder', permission: 'application.index' },
            { name: 'Warns', icon: this.$store.state.authentication.id === '443539243235672066' ? 'fal fa-hand-middle-finger' : 'far fa-exclamation-circle', permission: 'warn.index' },
            { name: 'Bans', icon: 'far fa-ban', permission: 'ban.index' }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      auth: 'authentication/authentication'
    })
  },
  methods: {
    hasPermission(permission) {
      return this.auth.permissions.includes(permission)
    },
    signout () {
      this.$store.dispatch('authentication/logout')
    }
  }
}
</script>
<style style="stylus">
.sidebar {
  background-image: linear-gradient(to bottom right, #209cffee, #68e0cfdd)
}
.rounded-btn {
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}
.nav-link {
  cursor: pointer;
}
</style>
