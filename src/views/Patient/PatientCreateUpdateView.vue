<template>
  <div class="mx-auto bg-white p-6">
    <h1 class="text-2xl font-bold mb-8">
      {{ patientId ? 'Edit Patient' : 'Create Patient' }}
    </h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- First Name -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">
          First Name<span class="text-red-500">*</span>
        </label>
        <div v-if="user?.role === UserRole.STAFF">{{ form.firstName }}</div>
        <input v-else v-model="form.firstName" type="text" class="w-full px-3 py-2 border rounded" required />
      </div>

      <!-- Last Name -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">
          Last Name<span class="text-red-500">*</span>
        </label>
        <div v-if="user?.role === UserRole.STAFF">{{ form.lastName }}</div>
        <input v-else v-model="form.lastName" type="text" class="w-full px-3 py-2 border rounded" required />
      </div>

      <!-- National ID -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">
          National ID<span class="text-red-500">*</span>
        </label>
        <div v-if="user?.role === UserRole.STAFF">{{ form.nationalId }}</div>
        <input v-else v-model="form.nationalId" :maxlength="13" type="text" class="w-full px-3 py-2 border rounded"
          required />
      </div>

      <!-- Phone Number -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">
          Phone Number<span class="text-red-500">*</span>
        </label>
        <div v-if="user?.role === UserRole.STAFF">{{ phoneNumber }}</div>
        <input v-else v-model="phoneNumber" type="text" class="w-full px-3 py-2 border rounded" required />
      </div>

      <!-- Submit -->
      <div v-if="user?.role !== UserRole.STAFF" class="flex justify-end gap-2 pt-4">
        <button type="button" class="px-4 py-2 border shadow rounded hover:bg-gray-200" @click="cancel">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          {{ patientId ? 'Save' : 'Create' }}
        </button>
      </div>
    </form>

  </div>
  <AppointmentCard v-if="patientId"></AppointmentCard>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '@/composables/fetch'
import type { PatientResponse } from '@/types/patient'
import { formatPhoneNumber } from '@/directives/phoneNumber'
import AppointmentCard from './components/AppointmentCard.vue'
import { useAuthStore } from '@/stores/auth-store'
import { UserRole } from '@/enums/user.enum'

const router = useRouter()
const route = useRoute()
const { user } = useAuthStore()
const patientId = Number(route.params.id)

const form = ref({
  firstName: '',
  lastName: '',
  nationalId: '',
})

const phoneNumber = ref('')

const submitForm = async () => {
  const payload = {
    ...form.value,
    phoneNumber: phoneNumber.value.replace(/\D/g, ''),
  }

  const method = patientId ? 'PATCH' : 'POST'
  const url = patientId ? `/patient/${patientId}` : '/patient'

  const { data, error } = await useFetch<string>(method, url, payload)
  if (data?.errorCode || error) {
    alert(data?.msg || 'An error occurred')
    return
  }

  router.push('/patient')
}

onMounted(async () => {
  if (!patientId) return

  const { data, error } = await useFetch<PatientResponse>('GET', `/patient/${patientId}`)
  if (data?.errorCode || error) {
    alert(data?.msg || 'An error occurred')
    return
  }

  form.value = {
    firstName: data!.firstName,
    lastName: data!.lastName,
    nationalId: data!.nationalId,
  }
  phoneNumber.value = data!.phoneNumber
})

const cancel = () => {
  router.push('/patient')
}

watch(phoneNumber, (newVal) => {
  const formatted = formatPhoneNumber(newVal)
  if (newVal !== formatted) {
    phoneNumber.value = formatted
  }
})
</script>
