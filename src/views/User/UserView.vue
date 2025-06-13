<template>
  <div class="w-full">
    <div class="flex justify-between">
      <h1>Users</h1>
      <div v-if="user?.role !== UserRole.STAFF" class="flex items-center">
        <button class="px-4 py-2 border shadow rounded hover:bg-gray-200" @click="creatUser">
          + New User
        </button>
      </div>

    </div>
    <UserFilter @filter="onSearch"></UserFilter>
    <UserListTable :users="filteredUsers" @edit="editUser" @delete="deleteUser" />
  </div>
</template>

<script setup lang="ts">
import UserFilter, { type UserFilterType } from './components/UserFilter.vue';
import { useAuthStore } from '@/stores/auth-store';
import { UserRole } from '@/enums/user.enum';
import { onMounted, ref } from 'vue';
import { useFetch } from '@/composables/fetch';
import type { UserResponse } from '@/types/user';
import UserListTable from './components/UserListTable.vue';
import { useRouter } from 'vue-router';

const { user } = useAuthStore()
const userList = ref<UserResponse[]>([]);
const filteredUsers = ref<UserResponse[]>([]);
const router = useRouter()

onMounted(async () => {
  const { data, error } = await useFetch<UserResponse[]>('GET', '/user')

  if (data?.errorCode || error) {
    alert(data?.msg)
    return
  }

  userList.value = data as UserResponse[]
  filteredUsers.value = data as UserResponse[]
})

const creatUser = () => {
  router.push('/user/create')

}

const onSearch = (filter: UserFilterType) => {
  filteredUsers.value = userList.value;

  if (filter.username) {
    filteredUsers.value = userList.value.filter((user) => user.username.includes(filter.username!))
  }

  if (filter.role) {
    filteredUsers.value = userList.value.filter((user) => user.role === filter.role)
  }

  if (filter.phoneNumber) {
    filteredUsers.value = userList.value.filter((user) => user.phoneNumber.includes(filter.phoneNumber!))
  }

}

const editUser = (id: number) => {
  router.push(`/user/${id}`)
}

const deleteUser = async (id: number) => {
  const { data, error } = await useFetch<UserResponse[]>('DELETE', `/user/${id}`)

  if (data?.errorCode || error) {
    alert(data?.msg)
    return
  }

  userList.value = userList.value.filter((user) => user.id !== id) as UserResponse[]
  filteredUsers.value = userList.value as UserResponse[]
}

</script>
