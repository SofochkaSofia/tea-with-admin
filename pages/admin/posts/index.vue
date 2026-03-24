<!-- pages/admin/posts/index.vue -->
<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Посты</h1>
        <p class="text-gray-600 mt-1">Управление статьями блога</p>
      </div>
      <NuxtLink to="/admin/posts/create" class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Новый пост
      </NuxtLink>
    </div>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заголовок</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Автор</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="pending">
              <td colspan="5" class="px-6 py-8 text-center">
                <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                <p class="mt-2 text-gray-500">Загрузка постов...</p>
              </td>
            </tr>
            <tr v-else-if="!posts?.length">
              <td colspan="5" class="px-6 py-12 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="mt-2 text-gray-500">Нет постов</p>
                <NuxtLink to="/admin/posts/create" class="mt-4 text-primary-600 hover:text-primary-700 font-medium">Создать первый пост</NuxtLink>
              </td>
            </tr>
            <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ post.title[locale] || post.title.ru }}</div>
                <div class="text-sm text-gray-500 truncate max-w-xs">{{ post.excerpt[locale] || post.excerpt.ru }}</div>
              </td>
              <td class="px-6 py-4">
                <span :class="{
                  'bg-green-100 text-green-800': post.status === 'published',
                  'bg-yellow-100 text-yellow-800': post.status === 'draft'
                }" class="inline-flex px-3 py-1 rounded-full text-xs font-medium">
                  {{ post.status === 'published' ? 'Опубликовано' : 'Черновик' }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ post.author?.firstName }} {{ post.author?.lastName }}</td>
              <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{{ formatDate(post.publishedAt || post.createdAt) }}</td>
              <td class="px-6 py-4 text-right text-sm font-medium space-x-3">
                <NuxtLink :to="`/admin/posts/${post.id}`" class="text-primary-600 hover:text-primary-900">Редактировать</NuxtLink>
                <button @click="confirmDelete(post.id)" class="text-red-600 hover:text-red-900">Удалить</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const {  posts, pending, refresh } = await useFetch('/api/admin/posts', { lazy: true })
const { deletePost } = useBlog()

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const confirmDelete = async (id: string) => {
  if (!confirm('Вы уверены, что хотите удалить этот пост? Это действие нельзя отменить.')) {
    return
  }
  const { error } = await deletePost(id)
  if (error.value) {
    alert('Ошибка при удалении: ' + error.value.message)
  } else {
    await refresh()
  }
}

definePageMeta({ layout: 'admin' })

useSeoMeta({
  title: 'Управление постами',
  description: 'Список всех статей блога'
})
</script>