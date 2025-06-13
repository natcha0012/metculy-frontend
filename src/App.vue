<template>
  <div class="h-screen w-full">
    <NavBar v-if="name !== 'Login'"></NavBar>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue';
import { computed } from 'vue'

const route = useRouter()
const name = computed(() => route.currentRoute.value.name?.toString() ?? '')
</script>
