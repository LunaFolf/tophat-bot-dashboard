<template>
    <!-- Topbar -->
  <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      <!-- Sidebar Toggle (Topbar) -->
      <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
          <i class="fa fa-bars"></i>
      </button>

      <!-- Topbar Navbar -->
      <ul class="navbar-nav ml-auto">

          <!-- Nav Item - User Information -->
          <li class="nav-item dropdown no-arrow">
              <template v-if="loggedIn">
                <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                    <img class="img-profile rounded-circle" src="../assets/img/undraw_profile.svg">
                </a>
              </template>
              <template v-else>
                <a class="nav-link" :href="`${discordOAuth.urlBase}?client_id=${discordOAuth.clientId}&redirect_uri=${discordOAuth.redirectUrl}&response_type=code&scope=identify`">
                  <span class="mr-2 d-none d-lg-inline text-gray-600 small">Log in with Discord</span>
                  <img class="img-profile" src="../assets/img/discord_logo_colour.svg">
                </a>
              </template>
              <!-- Dropdown - User Information -->
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown">
                  <a class="dropdown-item" href="#">
                      <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                  </a>
                  <a class="dropdown-item" href="#">
                      <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                      Settings
                  </a>
                  <a class="dropdown-item" href="#">
                      <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                      Activity Log
                  </a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                      <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                  </a>
              </div>
          </li>

      </ul>

  </nav>
  <!-- End of Topbar -->
</template>
<script>
export default {
  data () {
    return {
      loggedIn: false,
      discordOAuth: {
        urlBase: 'https://discord.com/api/oauth2/authorize',
        clientId: '711948797017718804',
        redirectUrl: encodeURIComponent(window.location.href + 'oauth2/discord')
      }
    }
  }
}
</script>