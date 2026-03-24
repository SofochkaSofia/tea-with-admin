<!-- pages/index.vue -->
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        {{ $t('welcome') }}
      </h1>
      <p class="text-lg text-gray-600 mb-8">
        {{ siteConfig.description }}
      </p>
      <div class="flex justify-center gap-4">
        <NuxtLink
          to="/blog"
          class="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
        >
          Читать блог
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
        >
          О нас
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from '~/config/site'

useSeoMeta({
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription
})
</script>