<!-- pages/blog/[slug].vue -->
<template>
  <div v-if="post" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Навигация -->
    <nav class="mb-8">
      <NuxtLink to="/blog" class="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Назад к блогу
      </NuxtLink>
    </nav>

    <!-- Статья -->
    <article class="prose prose-lg max-w-none">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {{ getPostTitle(post) }}
      </h1>

      <div class="flex flex-wrap items-center gap-4 text-gray-500 mb-8 pb-6 border-b border-gray-200">
        <time :datetime="post.publishedAt || post.createdAt">
          {{ formatDate(post.publishedAt || post.createdAt) }}
        </time>
        <span v-if="post.author">•</span>
        <span v-if="post.author">
          {{ post.author.firstName }} {{ post.author.lastName }}
        </span>
      </div>

      <NuxtImg
        v-if="post.image"
        :src="post.image"
        :alt="getPostTitle(post)"
        class="w-full h-64 sm:h-96 object-cover rounded-lg mb-8"
        loading="eager"
      />

      <div
        class="text-gray-700 leading-relaxed"
        v-html="getPostContent(post)"
      ></div>
    </article>

    <!-- Навигация к другим статьям -->
    <div class="mt-12 pt-8 border-t border-gray-200">
      <NuxtLink to="/blog" class="text-primary-600 hover:text-primary-700 font-medium">
        Читать другие статьи →
      </NuxtLink>
    </div>
  </div>

  <!-- Статья не найдена -->
  <div v-else class="max-w-4xl mx-auto px-4 py-16 text-center">
    <div v-if="pending" class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    <template v-else>
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Статья не найдена</h1>
      <p class="text-gray-600 mb-8">Возможно, она была удалена или изменён URL</p>
      <NuxtLink to="/blog" class="text-primary-600 hover:text-primary-700 font-medium">
        Вернуться к блогу
      </NuxtLink>
    </template>
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
const route = useRoute()

// Функции для получения текста на текущем языке
const getPostTitle = (post: Post) => {
  return post.title[locale.value] || post.title.ru || 'Без названия'
}

const getPostContent = (post: Post) => {
  return post.content[locale.value] || post.content.ru || ''
}

// Форматирование даты
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Загрузка поста
const { data: post, pending, error } = await useFetch<Post>(`/api/posts/${route.params.slug}`, {
  query: { locale: locale.value },
  server: false
})

// Логирование ошибок
if (error.value) {
  console.error('[blog/slug] Failed to load post:', error.value)
  throw createError({
    statusCode: 404,
    message: 'Статья не найдена',
    fatal: true
  })
}

// SEO
useSeoMeta({
  title: () => post.value ? getPostTitle(post.value) : 'Статья не найдена',
  description: () => post.value ? getPostExcerpt(post.value) : '',
  ogTitle: () => post.value ? getPostTitle(post.value) : '',
  ogDescription: () => post.value ? getPostExcerpt(post.value) : '',
  ogImage: () => post.value?.image || undefined
})

// Вспомогательная функция для excerpt
const getPostExcerpt = (post: Post) => {
  return post.excerpt[locale.value] || post.excerpt.ru || ''
}
</script>

<style scoped>
.prose :deep(img) {
  @apply rounded-lg my-8;
}
.prose :deep(a) {
  @apply text-primary-600 hover:text-primary-700 no-underline hover:underline;
}
.prose :deep(code) {
  @apply bg-gray-100 px-1.5 py-0.5 rounded text-sm;
}
.prose :deep(pre) {
  @apply bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto;
}
.prose :deep(pre code) {
  @apply bg-transparent p-0 text-inherit;
}
</style>