<template>
  <div>
    <div class="container-fluid">
      <div class="card row">
        <div class="card-body">
          <h1 class="h3 mb-0 text-gray-800">{{ user.name }}</h1>
          <img class="rounded-circle float-right" width="256px" :src="user.avatarFullUrl"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import User from '../../store/models/user.js'

export default {
  computed: {
    user () {
      return User.find(this.$route.params.id)
    }
  }
}
</script>
