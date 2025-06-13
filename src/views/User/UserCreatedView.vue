<template>
  <div class=" mx-auto bg-white p-6 ">
    <h1 class="text-2xl font-bold mb-8">Create New User</h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Username -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">Username<span class="text-red-500">*</span></label>
        <input v-model="form.username" type="text" class="w-full px-3 py-2 border rounded" required />
      </div>

      <!-- Password -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">Password<span class="text-red-500">*</span></label>
        <input v-model="form.password" type="password" class="w-full px-3 py-2 border rounded" required />
      </div>

      <!-- Confirm Password -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">Confirm Password<span
            class="text-red-500">*</span></label>
        <input v-model="confirmPassword" type="password" class="w-full px-3 py-2 border rounded" required />
      </div>

      <!-- Role -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">Role<span class="text-red-500">*</span></label>
        <select v-model="form.role" class="w-full px-3 py-2 border rounded" required>
          <option disabled value="">Select Role</option>
          <option v-if="user?.role === UserRole.ADMIN" :value="UserRole.ADMIN">Admin</option>
          <option :value="UserRole.DOCTOR">Doctor</option>
          <option :value="UserRole.STAFF">Staff</option>
        </select>
      </div>

      <!-- Phone -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">Phone Number<span
            class="text-red-500">*</span></label>
        <input v-model="phoneNumber" type="text" class="w-full px-3 py-2 border rounded" required />
      </div>

      <!-- Submit Button -->
      <div class="text-right pt-4">
        <button type="submit" class=" py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700">
          Create User
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { UserRole } from '@/enums/user.enum'
import { useFetch } from '@/composables/fetch'
import type { UserResponse } from '@/types/user'
import { formatPhoneNumber } from '@/directives/phoneNumber'
import { useAuthStore } from '@/stores/auth-store'

const router = useRouter()

const form = ref({
  username: '',
  password: '',
  role: '',
})

const { user } = useAuthStore()

const confirmPassword = ref("");
const phoneNumber = ref("")

const submitForm = async () => {
  if (confirmPassword.value !== form.value.password) {
    alert("Your passwords do not match")
    confirmPassword.value = "";
    form.value.password = "";
    return;
  }

  const { data, error } = await useFetch<UserResponse>('POST', '/user', {
    ...form.value,
    phoneNumber: phoneNumber.value.replace(/\D/g, '')
  })

  if (data?.errorCode || error) {
    alert(data?.msg)
    return
  }

  router.push('/user')
}

watch(phoneNumber, (newVal) => {
  const formatted = formatPhoneNumber(newVal)
  if (newVal !== formatted) {
    phoneNumber.value = formatted
  }
})
</script>
