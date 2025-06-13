<template>
  <nav class=" h-[70px] p-2 pl-6 text-base flex items-center">
    username {{ user?.username }}
  </nav>
</template>
<script setup lang="ts">

import router from '@/router';
import { useAuthStore } from '@/stores/auth-store'

const { user } = useAuthStore()
if (!user) {
  router.push('/login')
}
</script>
