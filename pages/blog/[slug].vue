<!-- pages/blog/[slug].vue -->
<template>
  <!-- Загрузка -->
  <div v-if="pending" class="max-w-4xl mx-auto px-4 py-16 text-center">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
    <p class="mt-4 text-gray-500">Загрузка статьи...</p>
  </div>

  <!-- Ошибка -->
  <div v-else-if="error" class="max-w-4xl mx-auto px-4 py-16 text-center">
    <p class="text-red-600">Ошибка: {{ error?.message }}</p>
    <NuxtLink to="/blog" class="text-primary-600 mt-4 inline-block">← Назад</NuxtLink>
  </div>

  <!-- Статья -->
  <div v-else-if="post" class="max-w-4xl mx-auto px-4 py-8">
    <NuxtLink to="/blog" class="text-primary-600 mb-6 inline-block">← Назад к блогу</NuxtLink>

    <h1 class="text-3xl font-bold mb-4">{{ post.title?.ru || post.title?.en || 'Без названия' }}</h1>

    <div class="text-gray-500 mb-6">
      <time v-if="post.publishedAt">{{ new Date(post.publishedAt).toLocaleDateString('ru-RU') }}</time>
      <span v-if="post.author"> • {{ post.author.firstName }} {{ post.author.lastName }}</span>
    </div>

    <!-- Изображение -->
    <img
      v-if="post.image"
      :src="post.image"
      :alt="post.title?.ru"
      class="w-full rounded-lg mb-6"
      onerror="this.style.display='none'"
    />

    <!-- Контент -->
    <div class="prose prose-lg max-w-none" v-html="post.content?.ru || post.content?.en || ''"></div>
  </div>

  <!-- 404 -->
  <div v-else class="max-w-4xl mx-auto px-4 py-16 text-center">
    <p>Статья не найдена</p>
    <NuxtLink to="/blog" class="text-primary-600 mt-4 inline-block">← Назад</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 🔴 ВАЖНО: data: post (не просто post)
const { data: post, pending, error } = await useFetch(`/api/posts/${route.params.slug}`)
</script>

<style scoped>
:deep(.prose p) { @apply mb-4 leading-relaxed; }
:deep(.prose h2) { @apply text-2xl font-bold mt-8 mb-4; }
:deep(.prose a) { @apply text-primary-600 hover:underline; }
:deep(.prose ul) { @apply list-disc pl-6 mb-4; }
:deep(.prose img) { @apply rounded-lg my-4; }
</style>