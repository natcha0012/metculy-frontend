<template>
  <div class="h-screen w-full">
    <div v-if="name !== 'Login'">
      <NavBar></NavBar>
      <div class=" sm:pl-72 p-8 w-full">
        <RouterView />
      </div>
    </div>
    <div v-else>
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
