// server/api/admin/posts/[id].delete.ts
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
    console.error('[admin/posts/delete] Prisma client not initialized')
    throw createError({
      statusCode: 500,
      message: 'Database client not available'
    })
  }

  try {
    await prisma.post.delete({
      where: { id }
    })

    console.log(`[admin/posts] Deleted post with ID: ${id}`)
    return {
      success: true,
      message: 'Post deleted successfully'
    }

  } catch (error: any) {
    console.error('[admin/posts/delete] Database error:', error.message)

    // Если пост не найден
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        message: 'Post not found'
      })
    }

    throw createError({
      statusCode: 500,
      message: 'Failed to delete post',
      data: { error: error.message }
    })
  }
})