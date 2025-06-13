<template>
  <div class="bg-white border rounded-xl shadow p-6 my-6">
    <h2 class="text-xl font-semibold mb-4">Filter Users</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Username -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input type="text" v-model="filters.username" class="w-full px-3 py-2 border rounded-md"
          placeholder="Enter username" />
      </div>

      <!-- Role -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select v-model="filters.role" class="w-full px-3 py-2 border rounded-md">
          <option :value="null">All</option>
          <option :value="UserRole.ADMIN">Admin</option>
          <option :value="UserRole.DOCTOR">Doctor</option>
          <option :value="UserRole.STAFF">Staff</option>
        </select>
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
import { UserRole } from '@/enums/user.enum';

export type UserFilterType = {
  username: string | null,
  role: UserRole | null,
  phoneNumber: string | null,
}

const filters = ref<UserFilterType>({
  username: null,
  role: null,
  phoneNumber: null
})

const emit = defineEmits<{
  (e: 'filter', payload: UserFilterType): void
}>()

const search = () => {
  emit('filter', { ...filters.value })
}

const resetFilters = () => {
  filters.value = { username: null, role: null, phoneNumber: null }
  search()
}
</script>
