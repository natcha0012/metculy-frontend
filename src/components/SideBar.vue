<template>
  <div
    class="absolute top-0 left-0 sm:top-[60px] sm:w-64 w-30 z-10 h-screen px-8 py-4 bg-gray-800 text-white flex flex-col sm:translate-x-0"
    :class="[modelValue ? 'translate-x-0' : '-translate-x-full']">

    <div class=" w-full sm:hidden flex justify-end">
      <button class="text-3xl cursor-pointer" @click="toggleSideBar">&#9776;</button>
    </div>
    <router-link to="/appointment" class="block px-4 py-2 rounded hover:bg-gray-700"
      :class="route.path.startsWith('/appointment') ? 'bg-gray-700' : ''">
      Appointment
    </router-link>
    <router-link to="/user" class="block px-4 py-2 rounded hover:bg-gray-700"
      :class="route.path.startsWith('/user') ? 'bg-gray-700' : ''">
      User
    </router-link>
    <router-link to="/patient" class="block px-4 py-2 rounded hover:bg-gray-700"
      :class="route.path.startsWith('/patient') ? 'bg-gray-700' : ''">
      Patient
    </router-link>
  </div>
</template>
<script setup lang="ts">

import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const toggleSideBar = () => {
  emit("update:modelValue", !props.modelValue)
}

</script>
