<template>
  <div class="bg-white border rounded-xl shadow p-6 my-6">
    <h2 class="text-xl font-semibold mb-4">Filter Appointments</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <v-autocomplete theme="light" v-model="filters.title" :items="titleOptions" item-title="title"
          item-value="title" placeholder="Select Title" variant="outlined" density="compact" />
      </div>

      <!-- Date -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input type="date" v-model="filters.date" class="w-full px-3 py-2 border rounded-md" />
      </div>

      <!-- Patient -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Patient</label>
        <v-autocomplete class="bg-white:hover" v-model="filters.patientId" :items="patientOptions" item-title="name"
          item-value="id" placeholder="Select Patient" variant="outlined" density="compact" />
      </div>

      <!-- Doctor -->
      <div>
        <label class="block text-sm  font-medium text-gray-700 mb-1">Doctor</label>
        <v-autocomplete v-model="filters.doctorId" :items="doctorOptions" item-title="name" item-value="id"
          placeholder="Select Doctor" variant="outlined" density="compact" />
      </div>
    </div>

    <!-- Buttons -->
    <div class="mt-4 flex justify-end gap-2">
      <button class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-200" @click="resetFilters">
        Reset
      </button>
      <button class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" @click="search">
        Search
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export type AppointmentFilterType = {
  title: string | null
  date: string | null
  patientId: number | null
  doctorId: number | null
}

defineProps<{
  patientOptions: { id: number; name: string }[],
  doctorOptions: { id: number; name: string }[],
  titleOptions: { id: number; title: string }[],
}>()

const filters = ref<AppointmentFilterType>({
  title: null,
  date: null,
  patientId: null,
  doctorId: null,
})

const emit = defineEmits<{
  (e: 'filter', payload: AppointmentFilterType): void
}>()

const search = () => {
  emit('filter', { ...filters.value })
}

const resetFilters = () => {
  filters.value = {
    title: null,
    date: null,
    patientId: null,
    doctorId: null,
  }
  search()
}
</script>
