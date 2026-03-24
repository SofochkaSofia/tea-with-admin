// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
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
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: true
  }
}