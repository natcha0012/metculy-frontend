<template>
  <nav class=" flex h-[60px] items-center justify-between primary-bg px-4 py-3 text-white">
    <div class=" sm:hidden">
      <button class="text-3xl cursor-pointer" @click="toggleSideBar">&#9776;</button>
    </div>
    <div class="flex justify-end gap-2 w-full">
      <img src="../assets/user.svg" height="30" width="30">
      <div>
        {{ user?.username }}
      </div>

    </div>
  </nav>
  <SideBar v-model="isShowSideBar"></SideBar>
</template>
<script setup lang="ts">

import router from '@/router';
import { useAuthStore } from '@/stores/auth-store'
import SideBar from './SideBar.vue';
import { ref } from 'vue';

const { user } = useAuthStore()
if (!user) {
  router.push('/login')
}

const isShowSideBar = ref(false)
const toggleSideBar = () => {
  isShowSideBar.value = !isShowSideBar.value
}
</script>
