// server/api/posts/index.get.ts
import { createError, defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  // ✅ Получаем prisma из контекста
  const prisma = (event.context as any).prisma

  // Проверка
  if (!prisma) {
    console.error('[posts] Prisma client not in context')
    throw createError({
      statusCode: 500,
      message: 'Database client not available'
    })
  }

  const query = getQuery(event)
  const status = query.status as string || 'published'

  try {
    const posts = await prisma.post.findMany({
      where: {
        status: status,
        publishedAt: { lte: new Date() }
      },
      orderBy: { publishedAt: 'desc' },
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

    console.log(`[posts] Found ${posts.length} posts`)
    return posts

  } catch (error: any) {
    console.error('[posts] Database error:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch posts',
      data: { error: error.message }
    })
  }
})