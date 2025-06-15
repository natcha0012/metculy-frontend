<template>
  <div class="mx-auto bg-white p-6">
    <h1 class="text-2xl font-bold mb-8">
      {{ appointmentId ? 'Edit Appointment' : 'Create Appointment' }}
    </h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Title -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:min-w-[150px] text-sm font-medium mb-1">Title<span class="text-red-500">*</span></label>
        <div v-if="user?.role === UserRole.STAFF">{{ form.title }}</div>
        <input v-else v-model="form.title" type="text" class="w-full px-3 py-2 border rounded" required />
      </div>

      <!-- Date -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:min-w-[150px] text-sm font-medium mb-1">Date<span class="text-red-500">*</span></label>
        <div v-if="user?.role === UserRole.STAFF">{{ form.date }}</div>
        <input v-else v-model="form.date" type="date" class="w-full px-3 py-2 border rounded" required />
      </div>

      <!-- Patient -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">Patient<span class="text-red-500">*</span></label>
        <div v-if="user?.role === UserRole.STAFF">{{ patientName }}</div>
        <v-autocomplete v-else v-model="form.patientId" :items="patientOptions" item-title="name" item-value="id"
          placeholder="Select patient" variant="outlined" density="compact" />
      </div>

      <!-- Doctor -->
      <div class="sm:flex sm:items-center sm:gap-2">
        <label class="block sm:w-[150px] text-sm font-medium mb-1">Doctor<span class="text-red-500">*</span></label>
        <div v-if="user?.role === UserRole.STAFF">{{ doctorName }}</div>
        <v-autocomplete v-else v-model="form.doctorId" :items="doctorOptions" item-title="name" item-value="id"
          placeholder="Select doctor" variant="outlined" density="compact" />
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium mb-1">Description</label>

        <textarea v-model="form.description" rows="3" class="w-full px-3 py-2 border rounded"
          :disabled="user?.role === UserRole.STAFF" placeholder="Enter description"></textarea>
      </div>

      <!-- Buttons -->
      <div v-if="user?.role !== UserRole.STAFF" class="flex justify-end gap-2 pt-4">
        <button type="button" class="px-4 py-2 border shadow rounded hover:bg-gray-200" @click="cancel">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          {{ appointmentId ? 'Save' : 'Create' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import { useFetch } from '@/composables/fetch'
import { UserRole } from '@/enums/user.enum'
import type { AppointmentResponse } from '@/types/appointment'

const router = useRouter()
const route = useRoute()
const { user } = useAuthStore()

const appointmentId = Number(route.params.id)

const form = ref({
  title: '',
  date: '',
  patientId: null as number | null,
  doctorId: null as number | null,
  description: '',
})

const patientOptions = ref<{ id: number; name: string }[]>([])
const doctorOptions = ref<{ id: number; name: string }[]>([])

const doctorName = ref<string>();
const patientName = ref<string>();

onMounted(async () => {

  const fetchPatient = () => useFetch<{ id: number; name: string }[]>('GET', '/patient/filter-options');
  const fetchDoctor = () => useFetch<{ id: number; name: string }[]>('GET', '/user/filter-options');
  const [patients, doctors,] = await Promise.all([fetchPatient(), fetchDoctor()]);

  if (patients.data?.errorCode || patients.error) {
    alert(patients.data?.msg)
    return
  }
  patientOptions.value = patients.data as { id: number; name: string }[]

  if (doctors.data?.errorCode || doctors.error) {
    alert(doctors.data?.msg)
    return
  }
  doctorOptions.value = doctors.data as { id: number; name: string }[]

  if (appointmentId) {
    const { data, error } = await useFetch<AppointmentResponse>('GET', `/appointment/${appointmentId}`)
    if (data?.errorCode || error) {
      alert(data?.msg || 'Error loading appointment')
      return
    }
    doctorName.value = data?.doctorName;
    patientName.value = data?.patientName;

    form.value = {
      title: data!.title,
      date: data!.date,
      patientId: data!.patientId,
      doctorId: data!.doctorId,
      description: data!.description || '',
    }
  } else if (user?.role === UserRole.DOCTOR) {
    form.value.doctorId = user.id
  }
})

const submitForm = async () => {
  const method = appointmentId ? 'PATCH' : 'POST'
  const url = appointmentId ? `/appointment/${appointmentId}` : '/appointment'

  const { data, error } = await useFetch<string>(method, url, form.value)
  if (data?.errorCode || error) {
    alert(data?.msg || 'An error occurred')
    return
  }

  router.push('/appointment')
}

const cancel = () => {
  router.push('/appointment')
}
</script>
