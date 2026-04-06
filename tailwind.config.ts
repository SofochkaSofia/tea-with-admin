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
        },
        text: 'var(--text)',
        bg: 'var(--bg)',
        border: 'var(--border)',
        semantic: {
          success: 'var(--success)',
          warning: 'var(--warning)',
          error: 'var(--error)',
          info: 'var(--info)'
        }
      },

      // 🔤 Шрифты
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      // 📏 Размеры шрифтов
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }]
      },

      // 🔘 Радиус скругления
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },

      // 🔘 Скругления (существующие)
      borderRadius: {
        '4xl': '2rem',
      },

      // 🎭 Тени
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none'
      },

      // ⏱️ Длительность переходов
      transitionDuration: {
        DEFAULT: '150ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms'
      },

      // 📈 Функция времени перехода
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
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