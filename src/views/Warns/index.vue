<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Warns</h1>
    </div>
    <div class="d-sm-flex mb-4">
      <button
        v-for="option in filterOptions"
        :key="option"
        class="btn mr-2 text-capitalize"
        :class="option === filter ? 'btn-primary' : 'btn-secondary'"
        @click="filter = option"
      >
        {{ option }}
      </button>
    </div>
    <div v-if="warns.length" class="container-fluid table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th colspan="2">User</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <warn-row v-for="warn in filteredWarns" :key="warn.id" :warn="warn" />
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <spinner />
    </div>
  </div>
</template>
<script>
import { DateTime } from 'luxon'
import { get } from 'api/warns'
import warnRow from './warn-row.vue'
import spinner from '@/spinner'

export default {
  components: { spinner, warnRow },
  data () {
    return {
      filterOptions: [ 'all', 'active', 'expired' ],
      filter: 'active',
      warns: []
    }
  },
  computed: {
    filteredWarns () {
      return this.warns.filter(warn => {
        if (this.filter === 'all') return true
        const now = DateTime.local()
        const expiry = DateTime.fromISO(warn.endsAt)
        const expired = expiry <= now
        if (this.filter === 'active') return !expired
        if (this.filter === 'expired') return expired
      })
    }
  },
  created () {
    get().then(res => {
      this.warns = res.data.warns
    })
  }
}
</script>
