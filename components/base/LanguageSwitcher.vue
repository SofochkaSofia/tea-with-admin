<!-- app/components/base/LocaleSwitcher.vue -->
<template>
  <div class="relative" ref="containerRef">
    <!-- Кнопка переключения языка -->
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700
             hover:text-primary-600 hover:bg-gray-100 rounded-md transition"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
    >
      <span>{{ currentLocale.name }}</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Выпадающий список языков -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
      role="listbox"
    >
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="switchLocale(locale.code)"
        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition"
        :class="{ 'font-semibold text-primary-600 bg-gray-50': locale.code === currentLocale.code }"
        role="option"
        :aria-selected="locale.code === currentLocale.code"
      >
        {{ locale.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from '#i18n'

const { locales, locale: currentLocale, setLocale } = useI18n()
const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

// Доступные локали (фильтруем системные)
const availableLocales = computed(() => {
  return (locales.value || []).filter(l => l && typeof l === 'object')
})

// Переключение языка
const switchLocale = async (code: string) => {
  await setLocale(code)
  isOpen.value = false
}

// Закрывать меню при клике вне
onClickOutside(
  containerRef, () => {
  isOpen.value = false
})
</script>