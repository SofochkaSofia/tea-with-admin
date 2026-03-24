// server/api/posts/[slug].get.ts
export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const slug = event.context.params?.slug

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Post slug is required' })
  }

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
    throw createError({ statusCode: 404, message: 'Post not found or not published' })
  }

  return post
})