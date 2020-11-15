<template>
    <!-- Sidebar -->
  <ul class="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
          <img alt="Jax logo" src="../assets/spinner-title.png" height="56px">
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item active">
          <a class="nav-link" href="/">
              <i class="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
          Database
      </div>

      <li class="nav-item">
          <a class="nav-link" @click="$router.push({name:'Warns'})">
              <i class="fas fa-file-exclamation"></i>
              <span>Warns</span>
          </a>
      </li>

      <li class="nav-item">
          <a class="nav-link">
              <i class="fas fa-users"></i>
              <span>Users</span>
          </a>
      </li>

      <li class="nav-item">
          <a class="nav-link">
              <i class="fas fa-folder-tree"></i>
              <span>Applications</span>
          </a>
      </li>

      <hr class="sidebar-divider">

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