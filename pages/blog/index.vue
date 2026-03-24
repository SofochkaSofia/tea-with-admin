<!-- pages/blog/index.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Блог</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">Статьи, советы и новости о чае</p>
    </div>

    <!-- Состояние загрузки -->
    <div v-if="pending" class="text-center py-16">
      <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      <p class="mt-4 text-gray-500">Загрузка статей...</p>
    </div>

    <!-- Нет статей -->
    <div v-else-if="!posts || posts.length === 0" class="text-center py-16">
      <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="mt-4 text-lg text-gray-500">Нет опубликованных статей</p>
      <p class="text-gray-400">Заходите позже — мы регулярно публикуем новый контент</p>
    </div>

    <!-- Сетка статей -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NuxtLink
        v-for="post in posts"
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-primary-300 transition"
      >
        <div v-if="post.image" class="aspect-w-16 aspect-h-9 bg-gray-100">
          <NuxtImg
            :src="post.image"
            :alt="getPostTitle(post)"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
            {{ getPostTitle(post) }}
          </h2>
          <p class="text-gray-600 mb-4 line-clamp-3">
            {{ getPostExcerpt(post) }}
          </p>
          <div class="flex items-center justify-between text-sm text-gray-500">
            <span>{{ formatDate(post.publishedAt || post.createdAt) }}</span>
            <span v-if="post.author" class="hidden sm:inline">
              {{ post.author.firstName }} {{ post.author.lastName }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// Импорты
import { siteConfig } from '~/config/site'

// Типы
interface Author {
  id: string
  firstName: string | null
  lastName: string | null
}

interface Post {
  id: string
  slug: string
  title: Record<string, string>
  excerpt: Record<string, string>
  content: Record<string, string>
  image: string | null
  status: string
  publishedAt: string | null
  createdAt: string
  author: Author | null
}

// Получаем текущую локаль
const { locale } = useI18n()

// Функции для получения текста на текущем языке
const getPostTitle = (post: Post) => {
  return post.title[locale.value] || post.title.ru || 'Без названия'
}

const getPostExcerpt = (post: Post) => {
  return post.excerpt[locale.value] || post.excerpt.ru || ''
}

// Форматирование даты
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Загрузка постов с отладкой
const { data: posts, pending, error, refresh } = await useFetch<Post[]>('/api/posts', {
  query: { status: 'published' },
  getCachedData: (key) => {
    if (process.server) return undefined
    return useNuxtData(key).data.value
  },
  onResponse({ response }) {
    console.log('[blog] API Response:', response._data)
  },
  onResponseError({ response }) {
    console.error('[blog] API Error:', response)
  }
})

// Логирование ошибок
if (error.value) {
  console.error('[blog] Failed to load posts:', error.value)
}

// Логирование данных
watch(posts, (newPosts) => {
  console.log('[blog] Posts loaded:', newPosts?.length || 0, 'posts')
  if (newPosts && newPosts.length > 0) {
    console.log('[blog] First post:', newPosts[0])
  }
}, { immediate: true })

// SEO
useSeoMeta({
  title: 'Блог',
  description: 'Статьи, советы и новости о чае',
  ogTitle: 'Блог | ' + siteConfig.name,
  ogDescription: 'Полезные статьи о чае: как заваривать, какие сорта выбрать, история чая'
})
</script>