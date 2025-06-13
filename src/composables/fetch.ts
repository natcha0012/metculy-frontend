import { ref } from 'vue'
import type { ErrorResp } from '@/types/error'
import { useAuthStore } from '@/stores/auth-store'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function useFetch<T, ReqBody = any>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  body?: ReqBody,
) {
  const data = ref<T & ErrorResp>()
  const error = ref<Error | null>(null)
  const auth = useAuthStore()

  const requestOptions: RequestInit = {
    method,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.user?.token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  }
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`, requestOptions)
    data.value = await res.json()
  } catch (err) {
    error.value = err as Error
  }
  return { data: data.value, error: error.value }
}
