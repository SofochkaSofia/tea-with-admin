<!-- pages/index.vue -->
<template>
  <div class="blog-container py-12">
    <div class="text-center">
      <h1 class="heading mb-4">
        {{ $t('welcome') }}
      </h1>
      <p class="text-lg text-gray-600 mb-8">
        {{ siteConfig.description }}
      </p>
      <div class="flex justify-center gap-4">
        <NuxtLink
          to="/blog"
          class="btn"
        >
          Читать блог
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="btn bg-gray-100 text-gray-900 hover:bg-gray-200"
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