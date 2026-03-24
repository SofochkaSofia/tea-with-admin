// server/api/auth/vk/index.get.ts
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const redirectUri = `${config.baseUrl}/api/auth/vk/callback`

  const params = new URLSearchParams({
    client_id: config.vkClientId,
    redirect_uri: redirectUri,
    display: 'page',
    scope: 'email',
    response_type: 'code',
    v: '5.199'
  })

  return sendRedirect(event, `https://oauth.vk.com/authorize?${params}`)
})