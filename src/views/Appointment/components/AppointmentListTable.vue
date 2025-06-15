<template>
  <div class="overflow-x-auto rounded-md">
    <table class="min-w-full bg-white shadow text-sm">
      <thead class="bg-green-600 text-white">
        <tr>
          <th class="px-6 py-3 text-left font-semibold">Title</th>
          <th class="px-6 py-3 text-left font-semibold">Date</th>
          <th class="px-6 py-3 text-left font-semibold">Patient</th>
          <th class="px-6 py-3 text-left font-semibold">Doctor</th>
          <th class="px-6 py-3 w-[80px]"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, index) in appointments" :key="index" class="border-t">
          <td class="px-6 py-3">{{ appointment.title }}</td>
          <td class="px-6 py-3">{{ formatDate(appointment.date) }}</td>
          <td class="px-6 py-3">{{ appointment.patientName }}</td>
          <td class="px-6 py-3">{{ appointment.doctorName }}</td>
          <td class="px-6 py-3 flex justify-end gap-2">
            <button @click="emit('edit', appointment.id)"
              class="px-3 py-1 bg-white border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition">
              {{ currentUser?.role === UserRole.STAFF ? 'Info' : 'Edit' }}
            </button>
            <button v-if="currentUser?.role !== UserRole.STAFF" @click="emit('delete', appointment.id)"
              class="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition">
              Delete
            </button>
          </td>
        </tr>

        <tr v-if="appointments.length === 0">
          <td colspan="5" class="text-center py-6 text-gray-400">
            No appointments found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth-store'
import { UserRole } from '@/enums/user.enum'

defineProps<{
  appointments: {
    id: number
    title: string
    date: string // ISO string
    patientName: string
    doctorName: string
  }[]
}>()

const { user: currentUser } = useAuthStore()

const emit = defineEmits<{
  edit: [id: number]
  delete: [id: number]
}>()

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}
</script>
