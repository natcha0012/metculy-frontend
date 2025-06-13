<template>
  <div class="h-screen w-full">
    <NavBar v-if="name !== 'Login'"></NavBar>
    <div class="fixed top-[60px] left-0 sm:pl-64 w-full">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue';
import { computed } from 'vue'

const route = useRouter()
const name = computed(() => route.currentRoute.value.name?.toString() ?? '')
</script>
