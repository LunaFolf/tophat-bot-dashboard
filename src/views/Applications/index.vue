<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Applications</h1>
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
          <app-row v-for="app in applications" :key="app.id" :app="app" />
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <spinner />
    </div>
  </div>
</template>
<script>
import { get } from '../../api/applications'
import appRow from './application-row.vue'
import spinner from '@/spinner'

export default {
  components: { appRow, spinner },
  data () {
    return {
      applications: []
    }
  },
  created () {
    get().then(res => {
      this.applications = res.data.applications
    })
  }
}
</script>
