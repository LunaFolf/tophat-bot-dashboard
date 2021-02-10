<template>
  <div>
    <div class="titleBar">
      <div class="title">Review Application</div>
    </div>
    <div class="content">

      <div class="title">
        {{ app.ApplicationType.description }}
      </div>

      <div
        v-if="user"
        class="card clickable"
        @click="$store.dispatch('ui/setPeek', { page: 'user', data: { userId: app.User.id } })"
      >
        <div class="card-body">
          <img class="rounded-circle" width="42px" :src="user.avatarUrl">
          <span class="mr-2 ml-2 text-gray-600">{{user.tag}}</span>
          <span v-if="user.banned" class="badge badge-danger float-right">Banned</span>
          <span v-else-if="user.leftServer" class="badge badge-light float-right">Left Server</span>
          <span v-if="user.bot" class="badge badge-primary float-right mr-1">BOT</span>
          <span v-if="user.clanMember" class="badge badge-info float-right mr-1">Clan Member</span>
          <span v-if="user.vip" class="badge badge-dark float-right mr-1">VIP</span>
        </div>
      </div>

      <hr>

      <div class="infoBox">
        <span>
          <strong>Application ID:</strong>&nbsp;{{ app.id }}
        </span>
        <span>
          <strong>Created:</strong>&nbsp;{{ app.createdAt | date }}
        </span>
      </div>

      <template v-if="hasPermission('application.review') || app.UserId === $store.state.authentication.id">

        <hr>

        <div class="header">
          Submitted Data
        </div>
        <div
          v-for="(value, key) in formData"
          class="form-group"
          :key="key"
        >
          <label :for="`${key}-preview`"> {{ key | label }} </label>
          <input class="form-control" :value="value" :id="`${key}-preview`" readonly>
          <a v-if="key === 'steamid'" target="_blank" :href="'https://steamcommunity.com/profiles/' + value">Preview steam profile</a>
        </div>

        <hr>

        <template v-if="app.status === -1 & hasPermission('application.review')">
          <div class="d-flex align-items-center">
            <button
              class="btn btn-block btn-accept"
              :class="{active: accept === true}"
              @click="accept = true"
            >
              <i class="fad fa-6x fa-check-square"></i>
            </button>
            <button
              class="btn btn-block btn-deny"
              :class="{active: accept === false}"
              @click="accept = false"
            >
              <i class="fad fa-6x fa-times-square"></i>
            </button>
          </div>

          <div v-if="accept === false" class="form-group">
            <label for="denyReason">Reason for denying the application</label>
            <textarea if="denyReason" v-model="reason" class="form-control" />
          </div>

          <div class="d-flex align-items-center">
            <button
              class="btn btn-block btn-primary"
              type="button"
              :disabled="!canSubmit"
              @click="submit"
            >
              Submit
            </button>
          </div>
        </template>

        <div v-else-if="app.status !== -1" class="infoBox">
          <span>
            <strong>Application Status:</strong>&nbsp;{{ app.status | status }}
          </span>
          <span v-if="app.status === 0">
            <strong>Reason:</strong>&nbsp;{{ app.reviewerReason }}
          </span>
          <span>
            <strong>Reviewed on:</strong>&nbsp;{{ app.updatedAt | date }}
          </span>
          <span>
            <strong>Reviewed by:</strong>&nbsp;{{ reviewer ? reviewer.tag : app.ReviewerId }}
          </span>
        </div>
      </template>

    </div>
  </div>
</template>
<script>
import { DateTime } from 'luxon'
import User from 'store/models/user.js'
import authentication from 'mixins/authentication'
import { review as reviewApplication } from 'api/applications.js'
import { get as getUser } from 'api/users.js'
// eslint-disable-next-line no-unused-vars
export default {
  mixins: [authentication],
  data () {
    return {
      accept: null,
      reason: null
    }
  },
  filters: {
    date (date) {
      return DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)
    },
    label (label) {
      return label.slice(0, 1).toUpperCase() + label.slice(1)
    },
    status (status) {
      switch (status) {
        case 1:
          return 'Accepted'
        case 0:
          return 'Denied'
        case -1:
          return 'Pending'
        default:
          return status
      }
    }
  },
  computed: {
    app () {
      return this.$attrs.bind.app
    },
    formData () {
      if (!this.app) return null
      const data = this.app.data
      return data ? JSON.parse(data) : null
    },
    user () {
      if (!this.app) return null
      return User.find(this.app.UserId)
    },
    reviewer () {
      if (!this.app) return null
      if (this.status === -1) return null
      return User.find(this.app.ReviewerId)
    },
    canSubmit () {
      if (this.accept === null) return false

      if (this.accept) return true
      else if (this.reason && this.reason.length) return true

      return false
    }
  },
  created () {
    if (!this.user) {
      getUser(this.app.UserId).then(res => {
        User.insert({
          data: res.data.user
        })
      })
    }
    if (!this.reviewer && this.app.ReviewerId) {
      getUser(this.app.ReviewerId).then(res => {
        User.insert({
          data: res.data.user
        })
      })
    }
  },
  methods: {
    submit () {
      reviewApplication(this.app.id, {
        accept: this.accept,
        reason: this.reason
      }).then(res => {
        if (res.status !== 'success') {
          this.$toast.open({
            message: res.message || res.data.status,
            type: 'error',
            position: 'top',
            duration: 10000
          })
        } else {
          this.$toast.open({
            message: 'Application review submited',
            type: 'success',
            position: 'top',
            duration: 10000
          })
        }
        this.$store.dispatch('applications/getApplications')
        this.$store.dispatch('ui/setPeek', false)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.content
  padding 16px
.title
  font-size 1.75em
</style>
