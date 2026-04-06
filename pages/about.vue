<!-- pages/about.vue -->
<template>
  <div class="content-container py-12">
    <h1 class="heading mb-6">О нас</h1>
    <div class="prose prose-lg max-w-none text-gray-700">
      <!-- ✅ ИСПРАВЛЕНО: используем siteConfig через импорт -->
      <p>{{ config.description }}</p>
      <p>Мы работаем с {{ currentYear }} года, предлагая только лучшие сорта чая от проверенных поставщиков.</p>
      <h3>Наши ценности</h3>
      <ul>
        <li>Качество и свежесть каждого сорта</li>
        <li>Прямые поставки от плантаций</li>
        <li>Экологичная упаковка</li>
        <li>Экспертная консультация по завариванию</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// ✅ ИМПОРТИРУЕМ конфиг
import { siteConfig } from '~/config/site'

// Создаём локальную ссылку для использования в шаблоне
const config = siteConfig
const currentYear = new Date().getFullYear()

useSeoMeta({
  title: 'О нас',
  description: config.seo.defaultDescription
})
</script>