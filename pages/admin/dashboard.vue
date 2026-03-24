<!-- pages/admin/dashboard.vue -->
<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Дашборд</h1>
      <p class="text-gray-600 mt-1">Обзор статистики и быстрый доступ</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Всего постов</p>
            <p class="text-3xl font-bold text-gray-900">{{ stats.totalPosts }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Опубликовано</p>
            <p class="text-3xl font-bold text-green-600">{{ stats.publishedPosts }}</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Черновики</p>
            <p class="text-3xl font-bold text-yellow-600">{{ stats.draftPosts }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-lg font-medium text-gray-900">Последние посты</h2>
        <NuxtLink to="/admin/posts" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Все посты →
        </NuxtLink>
      </div>
      <div class="p-6">
        <div v-if="postsLoading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p class="mt-2 text-gray-500">Загрузка...</p>
        </div>
        <div v-else-if="!posts?.length" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="mt-2 text-gray-500">Нет постов</p>
          <NuxtLink to="/admin/posts/create" class="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium">
            Создать первый пост
          </NuxtLink>
        </div>
        <div v-else class="space-y-4">
          <div v-for="post in posts.slice(0, 5)" :key="post.id" class="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
            <div class="flex-1 min-w-0">
              <NuxtLink :to="`/admin/posts/${post.id}`" class="text-gray-900 hover:text-primary-600 font-medium truncate block">
                {{ post.title[locale] || post.title.ru }}
              </NuxtLink>
              <p class="text-sm text-gray-500 mt-1">
                {{ formatDate(post.createdAt) }}
                <span v-if="post.author">• {{ post.author.firstName }} {{ post.author.lastName }}</span>
              </p>
            </div>
            <div class="ml-4 flex items-center space-x-3">
              <span :class="{
                'bg-green-100 text-green-800': post.status === 'published',
                'bg-yellow-100 text-yellow-800': post.status === 'draft'
              }" class="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                {{ post.status === 'published' ? 'Опубликовано' : 'Черновик' }}
              </span>
              <NuxtLink v-if="post.status === 'published'" :to="`/blog/${post.slug}`" target="_blank" class="text-gray-400 hover:text-gray-600" title="Открыть на сайте">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const {  posts, pending: postsLoading } = await useFetch('/api/admin/posts', {
  lazy: true,
  getCachedData: (key) => {
    if (process.server) return undefined
    return useNuxtData(key).data.value
  }
})

const stats = computed(() => {
  const postsList = posts.value || []
  return {
    totalPosts: postsList.length,
    publishedPosts: postsList.filter(p => p.status === 'published').length,
    draftPosts: postsList.filter(p => p.status === 'draft').length
  }
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

definePageMeta({ layout: 'admin' })

useSeoMeta({
  title: 'Дашборд',
  description: 'Панель управления блогом'
})
</script>