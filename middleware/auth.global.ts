// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) {
    return
  }

  if (to.path === '/admin/login') {
    return
  }

  const {  user, error } = await useFetch('/api/admin/me', {
    lazy: true,
    server: false,
    key: 'admin-user'
  })

  if (!user.value) {
    return navigateTo({
      path: '/admin/login',
      query: { redirect: to.fullPath }
    })
  }

  if (!user.value.isActive) {
    await useFetch('/api/auth/logout', { method: 'POST' })
    return navigateTo({
      path: '/admin/login',
      query: { error: 'account_disabled' }
    })
  }
})