// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-03-17',

  modules: [
    '@nuxtjs/i18n',
    '@nuxt/image'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  css: ['~/assets/css/main.css'],

  i18n: {
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'de', name: 'Deutsch', file: 'de.json' },
      { code: 'tr', name: 'Türkçe', file: 'tr.json' }
    ],
    defaultLocale: 'ru',
    lazy: false,
    langDir: '../i18n/locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    seo: true,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    bundle: {
      optimizeTranslationDirective: false,
      onlyLocales: ['ru', 'en', 'de', 'tr']
    },
    compilation: {
      strictMessage: false,
      escapeHtml: true
    },
    experimental: {
      hmr: false,
      jsTsFormatResource: false,
      localeFallbackDetection: false
    }
  },

  image: {
    provider: 'ipx',
    domains: ['your-cms.com', 'images.unsplash.com', 'avatars.yandex.net', 'sun9-*.userapi.com'],
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 }
  },

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    yandexClientId: process.env.YANDEX_CLIENT_ID,
    yandexClientSecret: process.env.YANDEX_CLIENT_SECRET,
    vkClientId: process.env.VK_CLIENT_ID,
    vkClientSecret: process.env.VK_CLIENT_SECRET,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    uploadDir: process.env.UPLOAD_DIR || './public/uploads',
    maxUploadSize: parseInt(process.env.MAX_UPLOAD_SIZE || '10485760')
  },

  app: {
    head: {
      title: 'Tea Shop',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Магазин элитного чая' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router']
    }
  },

  appManifest: false,

  nitro: {
    esbuild: { options: { target: 'esnext' } },
    routeRules: {
      '/api/posts/**': { swr: 300 },
      '/blog/**': { swr: 600 }
    }
  },

  experimental: {
    scanPageMeta: true,
    typedPages: true,
    appManifest: false
  },

  devtools: { enabled: true, timeline: { enabled: true } }
})