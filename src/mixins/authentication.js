import { hasPermissions } from 'utils/authentication'

export function hasPermission(permission) {
  return hasPermissions([permission])
}

export default {
  methods: {
    hasPermissions,
    hasPermission
  }
}
