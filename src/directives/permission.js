// src/directives/permission.js
import useStore from 'store'
export default {
  name: 'permission',
  mounted(el, binding) {
    const requiredPermissions = binding.value
    const userPermissions = getUserPermissions()

    if (!hasPermission(requiredPermissions, userPermissions)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

function hasPermission(requiredPermissions, userPermissions) {
  if (!Array.isArray(requiredPermissions)) requiredPermissions = [requiredPermissions]
  return requiredPermissions.some((permission) => userPermissions.includes(permission))
}

function getUserPermissions() {
  const { user } = useStore()
  // console.log(user?.permissions)
  const test = ['dashboard:analysis']
  return test ?? user?.permissions ?? []
}
