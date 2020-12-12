<template>
  <div>
    <div class="titleBar">
      <div class="title">New Application</div>
    </div>
    <div class="content">
      <div class="form-group">
        <label for="applicationTypeSelect">Select Application Type</label>
        <select v-model="selectedType" class="form-control" id="applicationTypeSelect">
          <option
            v-for="type in types"
            :key="type.tag"
            :value="type"
          >
            {{ type.name }}
          </option>
        </select>
      </div>
      <component
        v-model="data"
        :is="formToRender"
        v-if="formToRender"
        @submit="submit"
      />
    </div>
    <div class="footer">
      {{ data }}
    </div>
  </div>
</template>
<script>
import { submit as submitApplication } from 'api/applications.js'
// eslint-disable-next-line no-unused-vars
export default {
  components: {
    clan: () => import('./forms/clan.vue')
  },
  data () {
    return {
      selectedType: null,
      data: {}
    }
  },
  computed: {
    types () {
      return this.$store.state.applications.types.filter(type => type.enabled)
    },
    formToRender () {
      if (!this.selectedType) return null
      switch (this.selectedType.tag) {
        case 'clan.new':
          return 'clan'
        default:
          return null
      }
    }
  },
  methods: {
    submit () {
      submitApplication({
        type: this.selectedType.id,
        ...this.data
      }).then(() => {
        this.$store.dispatch('applications/getApplications')
        this.$store.dispatch('ui/setPeek', false)
        this.$toast.open({
          message: 'Successfully submitted Application!',
          type: 'success',
          position: 'top',
          duration: 10000
        })
      })
    }
  },
  created () {
    this.$store.dispatch('applications/getTypes')
  }
}
</script>
<style lang="stylus" scoped>
.content
  padding 16px
.title
  font-size 1.75em
</style>
