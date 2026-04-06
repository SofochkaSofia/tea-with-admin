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
    // В конец файла, внутри try блока, заменить return posts на:

      // Получаем параметры из query
      const query = getQuery(event)
      const { status, page = 1, limit = 10 } = query

      // Фильтрация по статусу
      const where: any = {}
      if (status && status !== 'all') {
        where.status = status
      }

      // Пагинация
      const skip = (Number(page) - 1) * Number(limit)
      const take = Number(limit)

      return posts
      const [posts, total] = await Promise.all([
        prisma.post.findMany({
          where,
          orderBy: { createdAt: 'desc' },
          skip,
          take,
          include: {
            author: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } }
          }
        }),
        prisma.post.count({ where })
      ])

      return {
        posts,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }

  } catch (error: any) {
    console.error('[admin/posts] Database error:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch posts',
      data: { error: error.message }
    })
  }
})