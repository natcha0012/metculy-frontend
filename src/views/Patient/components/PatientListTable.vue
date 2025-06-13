<template>
  <div class="overflow-x-auto rounded-md">
    <table class="min-w-full bg-white  shadow text-sm">
      <thead class="bg-green-600 text-white">
        <tr>
          <th class="px-6 py-3 text-left font-semibold">First Name</th>
          <th class="px-6 py-3 text-left font-semibold">Last Name</th>
          <th class="px-6 py-3 text-left font-semibold">NationalID</th>
          <th class="px-6 py-3 text-left font-semibold">Phone Number</th>
          <th class="px-6 py-3  w-[80px]"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(patient, index) in patients" :key="index" class="border-t ">
          <td class="px-6 py-3">{{ patient.firstName }}</td>
          <td class="px-6 py-3 ">{{ patient.lastName }}</td>
          <td class="px-6 py-3 ">{{ patient.nationalId }}</td>
          <td class="px-6 py-3 min-w-[150px]">{{ formatPhoneNumber(patient.phoneNumber) }}</td>
          <td class="px-6 py-3 flex justify-end gap-2">
            <button @click="emit('edit', patient.id)"
              class="px-3 py-1 bg-white border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition">
              {{ currentUser?.role === UserRole.STAFF ? 'Info' : 'Edit' }}
            </button>
            <button v-if="currentUser?.role !== UserRole.STAFF" @click="emit('delete', patient.id)"
              class="px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition">
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="patients.length === 0">
          <td colspan="4" class="text-center py-6 text-gray-400">
            No patients found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">

import { formatPhoneNumber } from '@/directives/phoneNumber'
import { useAuthStore } from '@/stores/auth-store';
import { UserRole } from '@/enums/user.enum';
import type { PatientResponse } from '@/types/patient';

defineProps<{
  patients: PatientResponse[]
}>()

const { user: currentUser } = useAuthStore()
const emit = defineEmits<{
  edit: [id: number]
  delete: [id: number]
}>()
</script>
