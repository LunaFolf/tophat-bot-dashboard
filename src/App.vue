<template>
  <div id="wrapper">
    <Sidebar />
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Navbar />
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sidebar.vue'
import Navbar from './components/navbar.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Navbar
  }
}
</script>