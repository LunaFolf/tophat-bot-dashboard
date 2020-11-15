<template>
    <!-- Sidebar -->
  <ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
          <img alt="Jax logo" src="../assets/spinner-title.png" height="56px">
      </a>

      <span v-for="(section, sectionKey) in sections" :key="'section-' + sectionKey">
        <hr v-if="sectionKey < 1" class="sidebar-divider my-0">
        
        <div v-if="section.title" class="sidebar-heading">
          {{section.title}}
        </div>

        <li v-for="(link, linkKey) in section.links" :key="'section-' + sectionKey + '-link-' + linkKey" class="nav-item">
          <a class="nav-link" @click="$router.push({name:link.name})">
              <i :class="`fas ${link.icon}`"></i>
              <span>{{link.name}}</span>
          </a>
      </li>

        <hr class="sidebar-divider">
      </span>

      <!-- Sidebar Toggler (Sidebar) -->
      <div v-if="auth.access_token" class="text-center d-none d-md-inline">
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
            { name: 'Dashboard', icon: 'fa-tachometer-alt' }
          ]
        },
        {
          title: 'Database',
          links: [
            { name: 'Warns', icon: 'fa-file-exclamation' },
            { name: 'Users', icon: 'fa-book-user' },
            { name: 'Applications', icon: 'fa-folder' }
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
    signout () {
      this.$store.dispatch('authentication/logout')
    }
  }
}
</script>
<style style="stylus">
.sidebar {
  background-image: linear-gradient(to bottom right, #209cff, #68e0cf)
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