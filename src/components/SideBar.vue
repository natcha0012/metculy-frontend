<template>
  <div class="relative">
    <div
      class="absolute top-0 left-0  sm:w-64 w-[190px] z-10 h-screen px-8 py-4 bg-gray-800 text-white flex flex-col sm:translate-x-0"
      :class="[modelValue ? 'translate-x-0' : '-translate-x-full']">

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
    <div class="fixed top-0 left-0 sm:w-64 px-8 py-4 w-[190px] sm:translate-x-0  bg-gray-800 h-screen"
      :class="[modelValue ? 'translate-x-0' : '-translate-x-full']">
      <div class=" w-full text-white  sm:hidden flex justify-end">
        <button class="text-3xl cursor-pointer" @click="toggleSideBar">&#9776;</button>
      </div>
    </div>
    <div class="fixed bottom-4 left-8 z-20">
      <button @click="logout"
        class="px-3 py-1 border border-white text-white rounded hover:bg-white hover:text-black transition">
        Logout
      </button>
    </div>

  </div>
</template>
<script setup lang="ts">

import { useAuthStore } from '@/stores/auth-store';
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits(['update:modelValue'])

const { logout } = useAuthStore()

const toggleSideBar = () => {
  emit("update:modelValue", !props.modelValue)
}

</script>
