<template>
  <span>
    <span
      v-for="role in sortedRoles"
      :key="`${role.guild.id}-${role.name}`"
      :title="role.guild.name"
      :class="`${float ? 'float-right' : ''} ${role.tag}`"
      class="badge badge-secondary mr-1"
    >
      {{ role.name }}
    </span>
  </span>
</template>
<script>
export default {
  props: {
    roles: Array,
    float: Boolean
  },
  computed: {
    sortedRoles () {
      let roles = [...this.roles]
      if (!roles.length) return []

      roles = roles.sort((a, b) => a.level - b.level)
      return roles
    }
  }
}
</script>
<style lang="stylus" scoped>
  $lightenAmount = 75
  $darkenAmount = 25

  .clan_member
    $color = #667fff
    color lighten($color, $lightenAmount)
    background-color $color
  .clan_leader
    $color = #3556ff
    color lighten($color, $lightenAmount)
    background-color $color
  .vip
    $color = #f47fff
    color lighten($color, $lightenAmount)
    background-color $color
  .admin
    $color = rgb(231, 76, 60)
    color lighten($color, $lightenAmount)
    background-color $color
  .manager
    $color = rgb(155, 89, 182)
    color lighten($color, $lightenAmount)
    background-color $color
  .owner
    $color = rgb(241, 196, 15)
    color darken($color, $darkenAmount)
    background-color $color
</style>
