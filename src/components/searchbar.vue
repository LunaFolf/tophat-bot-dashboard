<template>
  <div
    class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
    <div class="input-group">
        <input type="text" v-model="searchQuery" class="form-control bg-light border-0 small" placeholder="Search for..."
            aria-label="Search" aria-describedby="basic-addon2" @keyup.enter="search">
        <div class="input-group-append">
            <button class="btn btn-primary" type="button" @click="search">
                <i class="fas fa-search fa-sm"></i>
            </button>
        </div>
    </div>
  </div>
</template>
<script>

export default {
  props: ['value'],
  computed: {
    searchQuery: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  },
  methods: {
    search () {
      if (this.searchQuery && this.searchQuery.length >= 3) {
        this.$emit('search')
      } else alert('Query length must be 3 characters or longer')
    }
  },
}
</script>
