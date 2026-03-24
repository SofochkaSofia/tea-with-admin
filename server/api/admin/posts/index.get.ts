// server/api/admin/posts/index.get.ts
import { createError, defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma

  // Проверка: если prisma не инициализирован
  if (!prisma) {
    console.error('[admin/posts] Prisma client not initialized')
    throw createError({
      statusCode: 500,
      message: 'Database client not available'
    })
  }

  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
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

    console.log(`[admin/posts] Fetched ${posts.length} posts`)
    return posts

  } catch (error: any) {
    console.error('[admin/posts] Database error:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch posts',
      data: { error: error.message }
    })
  }
})