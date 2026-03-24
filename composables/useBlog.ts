// composables/useBlog.ts
export interface Post {
  id: string
  slug: string
  title: Record<string, string>
  excerpt: Record<string, string>
  content: Record<string, string>
  image: string | null
  status: string
  publishedAt: string | null
  author: {
    id: string
    firstName: string | null
    lastName: string | null
  } | null
  createdAt: string
  updatedAt: string
}

export type PostInput = Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>

export const useBlog = () => {
  const { locale } = useI18n()

  const fetchPosts = async (status: string = 'published') => {
    return await useFetch<Post[]>('/api/posts', {
      query: { locale: locale.value, status },
      getCachedData: (key) => {
        if (process.server) return undefined
        return useNuxtData(key).data.value
      }
    })
  }

  const fetchPost = async (slug: string) => {
    return await useFetch<Post>(`/api/posts/${slug}`, {
      query: { locale: locale.value },
      server: false
    })
  }

  const createPost = async (payload: PostInput) => {
    return await useFetch<Post>('/api/admin/posts', {
      method: 'POST',
      body: payload,
      getCachedData: () => undefined
    })
  }

  const updatePost = async (id: string, payload: PostInput) => {
    return await useFetch<Post>(`/api/admin/posts/${id}`, {
      method: 'PATCH',
      body: payload,
      getCachedData: () => undefined
    })
  }

  const deletePost = async (id: string) => {
    return await useFetch(`/api/admin/posts/${id}`, {
      method: 'DELETE',
      getCachedData: () => undefined
    })
  }

  return {
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost
  }
}