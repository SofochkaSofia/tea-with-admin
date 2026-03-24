// server/api/admin/posts/[id].patch.ts
import { createError, defineEventHandler, readBody } from 'h3'

/**
 * Обновление поста по ID
 * Требует авторизации
 */

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const id = event.context.params?.id
  const body = await readBody(event)

  // Проверка наличия ID
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Post ID is required'
    })
  }

  // Проверка: если prisma не инициализирован
  if (!prisma) {
    console.error('[admin/posts/patch] Prisma client not initialized')
    throw createError({
      statusCode: 500,
      message: 'Database client not available'
    })
  }

  // Подготовка данных для обновления
  const updateData: Record<string, any> = {
    updatedAt: new Date()
  }

  // Обновляем только переданные поля
  if (body.title) updateData.title = body.title
  if (body.excerpt) updateData.excerpt = body.excerpt
  if (body.content) updateData.content = body.content
  if (body.image !== undefined) updateData.image = body.image
  if (body.status) {
    updateData.status = body.status
    if (body.status === 'published' && !body.publishedAt) {
      updateData.publishedAt = new Date()
    }
  }

  // Выполнение обновления в базе данных
  try {
    const post = await prisma.post.update({
      where: { id },
      data: updateData  // ✅ Ключ "" ОБЯЗАТЕЛЕН
    })

    console.log(`[admin/posts] Updated post: ${post.slug}`)
    return post

  } catch (error: any) {
    console.error('[admin/posts/patch] Database error:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to update post',
      data: { error: error.message }
    })
  }
})