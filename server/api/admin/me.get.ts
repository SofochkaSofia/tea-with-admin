// server/api/admin/me.get.ts
export default defineEventHandler(async (event) => {
  const prisma = event.context.prisma
  const user = event.context.user

  if (!user) {
    throw createError({ statusCode: 401, message: 'Unauthorized: User not found in context', fatal: true })
  }

  const userData = await prisma.user.findUnique({
    where: { id: user.userId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      role: true,
      isActive: true
    }
  })

  if (!userData) {
    throw createError({ statusCode: 404, message: 'User not found', fatal: true })
  }

  return userData
})