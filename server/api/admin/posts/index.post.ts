// server/api/admin/posts/index.post.ts
import { createError, defineEventHandler, readBody } from 'h3'

/**
 * Создание нового поста
 * Требует авторизации
 */

export default defineEventHandler(async (event) => {
  // Получаем Prisma клиент из контекста
  const prisma = event.context.prisma

  // Проверка: если prisma не инициализирован
  if (!prisma) {
    console.error('[admin/posts] Prisma client not initialized')
    throw createError({
      statusCode: 500,
      message: 'Database client not available'
    })
  }

  // Получаем данные авторизованного пользователя
  const user = event.context.user

  // Проверка авторизации
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized: Please log in first'
    })
  }

  // Читаем тело запроса
  const body = await readBody(event)

  // Валидация обязательных полей
  if (!body.slug || !body.title) {
    throw createError({
      statusCode: 400,
      message: 'Slug and title are required'
    })
  }

  try {
    // Создание поста в базе данных
    const post = await prisma.post.create({
      data: {  // ✅ Ключ "data:" ОБЯЗАТЕЛЕН в Prisma
        slug: body.slug,
        title: body.title,
        excerpt: body.excerpt || { ru: '', en: '' },
        content: body.content,
        image: body.image || null,
        status: body.status || 'draft',
        authorId: user.userId,  // ✅ user гарантированно есть после проверки выше
        publishedAt: body.status === 'published' ? new Date() : null
      }
    })

    console.log(`[admin/posts] Created post: ${post.slug}`)
    return post

  } catch (error: any) {
    console.error('[admin/posts] Database error:', error.message)

    // Обработка уникальности slug
    if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
      throw createError({
        statusCode: 400,
        message: 'Slug already exists. Please choose a different one.'
      })
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to create post',
      data: { error: error.message }
    })
  }
})