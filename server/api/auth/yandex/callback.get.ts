// server/api/auth/yandex/callback.get.ts
/**
 * Колбэк-эндпоинт для завершения авторизации через Яндекс
 */

import { generateTokens } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  // Получаем код авторизации
  const code = query.code as string

  if (!code) {
    throw createError({
      statusCode: 400,
      message: 'Authorization code is required',
      fatal: true
    })
  }

  const redirectUri = `${config.baseUrl}/api/auth/yandex/callback`

  // Обмен кода на access token
  const tokenResponse = await $fetch('https://oauth.yandex.ru/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: config.yandexClientId,
      client_secret: config.yandexClientSecret,
      redirect_uri: redirectUri
    }),
    retry: false
  })

  const accessToken = (tokenResponse as any).access_token

  if (!accessToken) {
    throw createError({
      statusCode: 400,
      message: 'Failed to obtain access token from Yandex',
      fatal: true
    })
  }

  // Получение данных пользователя
  const userInfo = await $fetch('https://login.yandex.ru/info', {
    headers: {
      Authorization: `OAuth ${accessToken}`
    },
    retry: false
  })

  // Работа с базой данных
  const prisma = event.context.prisma

  // Поиск пользователя по yandexId
  let user = await prisma.user.findUnique({
    where: { yandexId: userInfo.id }
  })

  // Создание нового пользователя если не найден
  if (!user) {
    user = await prisma.user.create({
      data: {  // ✅ КЛЮЧ "data:" ОБЯЗАТЕЛЕН
        yandexId: userInfo.id,
        email: userInfo.default_email || undefined,
        firstName: userInfo.first_name || undefined,
        lastName: userInfo.last_name || undefined,
        avatarUrl: userInfo.default_avatar_id
          ? `https://avatars.yandex.net/get-yapic/${userInfo.default_avatar_id}/islands-200`
          : undefined,
        role: 'editor',
        isActive: true
      }
    })
  }

  // Проверка активности аккаунта
  if (!user.isActive) {
    throw createError({
      statusCode: 403,
      message: 'Access denied: Account is disabled',
      fatal: true
    })
  }

  // Генерация нашего JWT-токена
  const { accessToken: ourAccessToken } = generateTokens({
    userId: user.id,
    role: user.role,
    email: user.email || undefined
  })

  // Обновление lastLogin
  await prisma.user.update({
    where: { id: user.id },
    data: {  // ✅ КЛЮЧ "data:" ОБЯЗАТЕЛЕН
      lastLogin: new Date()
    }
  })

  // Установка cookie с токеном
  setCookie(event, 'admin_token', ourAccessToken, {
    httpOnly: true,
    secure: config.baseUrl.startsWith('https'),
    maxAge: 60 * 60 * 24,
    path: '/',
    sameSite: 'lax'
  })

  // Редирект в админ-панель
  return sendRedirect(event, '/admin/dashboard')
})