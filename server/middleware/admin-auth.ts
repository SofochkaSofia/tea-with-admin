// server/middleware/admin-auth.ts
import { verifyToken } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  try {
    // Пропускаем публичные маршруты
    if (event.path.startsWith('/api/auth')) {
      return
    }

    // Применяем только к админским API
    if (!event.path.startsWith('/api/admin')) {
      return
    }

    // Получаем токен
    const token = getCookie(event, 'admin_token')

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'Unauthorized: No token'
      })
    }

    // Проверяем токен
    const payload = verifyToken(token)

    if (!payload) {
      deleteCookie(event, 'admin_token', { path: '/' })
      throw createError({
        statusCode: 401,
        message: 'Unauthorized: Invalid token'
      })
    }

    // Добавляем пользователя в контекст
    event.context.user = payload

  } catch (error: any) {
    // Логируем ошибку для отладки
    console.error('[admin-auth] Error:', error)

    // Пробрасываем ошибку дальше
    throw error
  }
})