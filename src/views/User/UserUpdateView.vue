<template>
  <div class="mx-auto bg-white p-6">
    <h1 class="text-2xl font-bold mb-8">Edit User</h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Username -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">
          Username<span class="text-red-500">*</span>
        </label>
        <input v-model="form.username" type="text" class="w-full px-3 py-2 border rounded" required />
      </div>

      <!-- Role -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">
          Role<span class="text-red-500">*</span>
        </label>
        <select v-model="form.role" class="w-full px-3 py-2 border rounded" required>
          <option disabled value="">Select Role</option>
          <option v-if="user?.role === UserRole.ADMIN" :value="UserRole.ADMIN">Admin</option>
          <option v-if="user?.role === UserRole.ADMIN || user?.role === UserRole.DOCTOR" :value="UserRole.DOCTOR">Doctor
          </option>
          <option :value="UserRole.STAFF">Staff</option>
        </select>
      </div>

      <!-- Phone Number -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">
          Phone Number<span class="text-red-500">*</span>
        </label>
        <input v-model="phoneNumber" type="text" class="w-full px-3 py-2 border rounded" required />
      </div>

      <!-- Submit -->
      <div class="flex justify-end gap-2 pt-4">
        <button type="button" class="px-4 py-2 border shadow rounded hover:bg-gray-200" @click="cancel">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { UserRole } from '@/enums/user.enum'
import { useFetch } from '@/composables/fetch'
import type { UserResponse } from '@/types/user'
import { formatPhoneNumber } from '@/directives/phoneNumber'
import { useAuthStore } from '@/stores/auth-store'

const router = useRouter()
const route = useRoute()
const { user } = useAuthStore()
const userId = Number(route.params.id)

const form = ref({
  username: '',
  role: '',
})

const phoneNumber = ref('')

const submitForm = async () => {
  const { data, error } = await useFetch<string>('PATCH', `/user/${userId}`, {
    ...form.value,
    phoneNumber: phoneNumber.value.replace(/\D/g, '')
  })
  if (data?.errorCode || error) {
    alert(data?.msg || 'An error occurred')
    return
  }

  router.push('/user')
}

onMounted(async () => {
  const { data, error } = await useFetch<UserResponse>('GET', `/user/${userId}`)

  if (data?.errorCode || error) {
    alert(data?.msg || 'An error occurred')
    return
  }
  form.value = {
    username: data!.username,
    role: data!.role,
  }
  phoneNumber.value = data!.phoneNumber
})

const cancel = () => {
  router.push('/user')
}

watch(phoneNumber, (newVal) => {
  const formatted = formatPhoneNumber(newVal)
  if (newVal !== formatted) {
    phoneNumber.value = formatted
  }
})
</script>
