<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-white">
    <header class="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900 hover:text-primary-600 transition">
              {{ siteConfig.name }}
            </NuxtLink>
          </div>

          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink
              v-for="item in siteConfig.navigation"
              :key="item.href"
              :to="item.href"
              class="text-gray-700 hover:text-primary-600 font-medium transition"
              :class="{ 'text-primary-600': $route.path === item.href }"
            >
              {{ item.title }}
            </NuxtLink>
          </nav>

          <div class="flex items-center space-x-4">
            <!-- ✅ ИСПРАВЛЕНО: BaseLocaleSwitcher (префикс папки "base") -->
            <BaseLocaleSwitcher />

            <!-- Кнопка мобильного меню -->
            <button
              class="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              @click="mobileMenuOpen = !mobileMenuOpen"
              aria-label="Открыть меню"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Мобильное меню -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 bg-white">
        <div class="px-4 py-3 space-y-1">
          <NuxtLink
            v-for="item in siteConfig.navigation"
            :key="item.href"
            :to="item.href"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700
                   hover:text-primary-600 hover:bg-gray-50 transition"
            @click="mobileMenuOpen = false"
          >
            {{ item.title }}
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ siteConfig.name }}</h3>
            <p class="text-gray-600 text-sm">{{ siteConfig.description }}</p>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Меню</h4>
            <ul class="space-y-2">
              <li v-for="item in siteConfig.navigation" :key="item.href">
                <NuxtLink :to="item.href" class="text-gray-600 hover:text-primary-600 text-sm transition">
                  {{ item.title }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Контакты</h4>
            <ul class="space-y-2 text-sm text-gray-600">
              <li v-if="siteConfig.contact.email">📧 {{ siteConfig.contact.email }}</li>
              <li v-if="siteConfig.contact.phone">📞 {{ siteConfig.contact.phone }}</li>
              <li v-if="siteConfig.contact.address">📍 {{ siteConfig.contact.address }}</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © {{ new Date().getFullYear() }} {{ siteConfig.name }}. Все права защищены.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from '~/config/site'

const mobileMenuOpen = ref(false)

// Закрываем мобильное меню при навигации
watch(() => useRoute().path, () => {
  mobileMenuOpen.value = false
})
</script>