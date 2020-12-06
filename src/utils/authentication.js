import store from 'store'

export function hasPermissions (permissions) {
  if (typeof permissions === 'string') permissions = [permissions]
  const authUser = store.state.authentication
  if (!authUser) return false
  return permissions.some(permission => {
    return authUser.permissions.includes(permission)
  })
}

export default {
  hasPermissions
}
