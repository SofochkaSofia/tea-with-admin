// server/api/auth/vk/callback.get.ts
/**
 * Колбэк-эндпоинт для завершения авторизации через ВКонтакте
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

  const redirectUri = `${config.baseUrl}/api/auth/vk/callback`

  // Получение access token от ВК
  const tokenResponse = await $fetch('https://oauth.vk.com/access_token', {
    params: {
      client_id: config.vkClientId,
      client_secret: config.vkClientSecret,
      redirect_uri: redirectUri,
      code
    },
    retry: false
  })

  const accessToken = (tokenResponse as any).access_token

  if (!accessToken) {
    throw createError({
      statusCode: 400,
      message: 'Failed to obtain access token from VK',
      fatal: true
    })
  }

  // Получение данных пользователя
  const userInfo = await $fetch('https://api.vk.com/method/users.get', {
    params: {
      access_token: accessToken,
      fields: 'photo_200,first_name,last_name,email',
      v: '5.199'
    },
    retry: false
  })

  const vkUser = userInfo.response?.[0]

  if (!vkUser) {
    throw createError({
      statusCode: 400,
      message: 'Invalid user data from VK',
      fatal: true
    })
  }

  // Работа с базой данных
  const prisma = event.context.prisma

  // Поиск пользователя по vkId
  let user = await prisma.user.findUnique({
    where: { vkId: vkUser.id.toString() }
  })

  // Создание нового пользователя если не найден
  if (!user) {
    user = await prisma.user.create({
      data: {  // ✅ КЛЮЧ "data:" ОБЯЗАТЕЛЕН
        vkId: vkUser.id.toString(),
        email: vkUser.email || undefined,
        firstName: vkUser.first_name || undefined,
        lastName: vkUser.last_name || undefined,
        avatarUrl: vkUser.photo_200 || undefined,
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