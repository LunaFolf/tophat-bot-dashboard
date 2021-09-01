<template>
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Users</h1>
    </div>
    <div>
      {{ filteredUsers.length }} User(s)
    </div>
    <div class="d-sm-flex mb-4">
      <button
        v-for="option in availableRoles"
        :key="option"
        class="btn mr-2 text-capitalize"
        :class="activeFilters.includes(option) ? 'btn-primary' : 'btn-secondary'"
        @click="toggleFilter(option)"
      >
        {{ option }}
      </button>
    </div>
    <div v-if="users && users.length" class="container-fluid table-responsive">
      <table class="table table-hover">
        <tbody>
          <user-row v-for="user in filteredUsers" :key="user.id" :user="user" />
        </tbody>
      </table>
    </div>
    <div v-else class="text-center">
      <spinner />
    </div>
  </div>
</template>
<script>
import { get } from '../../api/users'
import User from '../../store/models/user.js'
import userRow from './user-row.vue'
import spinner from '@/spinner'

export default {
  components: { userRow, spinner },
  data () {
    return {
      availableRoles: [],
      activeFilters: []
    }
  },
  computed: {
    users () {
      const users = User.query()
        .orderBy('leftServer', 'asc')
        .orderBy('bot', 'asc')

        .orderBy('roleLevel', 'desc')
        .orderBy('createdAt', 'asc')
        .get()

        users.forEach(user => {
          user.roles.forEach(role => {
            if (!this.availableRoles.includes(role.name)) this.availableRoles.push(role.name)
          })
        })

        return users
    },
    filteredUsers () {
      return this.users.filter(user => {
        if (this.activeFilters.length < 1) return true

        return user.roles.filter(role => this.activeFilters.includes(role.name)).length
      })
    }
  },
  watch: {
    filters () {
      this.updateUserList()
    }
  },
  methods: {
    updateUserList () {
      get(null, this.filters).then(res => {
        this.users = res.data.users
        User.deleteAll()
        User.insert({
          data: res.data.users
        })
      })
    },
    toggleFilter(option) {
      if (this.activeFilters.includes(option)) {
        const pos = this.activeFilters.indexOf(option)
        if (pos > -1) this.activeFilters.splice(pos, 1)
      }
      else this.activeFilters.push(option)
    }
  },
  created () {
    this.updateUserList()
  }
}
</script>
