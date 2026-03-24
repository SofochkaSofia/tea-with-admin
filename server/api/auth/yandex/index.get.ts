// server/api/auth/yandex/index.get.ts
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const redirectUri = `${config.baseUrl}/api/auth/yandex/callback`

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: config.yandexClientId,
    redirect_uri: redirectUri,
    scope: 'login:info login:email'
  })

  return sendRedirect(event, `https://oauth.yandex.ru/authorize?${params}`)
})