<template>
  <div class="w-full">
    <div class="flex justify-between">
      <h1>Patients</h1>
      <div v-if="user?.role !== UserRole.STAFF" class="flex items-center">
        <button class="px-4 py-2 border shadow rounded hover:bg-gray-200" @click="creatPatient">
          + New Patient
        </button>
      </div>

    </div>
    <PatientFilter @filter="onSearch"></PatientFilter>
    <PatientListTable :patients="filteredPatients" @edit="editPatient" @delete="deletePatient" />
  </div>
</template>

<script setup lang="ts">
import PatientFilter, { type PatientFilterType } from './components/PatientFilter.vue';
import { useAuthStore } from '@/stores/auth-store';
import { onMounted, ref } from 'vue';
import { useFetch } from '@/composables/fetch';
import PatientListTable from './components/PatientListTable.vue';
import { useRouter } from 'vue-router';
import { UserRole } from '@/enums/user.enum';
import type { PatientResponse } from '@/types/patient';


const { user } = useAuthStore()
const patientList = ref<PatientResponse[]>([]);
const filteredPatients = ref<PatientResponse[]>([]);
const router = useRouter()

onMounted(async () => {
  const { data, error } = await useFetch<PatientResponse[]>('GET', '/patient')

  if (data?.errorCode || error) {
    alert(data?.msg)
    return
  }

  patientList.value = data as PatientResponse[]
  filteredPatients.value = data as PatientResponse[]
})

const creatPatient = () => {
  router.push('/patient/create')

}

const onSearch = (filter: PatientFilterType) => {
  filteredPatients.value = patientList.value;

  if (filter.firstName) {
    filteredPatients.value = patientList.value.filter((patient) => patient.firstName.includes(filter.firstName!))
  }

  if (filter.lastName) {
    filteredPatients.value = patientList.value.filter((patient) => patient.lastName === filter.lastName)
  }

  if (filter.nationalId) {
    filteredPatients.value = patientList.value.filter((patient) => patient.nationalId === filter.nationalId)
  }

  if (filter.phoneNumber) {
    filteredPatients.value = patientList.value.filter((patient) => patient.phoneNumber.includes(filter.phoneNumber!))
  }

}

const editPatient = (id: number) => {
  router.push(`/patient/${id}`)
}

const deletePatient = async (id: number) => {
  const { data, error } = await useFetch<PatientResponse[]>('DELETE', `/patient/${id}`)

  if (data?.errorCode || error) {
    alert(data?.msg)
    return
  }

  patientList.value = patientList.value.filter((patient) => patient.id !== id) as PatientResponse[]
  filteredPatients.value = patientList.value as PatientResponse[]
}

</script>
