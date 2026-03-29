// tailwind.config.ts
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],

  theme: {
    extend: {
      // 🎨 Цветовая палитра (ваша)
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49'
        }
      },

      // 🔤 Шрифты
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      // 📏 Отступы
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },

      // 🔘 Скругления
      borderRadius: {
        '4xl': '2rem',
      },

      // ✍️ Кастомизация типографики для prose (контент статей)
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // Базовые стили для контента блога
            color: theme('colors.gray.700'),
            fontSize: theme('fontSize.base')[0],
            lineHeight: theme('lineHeight.relaxed'),

            // Заголовки
            h1: {
              color: theme('colors.gray.900'),
              fontSize: theme('fontSize.2xl')[0],
              fontWeight: theme('fontWeight.bold'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.4'),
            },
            h2: {
              color: theme('colors.gray.900'),
              fontSize: theme('fontSize.xl')[0],
              fontWeight: theme('fontWeight.semibold'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.3'),
            },
            h3: {
              color: theme('colors.gray.900'),
              fontSize: theme('fontSize.lg')[0],
              fontWeight: theme('fontWeight.semibold'),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.2'),
            },

            // Ссылки в цвете primary
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'none',
              fontWeight: theme('fontWeight.medium'),
              '&:hover': {
                color: theme('colors.primary.700'),
                textDecoration: 'underline',
              },
            },

            // Списки
            ul: {
              listStyleType: 'disc',
              paddingLeft: theme('spacing.6'),
            },
            ol: {
              listStyleType: 'decimal',
              paddingLeft: theme('spacing.6'),
            },
            li: {
              marginTop: theme('spacing.2'),
              marginBottom: theme('spacing.2'),
            },

            // Код
            code: {
              color: theme('colors.gray.900'),
              backgroundColor: theme('colors.gray.100'),
              padding: '0.25rem 0.375rem',
              borderRadius: theme('borderRadius.DEFAULT'),
              fontSize: theme('fontSize.sm')[0],
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },

            // Цитаты
            blockquote: {
              borderLeftColor: theme('colors.primary.300'),
              fontStyle: 'italic',
              color: theme('colors.gray.600'),
            },

            // Изображения
            img: {
              borderRadius: theme('borderRadius.lg'),
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.4'),
            },

            // Таблицы
            table: {
              width: '100%',
              borderRadius: theme('borderRadius.lg'),
              overflow: 'hidden',
            },
            th: {
              backgroundColor: theme('colors.gray.50'),
              fontWeight: theme('fontWeight.semibold'),
            },
            'thead th': {
              color: theme('colors.gray.900'),
            },
          },
        },

        // 🌙 Тёмная тема (если используете)
        dark: {
          css: {
            color: theme('colors.gray.300'),
            h1: { color: theme('colors.gray.100') },
            h2: { color: theme('colors.gray.100') },
            h3: { color: theme('colors.gray.100') },
            a: {
              color: theme('colors.primary.400'),
              '&:hover': { color: theme('colors.primary.300') },
            },
            code: {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.800'),
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.700'),
              color: theme('colors.gray.400'),
            },
            'thead th': {
              color: theme('colors.gray.100'),
              backgroundColor: theme('colors.gray.800'),
            },
          },
        },

        // 📱 Адаптивные размеры
        lg: {
          css: {
            fontSize: theme('fontSize.lg')[0],
            lineHeight: theme('lineHeight.relaxed'),
          },
        },
      }),
    },
  },

  // 🔌 Плагины
  plugins: [
    typography({
      // Дополнительные опции плагина
      className: 'prose',
    }),
  ],

  // ⚙️ Настройки ядра
  corePlugins: {
    preflight: true,
  },

  // 🎯 Оптимизация для production
  safelist: [
    'prose',
    'prose-lg',
    'prose-primary',
    'prose-headings:underline',
    'prose-a:text-primary-600',
  ],
} satisfies Config