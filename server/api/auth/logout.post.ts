// server/api/auth/logout.post.ts
export default defineEventHandler((event) => {
  deleteCookie(event, 'admin_token', { path: '/' })
  return { success: true, message: 'Logged out successfully' }
})