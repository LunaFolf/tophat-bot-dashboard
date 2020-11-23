<template>
  <div>
    <div class="text-center mb-2">
      <h1 class="h1 mb-0 text-gray-800">Query for: <span class="font-weight-lighter font-italic">{{ query }}</span></h1>
    </div>
    <div v-if="!searching && data">
      <div class="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 class="h5 mb-0 text-gray-800">Users</h1>
      </div>
      <div v-if="data.users.length" class="table-responsive mb-2">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            <user-result v-for="user in data.users" :key="'user-result-' + user.id" :user="getUser(user.id)" />
          </tbody>
        </table>
      </div>
      <no-results v-else />

      <div class="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 class="h5 mb-0 text-gray-800">Applications</h1>
      </div>
      <div v-if="data.applications.length" class="row no-gutters mb-2">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Application ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <application-result
              v-for="app in data.applications"
              :key="'application-result-' + app.id"
              :application="app"
              :user="getUser(app.UserId)"
            />
          </tbody>
        </table>
      </div>
      <no-results v-else />

      <div class="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 class="h5 mb-0 text-gray-800">Warns</h1>
      </div>
      <div v-if="data.warns.length" class="table-responsive mb-2">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <warn-result v-for="warn in data.warns" :key="'warn-result-' + warn.id" :warn="warn" :user="getUser(warn.UserId)" />
          </tbody>
        </table>
      </div>
      <no-results v-else />

      <div class="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 class="h5 mb-0 text-gray-800">Bans</h1>
      </div>
      <div v-if="data.bans.length" class="table-responsive mb-2">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <ban-result v-for="ban in data.bans" :key="'ban-result-' + ban.id" :ban="ban" :user="getUser(ban.UserId)" />
          </tbody>
        </table>
      </div>
      <no-results v-else />

    </div>
    <div class="text-center" v-else-if="searching">
      <spinner />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import User from '../../store/models/user.js'

import userResult from './user.vue'
import warnResult from './warn.vue'
import banResult from './ban.vue'
import applicationResult from './application.vue'
import noResults from '@/components/noResults.vue'
import spinner from '@/components/spinner.vue'

export default {
  components: {
    userResult,
    warnResult,
    banResult,
    applicationResult,
    noResults,
    spinner
  },
  computed: {
    ...mapGetters({
      query: 'search/query',
      results: 'search/results',
      searching: 'search/searching'
    }),
    data () {
      return this.$store.state.search.results || {
        applications: [],
        users: [],
        warns: [],
        bans: []
      }
    }
  },
  created () {
    this.search()
  },
  watch: {
    query () {
      this.search()
    }
  },
  methods: {
    search () {
      this.$store.dispatch('search/search')
    },
    getUser (id) {
      if (!id) return null
      return User.find(id)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('search/setQuery', null)
    next()
  }
}
</script>
