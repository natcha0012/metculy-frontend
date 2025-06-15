<template>
  <div class="mx-auto bg-white p-6">
    <h1 class="text-2xl font-bold mb-8">
      Appointment
    </h1>
    <div v-if="appointments.length === 0" class="text-gray-500 text-center py-6">
      No appointments found.
    </div>

    <div class="grid gap-4">
      <AppointmentCard v-for="appt in appointments" :key="appt.id" :doctor-options="doctorOptions" :appointment="appt"
        @delete="emit('delete', appt.id)" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { AppointmentResponse } from '@/types/appointment';
import AppointmentCard from './AppointmentCard.vue'
import { onMounted, } from 'vue';
import { useFetch } from '@/composables/fetch';

defineProps<{
  appointments: AppointmentResponse[]
}>()

const emit = defineEmits<{
  delete: [number]
}>()


let doctorOptions: { id: number; name: string }[] = []

onMounted(async () => {
  const { data, error } = await useFetch<{ id: number; name: string }[]>('GET', '/user/filter-options');
  if (data?.errorCode || error) {
    alert(data?.msg)
    return
  }
  doctorOptions = data as { id: number; name: string }[]

})
</script>
