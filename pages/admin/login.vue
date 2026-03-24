<!-- pages/admin/login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900">Вход в админ-панель</h2>
        <p class="mt-2 text-sm text-gray-600">Авторизуйтесь через социальную сеть</p>
      </div>
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
        {{ error }}
      </div>
      <div class="space-y-4">
        <button
          v-if="features.auth.includes('yandex')"
          @click="handleLogin('yandex')"
          :disabled="isLoading"
          class="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg
                 bg-yellow-50 hover:bg-yellow-100 border-yellow-300 text-yellow-900
                 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img
            src="https://yastatic.net/s3/passport-static/intranet/avatars/yandex-id-logo.svg"
            alt="Yandex ID"
            class="w-5 h-5 flex-shrink-0"
            loading="lazy"
          />
          <span>Войти через Яндекс</span>
        </button>
        <button
          v-if="features.auth.includes('vk')"
          @click="handleLogin('vk')"
          :disabled="isLoading"
          class="w-full flex items-center justify-center gap-3 px-4 py-3 border rounded-lg
                 bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-900
                 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img
            src="https://vk.com/images/icons/vk_logo.svg"
            alt="VK ID"
            class="w-5 h-5 flex-shrink-0"
            loading="lazy"
          />
          <span>Войти через ВКонтакте</span>
        </button>
      </div>
      <div class="text-xs text-center text-gray-500 space-y-1">
        <p>Только для авторизованных сотрудников</p>
        <p>Первый вход? Свяжитесь с администратором для настройки доступа</p>
      </div>
      <div class="text-center">
        <NuxtLink to="/" class="text-sm text-primary-600 hover:text-primary-700 font-medium">
          ← Вернуться на сайт
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from '~/config/site'

const { login, isLoading, error } = useAuth()
const features = siteConfig.features

const handleLogin = async (provider: 'yandex' | 'vk') => {
  await login(provider)
}

onMounted(async () => {
  const {  user } = await useFetch('/api/admin/me', { lazy: true, server: false })
  if (user.value) {
    await navigateTo('/admin/dashboard')
  }
})

definePageMeta({ layout: false })

useSeoMeta({
  title: 'Вход в админ-панель',
  description: 'Авторизация для доступа к управлению сайтом'
})
</script>