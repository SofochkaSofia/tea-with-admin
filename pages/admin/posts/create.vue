<!-- pages/admin/posts/create.vue -->
<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Создать пост</h1>
      <NuxtLink to="/admin/posts" class="text-primary-600 hover:text-primary-700 text-sm mt-1 inline-block">← Назад к списку</NuxtLink>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-6 max-w-4xl">
      <div>
        <label for="title-ru" class="block text-sm font-medium text-gray-700 mb-1">Заголовок (русский) <span class="text-red-500">*</span></label>
        <input id="title-ru" v-model="form.title.ru" type="text" required placeholder="Введите заголовок статьи" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition shadow-sm" />
      </div>
      <div>
        <label for="title-en" class="block text-sm font-medium text-gray-700 mb-1">Title (English)</label>
        <input id="title-en" v-model="form.title.en" type="text" placeholder="Enter English title" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition shadow-sm" />
      </div>
      <div>
        <label for="excerpt-ru" class="block text-sm font-medium text-gray-700 mb-1">Краткое описание (русский)</label>
        <textarea id="excerpt-ru" v-model="form.excerpt.ru" rows="3" placeholder="Краткий анонс статьи для превью" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition shadow-sm resize-y"></textarea>
      </div>
      <div>
        <label for="slug" class="block text-sm font-medium text-gray-700 mb-1">Slug (URL) <span class="text-red-500">*</span></label>
        <input id="slug" v-model="form.slug" type="text" required pattern="[a-z0-9-]+" placeholder="my-article-slug" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition shadow-sm" />
        <p class="mt-1 text-xs text-gray-500">Только латинские буквы, цифры и дефис. Пример: <code>kak-zavarivat-chai</code></p>
      </div>
      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Статус</label>
        <select id="status" v-model="form.status" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition shadow-sm bg-white">
          <option value="draft">Черновик (не опубликован)</option>
          <option value="published">Опубликовать сразу</option>
        </select>
      </div>
      <div>
        <label for="content-ru" class="block text-sm font-medium text-gray-700 mb-1">Контент (русский) <span class="text-red-500">*</span></label>
        <textarea id="content-ru" v-model="form.content.ru" rows="15" required placeholder="Основной текст статьи..." class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition shadow-sm resize-y font-mono text-sm"></textarea>
        <p class="mt-1 text-xs text-gray-500">Поддерживается простой HTML или Markdown</p>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
        <button type="submit" :disabled="isSubmitting" class="inline-flex justify-center px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition">{{ isSubmitting ? 'Создание...' : 'Создать пост' }}</button>
        <NuxtLink to="/admin/posts" class="inline-flex justify-center px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">Отмена</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  title: { ru: '', en: '' },
  excerpt: { ru: '', en: '' },
  content: { ru: '', en: '' },
  slug: '',
  status: 'draft' as 'draft' | 'published'
})

const isSubmitting = ref(false)
const { createPost } = useBlog()

const onSubmit = async () => {
  isSubmitting.value = true
  try {
    const { error } = await createPost(form)
    if (error.value) {
      alert('Ошибка при создании поста: ' + error.value.message)
    } else {
      await navigateTo('/admin/posts')
    }
  } catch (e: any) {
    alert('Непредвиденная ошибка: ' + e.message)
  } finally {
    isSubmitting.value = false
  }
}

definePageMeta({ layout: 'admin' })

useSeoMeta({
  title: 'Создать пост',
  description: 'Добавление новой статьи в блог'
})
</script>