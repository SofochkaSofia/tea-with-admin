<!-- pages/admin/posts/[id].vue -->
<template>
  <div v-if="post">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Редактировать пост</h1>
      <NuxtLink to="/admin/posts" class="text-primary-600 hover:text-primary-700 text-sm mt-1 inline-block">← Назад к списку</NuxtLink>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-6 max-w-4xl">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Заголовок (русский) <span class="text-red-500">*</span></label>
        <input v-model="form.title.ru" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Title (English)</label>
        <input v-model="form.title.en" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Статус</label>
        <select v-model="form.status" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 bg-white">
          <option value="draft">Черновик</option>
          <option value="published">Опубликовано</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Контент (русский) <span class="text-red-500">*</span></label>
        <textarea v-model="form.content.ru" rows="15" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 resize-y font-mono text-sm"></textarea>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
        <button type="submit" :disabled="isSubmitting" class="inline-flex justify-center px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 transition">{{ isSubmitting ? 'Сохранение...' : 'Сохранить изменения' }}</button>
        <button type="button" @click="onDelete" class="inline-flex justify-center px-6 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition">Удалить пост</button>
      </div>
    </form>
  </div>
  <div v-else class="text-center py-16">
    <div v-if="pending" class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    <p v-else class="text-gray-500">Пост не найден</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const {  post, pending, refresh } = await useFetch(`/api/admin/posts/${route.params.id}`, { lazy: true })
const { updatePost, deletePost } = useBlog()

const form = reactive({
  title: { ru: '', en: '' },
  excerpt: { ru: '', en: '' },
  content: { ru: '', en: '' },
  status: 'draft' as 'draft' | 'published'
})

watch(post, (newPost) => {
  if (newPost) {
    form.title = { ...newPost.title }
    form.excerpt = { ...newPost.excerpt }
    form.content = { ...newPost.content }
    form.status = newPost.status as 'draft' | 'published'
  }
}, { immediate: true })

const isSubmitting = ref(false)

const onSubmit = async () => {
  isSubmitting.value = true
  try {
    const { error } = await updatePost(route.params.id as string, form)
    if (error.value) {
      alert('Ошибка при сохранении: ' + error.value.message)
    } else {
      await refresh()
      alert('Изменения сохранены!')
    }
  } finally {
    isSubmitting.value = false
  }
}

const onDelete = async () => {
  if (!confirm('Вы уверены, что хотите удалить этот пост? Это действие нельзя отменить.')) {
    return
  }
  const { error } = await deletePost(route.params.id as string)
  if (error.value) {
    alert('Ошибка при удалении: ' + error.value.message)
  } else {
    await navigateTo('/admin/posts')
  }
}

definePageMeta({ layout: 'admin' })

useSeoMeta({
  title: 'Редактировать пост',
  description: 'Изменение статьи блога'
})
</script>