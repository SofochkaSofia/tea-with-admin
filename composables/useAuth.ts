// composables/useAuth.ts
import type { TokenPayload } from '~/lib/auth'

export interface User {
  id: string
  email: string | null
  firstName: string | null
  lastName: string | null
  avatarUrl: string | null
  role: string
  isActive: boolean
}

export const useAuth = () => {
  const user = useState<User | null>('user', () => null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const login = async (provider: 'yandex' | 'vk') => {
    window.location.href = `/api/auth/${provider}`
  }

  const logout = async () => {
    isLoading.value = true
    error.value = null

    try {
      await $fetch('/api/auth/logout', {
        method: 'POST',
        retry: false
      })
      user.value = null
      await navigateTo('/admin/login')
    } catch (e: any) {
      error.value = e.message || 'Ошибка при выходе из системы'
      console.error('Logout error:', e)
    } finally {
      isLoading.value = false
    }
  }

  const check = async () => {
    isLoading.value = true
    error.value = null

    try {
      const data = await $fetch<User>('/api/admin/me', {
        server: false
      })
      user.value = data
    } catch (e: any) {
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  const isAdmin = computed(() => user.value?.role === 'admin')
  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    check,
    isAdmin,
    isAuthenticated
  }
}