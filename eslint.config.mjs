// eslint.config.mjs
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    }
  },
  {
    ignores: [
      '.nuxt/**',
      '.output/**',
      'node_modules/**',
      'dist/**',
      'public/**'
    ]
  }
]