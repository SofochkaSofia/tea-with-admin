// server/plugins/prisma.ts
import { PrismaClient } from '@prisma/client'

// Создаём один экземпляр на весь процесс
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
})

// ✅ Правильный синтаксис для Nitro 2.11+
export default defineNitroPlugin((nitroApp) => {
  console.log('[Prisma] Plugin initialized')

  // Инжектируем prisma в контекст каждого запроса
  nitroApp.hooks.hook('request', (event) => {
    ;(event.context as any).prisma = prisma
  })

  // Корректное закрытие соединения при завершении
  nitroApp.hooks.hook('close', async () => {
    console.log('[Prisma] Disconnecting...')
    await prisma.$disconnect()
  })
})

// Расширяем типы для TypeScript
declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}