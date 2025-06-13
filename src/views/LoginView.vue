<template>
  <div className=" w-full min-h-screen green-700 bg-[#122b23] overflow-hidden shadow-lg flex flex-col md:flex-row">
    <div className="grow order-2 md:order-1 flex justify-center">
      <div className="w-[400px] p-8 flex flex-col justify-center">
        <h2 className="text-white text-2xl font-semibold mb-6">Sign in</h2>
        <input type="text" placeholder="Username" v-model="username"
          className="w-full mb-4 px-4 py-2 bg-white rounded shadow focus:outline-none focus:ring" />
        <input type="password" placeholder="Password" v-model="password"
          className="w-full mb-4 px-4 py-2 bg-white rounded shadow focus:outline-none focus:ring" />
        <button @click="login" className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Sign In
        </button>
      </div>
    </div>

    <div
      className="order-1 md:order-2 w-full md:w-[630px] primary-bg p-8 rounded-b-2xl md:rounded-r-none md:rounded-l-2xl  flex flex-col items-center justify-center">
      <img src="/logo.svg" alt="Board Logo" className=" mb-4" width="300" height="230" priority />
      <p className="text-white italic">METCULY</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth-store'
const username = ref('')
const password = ref()

const login = async () => {
  const authStore = useAuthStore()

  await authStore.login(username.value, password.value).catch((error) => {
    console.error(error)
  })
}
</script>
