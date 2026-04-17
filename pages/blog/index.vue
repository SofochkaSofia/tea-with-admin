<!-- pages/blog/index.vue -->
<template>
  <div class="blog-container py-8">
    <div class="text-center mb-12">
      <h1 class="heading mb-4">Блог</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">Статьи, советы и новости о чае</p>
    </div>

    <!-- Загрузка -->
    <div v-if="pending" class="loading-state">
      <div class="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      <p class="mt-4 text-gray-500">Загрузка статей...</p>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="error-state">
      <svg class="mx-auto h-16 w-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="mt-4 text-lg text-red-600">Не удалось загрузить статьи</p>
      <button @click="refresh" class="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
        Повторить
      </button>
    </div>

    <!-- Нет статей -->
    <div v-else-if="!posts || posts.length === 0" class="empty-state">
      <svg class="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p class="mt-4 text-lg text-gray-500">Нет опубликованных статей</p>
    </div>

    <!-- Карусель статей -->
    <div v-else class="carousel-container">
      <div class="carousel-wrapper relative">
        <!-- Контейнер карусели -->
        <div
          ref="carouselRef"
          class="carousel-track flex overflow-x-hidden scroll-smooth"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          @mouseenter="stopAutoSlide"
          @mouseleave="startAutoSlide"
        >
          <div
            v-for="(post, index) in posts"
            :key="post.id"
            class="carousel-slide min-w-full flex-shrink-0"
            :class="{ 'current-slide': index === currentSlide }"
          >
            <NuxtLink
              :to="`/blog/${post.slug}`"
              class="group blog-card overflow-hidden block h-full"
            >
              <!-- Изображение -->
              <div v-if="post.image" class="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
                <img
                  :src="post.image"
                  :alt="getPostTitle(post)"
                  class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onerror="this.style.display='none'"
                />
              </div>

              <div class="p-6">
                <h2 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                  {{ getPostTitle(post) }}
                </h2>
                <p class="text-gray-600 mb-4 line-clamp-3">
                  {{ getPostExcerpt(post) }}
                </p>
                <div class="flex items-center justify-between text-sm text-gray-500">
                  <time :datetime="post.publishedAt || post.createdAt">
                    {{ formatDate(post.publishedAt || post.createdAt) }}
                  </time>
                  <span v-if="post.author" class="hidden sm:inline">
                    {{ post.author.firstName }} {{ post.author.lastName }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Кнопки навигации -->
        <button
          @click="prevSlide"
          :disabled="currentSlide === 0"
          class="carousel-btn carousel-btn-prev absolute top-1/2 left-4 -translate-y-1/2 bg-white rounded-full shadow-lg p-2 z-10 flex items-center justify-center w-12 h-12 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
          aria-label="Предыдущая статья"
          :class="{ 'visible opacity-100': currentSlide > 0, 'invisible opacity-0': currentSlide === 0 }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          @click="nextSlide"
          :disabled="currentSlide >= posts.length - 1"
          class="carousel-btn carousel-btn-next absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-full shadow-lg p-2 z-10 flex items-center justify-center w-12 h-12 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
          aria-label="Следующая статья"
          :class="{ 'visible opacity-100': currentSlide < posts.length - 1, 'invisible opacity-0': currentSlide >= posts.length - 1 }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Индикаторы -->
        <div class="carousel-indicators flex justify-center mt-6 space-x-2">
          <button
            v-for="(_, index) in posts"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-200',
              currentSlide === index ? 'bg-primary-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
            ]"
            :aria-label="`Перейти к статье ${index + 1}`"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { siteConfig } from '~/config/site'
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface Author {
  id: string
  firstName: string | null
  lastName: string | null
}

interface Post {
  id: string
  slug: string
  title: Record<string, string>
  excerpt: Record<string, string>
  content: Record<string, string>
  image: string | null
  status: string
  publishedAt: string | null
  createdAt: string
  author: Author | null
}

const { locale } = useI18n()

const getPostTitle = (post: Post) => {
  return post?.title?.[locale.value] || post?.title?.ru || 'Без названия'
}

const getPostExcerpt = (post: Post) => {
  return post?.excerpt?.[locale.value] || post?.excerpt?.ru || ''
}

const formatDate = (date: string | null | undefined) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 🔴 ВАЖНО: data: posts (не просто posts)
const { data: posts, pending, error, refresh } = await useFetch<Post[]>('/api/posts', {
  query: { status: 'published' }
})

// Состояние карусели
const currentSlide = ref(0)
const carouselRef = ref<HTMLElement | null>(null)
let intervalId: ReturnType<typeof setInterval> | null = null

// Навигация
const nextSlide = () => {
  if (posts.value && currentSlide.value < posts.value.length - 1) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const goToSlide = (index: number) => {
  if (posts.value && index >= 0 && index < posts.value.length) {
    currentSlide.value = index
  }
}

// Управление авто-прокруткой
const startAutoSlide = () => {
  if (!posts.value || posts.value.length <= 1) return;
  
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(() => {
    if (posts.value && currentSlide.value < posts.value.length - 1) {
      currentSlide.value++
    } else {
      currentSlide.value = 0 // Вернуться к первой
    }
  }, 5000)
}

const stopAutoSlide = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// Добавляем обработчики событий для управления с клавиатуры
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') {
    nextSlide()
  } else if (e.key === 'ArrowLeft') {
    prevSlide()
  }
}

// Инициализация карусели - только на клиенте
onMounted(() => {
  // Проверка, что мы находимся в браузере
  if (typeof window !== 'undefined') {
    // Инициализируем авто-прокрутку
    if (posts.value && posts.value.length > 1) {
      startAutoSlide()
    }

    // Добавляем обработчик для клавиатуры
    window.addEventListener('keydown', handleKeyDown)

    // Наблюдаем за изменениями posts для перезапуска автопрокрутки
    watch(posts, (newPosts) => {
      nextTick(() => {
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
        
        if (newPosts && newPosts.length > 1) {
          startAutoSlide()
        }
      })
    }, { immediate: true })
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  
  // Очистка обработчиков событий
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeyDown)
  }
})

useSeoMeta({
  title: 'Блог | ' + siteConfig.name,
  description: 'Статьи, советы и новости о чае'
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.carousel-wrapper {
  position: relative;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
  height: 100%;
}

.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
  height: 100%;
}

.carousel-btn {
  opacity: 0;
  visibility: hidden;
}

.carousel-wrapper:hover .carousel-btn {
  opacity: 1;
  visibility: visible;
}

.carousel-indicators button {
  transition: all 0.3s ease;
}
</style>