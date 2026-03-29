// server/api/posts/[slug].get.ts
import { prisma } from '~/server/utils/prisma' // ✅ Прямой импорт

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug

  console.log('[API] Request for slug:', slug) // 🔍 Лог для отладки

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Post slug is required' })
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        slug,
        status: 'published',
        publishedAt: { lte: new Date() }
      },
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
      console.warn('[API] Post not found:', slug)
      throw createError({ statusCode: 404, message: 'Post not found or not published' })
    }

    console.log('[API] Post found:', post.slug)
    return post
  } catch (err) {
    console.error('[API] Error:', err)
    throw err
  }
})