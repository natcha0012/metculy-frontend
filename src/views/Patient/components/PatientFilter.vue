<template>
  <div class="bg-white border rounded-xl shadow p-6 my-6">
    <h2 class="text-xl font-semibold mb-4">Filter Patients</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- FirstName -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
        <input type="text" v-model="filters.firstName" class="w-full px-3 py-2 border rounded-md"
          placeholder="Enter first name" />
      </div>

      <!-- LastName -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
        <input type="text" v-model="filters.lastName" class="w-full px-3 py-2 border rounded-md"
          placeholder="Enter last name" />
      </div>

      <!-- NationalID -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">NationalID</label>
        <input type="text" v-model="filters.nationalId" class="w-full px-3 py-2 border rounded-md"
          placeholder="Enter nationalID" />
      </div>

      <!-- Phone Number -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input type="text" v-model="filters.phoneNumber" class="w-full px-3 py-2 border rounded-md"
          placeholder="Enter phone number" />
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

export type PatientFilterType = {
  firstName: string | null,
  lastName: string | null,
  nationalId: string | null,
  phoneNumber: string | null,
}

const filters = ref<PatientFilterType>({
  firstName: null,
  lastName: null,
  nationalId: null,
  phoneNumber: null,


})

const emit = defineEmits<{
  (e: 'filter', payload: PatientFilterType): void
}>()

const search = () => {
  emit('filter', { ...filters.value })
}

const resetFilters = () => {
  filters.value = {
    firstName: null,
    lastName: null,
    nationalId: null,
    phoneNumber: null,


  }
  search()
}
</script>
