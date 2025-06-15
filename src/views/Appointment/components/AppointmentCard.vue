<template>
  <div class="border rounded-lg p-4 shadow bg-white space-y-3">
    <div class="flex justify-end gap-4">
      <button @click="edit">
        <img src="../../../assets/pencil.svg" height="20" width="20">
      </button>
      <button @click="emit('delete')">
        <img src="../../../assets/trash.svg" height="20" width="20">
      </button>
    </div>
    <div class=" flex gap-4 items-center">
      <h2>Title</h2>
      <input v-if="isEdit" v-model="local.title" type="text" class="w-full px-3 py-2 border rounded" />
      <h2 v-else>{{ local.title }}</h2>
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Description</label>
      <textarea :disabled="!isEdit" v-model="local.description" class="w-full px-3 py-2 border rounded" rows="3" />
    </div>

    <div class="flex flex-row flex-wrap gap-4">
      <div class="flex flex-col flex-grow">
        <label class="block text-sm font-medium mb-1">Date</label>
        <input :disabled="!isEdit" v-model="local.date" type="date" class="w-full px-3 py-2 border rounded" />
      </div>

      <div class="flex flex-col flex-grow">
        <label class="block text-sm font-medium mb-1">Doctor</label>
        <v-autocomplete v-model="local.doctorId" :disabled="!isEdit" :items="doctorOptions" item-title="name"
          item-value="id" variant="outlined" density="compact" placeholder="Select doctor" />
      </div>

    </div>

    <!-- Buttons -->
    <div v-if="isEdit" class="flex justify-end gap-2">
      <button @click="cancel" class="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
      <button @click="save" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
    </div>
  </div>
</template>

<style>
.v-input--disabled .v-input__control {
  background-color: rgba(239, 239, 239, 0.3)
}
</style>

<script setup lang="ts">
import { useFetch } from '@/composables/fetch';
import type { AppointmentResponse } from '@/types/appointment';
import { ref, } from 'vue'

const props = defineProps<{
  appointment: AppointmentResponse,
  doctorOptions: { id: number; name: string }[]
}>()

const emit = defineEmits<{
  delete: []
}>()

const isEdit = ref(false);

const edit = () => {
  isEdit.value = true;
}

const local = ref({ ...props.appointment })


const save = async () => {
  const requestBody = {
    title: local.value.title,
    date: local.value.date,
    patientId: local.value.patientId,
    description: local.value.description,
  }
  const { data, error } = await useFetch<{ id: number; name: string }[]>('PATCH', `/appointment/${props.appointment.id}`, requestBody);
  if (data?.errorCode || error) {
    alert(data?.msg)
    return
  }
  isEdit.value = false

}
const cancel = () => {
  isEdit.value = false;
}
</script>
