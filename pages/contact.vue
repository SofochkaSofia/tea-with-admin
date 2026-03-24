<!-- pages/contact.vue -->
<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-6">Контакты</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-xl font-semibold mb-4">Свяжитесь с нами</h2>
        <ul class="space-y-3 text-gray-700">
          <li v-if="siteConfig.contact.email">📧 {{ siteConfig.contact.email }}</li>
          <li v-if="siteConfig.contact.phone">📞 {{ siteConfig.contact.phoneFormatted }}</li>
          <li v-if="siteConfig.contact.address">📍 {{ siteConfig.contact.address }}</li>
          <li v-if="siteConfig.contact.workingHours">🕐 {{ siteConfig.contact.workingHours }}</li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-4">Социальные сети</h2>
        <div class="flex space-x-4">
          <a v-if="siteConfig.social.vk" :href="siteConfig.social.vk" target="_blank" class="text-primary-600 hover:text-primary-700">ВКонтакте</a>
          <a v-if="siteConfig.social.telegram" :href="siteConfig.social.telegram" target="_blank" class="text-primary-600 hover:text-primary-700">Telegram</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from '~/config/site'

useSeoMeta({
  title: 'Контакты',
  description: 'Свяжитесь с нами'
})
</script>