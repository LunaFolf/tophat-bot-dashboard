<template>
  <i
    v-if="value"
    title="Copy to clipboard"
    :class="classes"
    @click="copy"
  />
</template>
<script>
export default {
  data () {
    return {
      classes: [
        'copyButton',
        'fas',
        'fa-clipboard',
        'cursor-pointer'
      ]
    }
  },
  props: {
    value: {
      required: true
    }
  },
  methods: {
    copy () {
      navigator.clipboard.writeText(this.value)
      this.classes.push('copied')
      window.setTimeout(() => {
        this.classes.pop()
      }, 3000)
    }
  }
}
</script>
<style lang="stylus" scoped>
.copied::after
  content " Copied!"
</style>
