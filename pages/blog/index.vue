<!-- pages/blog/index.vue -->
<template>
  <div class="blog-container py-8">
    <div class="text-center mb-12">
      <h1 class="heading mb-4">Блог</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">Статьи, советы и новости о чае</p>
    </div>

    <!-- Загрузка -->
    <div v-if="pending" class="loading-state">
      <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      <p class="mt-4 text-gray-500">Загрузка статей...</p>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="error-state">
      <svg class="mx-auto h-16 w-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="mt-4 text-lg text-red-600">Не удалось загрузить статьи</p>
      <button @click="refresh" class="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
        Повторить
      </button>
    </div>

    <!-- Нет статей -->
    <div v-else-if="!posts || posts.length === 0" class="empty-state">
      <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="mt-4 text-lg text-gray-500">Нет опубликованных статей</p>
    </div>

    <!-- Сетка статей -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NuxtLink
        v-for="post in posts"
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="group blog-card overflow-hidden"
      >
        <!-- Изображение -->
        <div v-if="post.image" class="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
          <img
            :src="post.image"
            :alt="getPostTitle(post)"
            class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onerror="this.style.display='none'"
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
            <time :datetime="post.publishedAt || post.createdAt">
              {{ formatDate(post.publishedAt || post.createdAt) }}
            </time>
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
import { siteConfig } from '~/config/site'

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

const { locale } = useI18n()

const getPostTitle = (post: Post) => {
  return post?.title?.[locale.value] || post?.title?.ru || 'Без названия'
}

const getPostExcerpt = (post: Post) => {
  return post?.excerpt?.[locale.value] || post?.excerpt?.ru || ''
}

const formatDate = (date: string | null | undefined) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 🔴 ВАЖНО: data: posts (не просто posts)
const { data: posts, pending, error, refresh } = await useFetch<Post[]>('/api/posts', {
  query: { status: 'published' }
})

useSeoMeta({
  title: 'Блог | ' + siteConfig.name,
  description: 'Статьи, советы и новости о чае'
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>