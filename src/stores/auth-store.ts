// stores/auth.ts
import { defineStore } from 'pinia'
import router from '@/router'
import type { UserProfile } from '@/types/user'
import { useFetch } from '@/composables/fetch'

function getUserFromStorage(): UserProfile | null {
  try {
    const user = localStorage.getItem('user')
    return user ? (JSON.parse(user) as UserProfile) : null
  } catch (e) {
    console.error('Failed to parse user from localStorage:', e)
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: getUserFromStorage(),
    returnUrl: '',
  }),
  actions: {
    async login(username: string, password: string): Promise<void> {
      const { data, error } = await useFetch<UserProfile>('POST', '/auth/login', {
        username,
        password,
      })

      if (data?.errorCode || error) {
        alert(data?.msg)
        return
      }
      this.user = data as UserProfile

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(data))
      router.push('/user')
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
      router.push('/login')
    },
  },
})
