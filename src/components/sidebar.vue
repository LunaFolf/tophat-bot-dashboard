<template>
    <!-- Sidebar -->
  <ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <router-link class="sidebar-brand d-flex align-items-center justify-content-center clickable" :to="{name:'Dashboard'}">
          <img alt="Jax logo" src="../assets/spinner-title.png" height="56px">
      </router-link>

      <span v-for="(section, sectionKey) in sections" :key="'section-' + sectionKey">
        <template v-if="(!section.requiresAuth || auth.access_token) && numberOfAvailableLinks(section.links)">
        <hr v-if="sectionKey < 1" class="sidebar-divider my-0">

        <div v-if="section.title" class="sidebar-heading">
          {{section.title}}
        </div>

          <template
            v-for="(link, linkKey) in section.links"
          >
            <li
              v-if="link.permission ? hasPermissions(link.permission) : true"
              :key="'section-' + sectionKey + '-link-' + linkKey"
              :class="{active: $route.name === link.name}"
              class="nav-item"
              >
              <router-link class="nav-link" :to="{name:link.name}">
                  <i :class="`${link.icon}`"></i>
                  <span>{{link.title}}</span>
              </router-link>
            </li>
          </template>

        <hr class="sidebar-divider">
        </template>
      </span>

  </ul>
  <!-- End of Sidebar -->
</template>
<script>
import { mapGetters } from 'vuex'
import authentication from 'mixins/authentication'

export default {
  mixins: [authentication],
  data () {
    return {
      sections: [
        {
          links: [
            { name: 'Dashboard', title: 'Dashboard', icon: 'fad fa-tachometer-alt', permission: 'can.view.admin.statistics' },
            { name: 'Home', title: 'Home', icon: 'fad fa-home' }
          ]
        },
        {
          title: 'Database',
          requiresAuth: true,
          links: [
            { name: 'Users', title: 'Users', icon: 'fad fa-users' }
          ]
        },
        {
          title: 'Admin',
          requiresAuth: true,
          links: [
            { name: 'Warns', title: 'Warns', icon: this.$store.state.authentication.id === '443539243235672066' ? 'fad fa-hand-middle-finger' : 'fad fa-exclamation-circle', permission: 'warn.index' },
            { name: 'Bans', title: 'Bans', icon: 'fad fa-ban', permission: 'ban.index' }
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
    numberOfAvailableLinks (links) {
      let count = 0
      links.forEach(link => {
        if (!link.permission || this.hasPermissions(link.permission)) count++
      })
      return count
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
