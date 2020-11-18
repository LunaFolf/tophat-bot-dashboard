<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Warns</h1>
    </div>
    <div class="container-fluid table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th colspan="2">User</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody v-if="warns">
          <warn-row v-for="warn in warns" :key="warn.id" :warn="warn" />
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { get } from '../../api/warns'
import warnRow from './warn-row.vue'

export default {
  components: { warnRow },
  data () {
    return {
      warns: []
    }
  },
  created () {
    get().then(res => {
      this.warns = res.data.warns
    })
  }
}
</script>
