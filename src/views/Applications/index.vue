<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Applications</h1>
      <button
        type="button"
        class="btn btn-primary"
        @click="$store.dispatch('ui/setPeek', { page: 'application.new' })"
      >
        New Application
      </button>
    </div>
    <div v-if="applications && applications.length" class="container-fluid table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th colspan="2">User</th>
            <th>Type</th>
            <th class="d-none d-sm-table-cell">Status</th>
          </tr>
        </thead>
        <tbody>
          <app-row
            v-for="app in applications"
            :key="app.id"
            :app="app"
            class="clickable"
            @click.native="$store.dispatch('ui/setPeek', { page: 'application.review', data: {app} })"
          />
        </tbody>
      </table>
    </div>
    <div v-else-if="applications && !applications.length" class="text-center">
      Could not find any applications :(
    </div>
    <div v-else class="text-center">
      <spinner />
    </div>
  </div>
</template>
<script>
import appRow from './application-row.vue'
import spinner from '@/spinner'

export default {
  components: { appRow, spinner },
  computed: {
    applications () {
      return this.$store.state.applications.applications
    }
  },
  created () {
    this.$store.dispatch('applications/getApplications')
    this.$store.dispatch('applications/getTypes')
  }
}
</script>
