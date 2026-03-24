// server/api/admin/posts/[id].get.ts
import { createError, defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const id = event.context.params?.id

  // Проверка наличия ID
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Post ID is required'
    })
  }

  // Проверка: если prisma не инициализирован
  if (!prisma) {
    console.error('[admin/posts/get] Prisma client not initialized')
    throw createError({
      statusCode: 500,
      message: 'Database client not available'
    })
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    })

    if (!post) {
      throw createError({
        statusCode: 404,
        message: 'Post not found'
      })
    }

    return post

  } catch (error: any) {
    console.error('[admin/posts/get] Database error:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch post',
      data: { error: error.message }
    })
  }
})