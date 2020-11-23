<template>
  <div>
    <div class="container-fluid">
      <div v-if="user" class="card row">
        <div class="card-body row">
          <div class="col">
            <h1 class="h3 text-gray-800">
              {{ user.name }}
              <span v-if="user.bot" class="badge badge-primary mr-2">Bot</span>
              <span v-if="user.banned" class="badge badge-danger">Banned</span>
              <span v-else-if="user.leftServer" class="badge badge-light">Left Server</span>
            </h1>
            <div>
              <span class="font-weight-bold">ID: </span>
              <span>{{ user.id }}</span>
            </div>
            <div>
              <span class="font-weight-bold">Tag: </span>
              <span>{{ user.tag }}</span>
            </div>
          </div>
          <div class="col">
            <img class="rounded-circle float-right userPic" :src="user.avatarFullUrl"/>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <spinner />
      </div>
    </div>
  </div>
</template>
<script>
import User from '../../store/models/user.js'
import { get } from '../../api/users'
import spinner from '@/components/spinner'

export default {
  components: { spinner },
  computed: {
    user () {
      return User.find(this.$route.params.id)
    }
  },
  created () {
    if (!this.user) {
      get().then(res => {
        this.users = res.data.users
        User.insert({
          data: res.data.users
        })
      })
    }
  }
}
</script>
<style>
  .userPic {
    height: 100%;
  }
</style>
