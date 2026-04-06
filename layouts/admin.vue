<!-- layouts/admin.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <header class="nav shadow-sm">
      <div class="container-lg">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <NuxtLink
              to="/admin/dashboard"
              class="text-xl font-bold text-gray-900 hover:text-primary-600 transition"
            >
              Админ-панель
            </NuxtLink>
            <nav class="hidden md:flex space-x-1">
              <NuxtLink
                v-for="item in navigation"
                :key="item.href"
                :to="item.href"
                class="px-3 py-2 rounded-md text-sm font-medium text-gray-700
                       hover:text-gray-900 hover:bg-gray-100 transition"
                :class="{ 'bg-gray-100 text-gray-900': $route.path.startsWith(item.href) }"
              >
                {{ item.title }}
              </NuxtLink>
            </nav>
          </div>
          <div class="flex items-center space-x-4">
            <div v-if="user" class="flex items-center space-x-3">
              <img
                v-if="user.avatarUrl"
                :src="user.avatarUrl"
                :alt="user.firstName"
                class="w-8 h-8 rounded-full object-cover"
              />
              <div v-else class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span class="text-sm font-medium text-text-muted">
                  {{ user.firstName?.[0] || 'U' }}
                </span>
              </div>
              <span class="text-sm text-gray-700 hidden sm:block">
                {{ user.firstName }} {{ user.lastName }}
              </span>
            </div>
            <button
              @click="handleLogout"
              :disabled="isLoggingOut"
              class="btn bg-error hover:bg-red-700"
            >
              {{ isLoggingOut ? 'Выход...' : 'Выйти' }}
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="authError" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
        <p class="text-sm text-red-700">{{ authError }}</p>
      </div>
      <slot />
    </main>
    <footer class="mt-auto py-6 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
        © {{ new Date().getFullYear() }} {{ siteConfig.name }}. Админ-панель.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from '~/config/site'

const navigation = [
  { title: 'Дашборд', href: '/admin/dashboard' },
  { title: 'Посты', href: '/admin/posts' }
]

const { user, logout, error: authError } = useAuth()
const isLoggingOut = ref(false)

const handleLogout = async () => {
  isLoggingOut.value = true
  await logout()
  isLoggingOut.value = false
}

onMounted(async () => {
  if (!user.value) {
    await useAuth().check()
  }
})

definePageMeta({
  middleware: ['auth']
})
</script>