<template>
  <div class="w-full">
    <div class="flex justify-between">
      <h1>Appointments</h1>
      <div v-if="user?.role !== UserRole.STAFF" class="flex items-center">
        <button class="px-4 py-2 border shadow rounded hover:bg-gray-200" @click="creatAppointment">
          + New Appointment
        </button>
      </div>

    </div>
    <AppointmentFilter :title-options="titleOptions" :patient-options="patientOptions" :doctor-options="doctorOptions"
      @filter="onSearch"></AppointmentFilter>
    <AppointmentListTable :appointments="appointmentList" @edit="editAppointment" @delete="deleteAppointment" />
  </div>
</template>

<script setup lang="ts">
import AppointmentFilter, { type AppointmentFilterType } from './components/AppointmentFilter.vue';
import { useAuthStore } from '@/stores/auth-store';
import { onMounted, ref } from 'vue';
import { useFetch } from '@/composables/fetch';
import AppointmentListTable from './components/AppointmentListTable.vue';
import { useRouter } from 'vue-router';
import { UserRole } from '@/enums/user.enum';
import type { AppointmentResponse } from '@/types/appointment';


const { user } = useAuthStore()
const appointmentList = ref<AppointmentResponse[]>([]);
let patientOptions: { id: number; name: string }[] = []
let doctorOptions: { id: number; name: string }[] = []
let titleOptions: { id: number; title: string }[] = []

const router = useRouter()
const fetchAppointment = (filter?: AppointmentFilterType) => useFetch<AppointmentResponse[]>('POST', '/appointment/get-by-filters', filter);

onMounted(async () => {
  const fetchPatient = () => useFetch<{ id: number; name: string }[]>('GET', '/patient/filter-options');
  const fetchDoctor = () => useFetch<{ id: number; name: string }[]>('GET', '/user/filter-options');
  const fetchTitle = () => useFetch<{ id: number; title: string }[]>('GET', '/appointment/filter-options');
  const [appointment, patients, doctors, titles] = await Promise.all([fetchAppointment(), fetchPatient(), fetchDoctor(), fetchTitle()]);
  const { data, error } = appointment
  if (data?.errorCode || error) {
    alert(data?.msg)
    return
  }
  appointmentList.value = data as AppointmentResponse[]

  if (patients.data?.errorCode || patients.error) {
    alert(patients.data?.msg)
    return
  }
  patientOptions = patients.data as { id: number; name: string }[]

  if (doctors.data?.errorCode || doctors.error) {
    alert(doctors.data?.msg)
    return
  }
  doctorOptions = doctors.data as { id: number; name: string }[]

  if (titles.data?.errorCode || titles.error) {
    alert(titles.data?.msg)
    return
  }
  titleOptions = titles.data as { id: number; title: string }[]
})

const getAppointment = async (filter: AppointmentFilterType) => {
  const { data, error } = await fetchAppointment(filter)
  if (data?.errorCode || error) {
    alert(data?.msg)
    return
  }
  appointmentList.value = data as AppointmentResponse[]
}

const creatAppointment = () => {
  router.push('/appointment/create')

}

const onSearch = (filter: AppointmentFilterType) => {
  getAppointment(filter)

}

const editAppointment = (id: number) => {
  router.push(`/appointment/${id}`)
}

const deleteAppointment = async (id: number) => {
  const { data, error } = await useFetch<AppointmentResponse[]>('DELETE', `/appointment/${id}`)

  if (data?.errorCode || error) {
    alert(data?.msg)
    return
  }

  appointmentList.value = appointmentList.value.filter((appointment) => appointment.id !== id) as AppointmentResponse[]
}

</script>
