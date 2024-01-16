<template>
  <div class="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
    <div class="flex items-center gap-4">
      <h1 class="text-2xl font-bold leading-8 text-black">All users</h1>
      <!-- total element -->
      <span class="text-sm text-gray-400">{{ totalItems }} accounts </span>
      <!-- <button
            type="button"z
            class="p-2 -m-2 text-gray-400 hover:text-gray-500 lg:hidden"
            @click="openFilter()"
          >
            <span class="sr-only">Filters</span>

            <FunnelIcon class="w-5 h-5" aria-hidden="true" />
          </button> -->
    </div>
    <!-- <NuxtLink :to="{ path: '/internship/form' }">
          <BaseButton :leadingIcon="PlusCircleIcon" class="w-full md:w-auto"
            >Add Post</BaseButton
          >
        </NuxtLink> -->
  </div>
  {{ listUser }}
  <!-- Pagination -->
  <!-- <div v-if="listUser.length == 0 && !loading" class="flex justify-center">
    <BaseButton :leading-icon="ArrowPathIcon" outline @click="refresh()"
      >Refresh</BaseButton
    >
  </div> -->
  <!-- <div class="p-4 bg-white" v-else-if="!loading"> -->
  <div class="p-4 bg-white">
    <v-pagination
      v-model="pagination.currentPage"
      :pages="pagination.totalPages"
      :range-size="1"
      active-color="#DBEAFE"
      class="flex justify-center"
      @update:modelValue="changePage"
    />
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'

// --- Pagination ---
const changePage = () => {
  getPost()
}
const totalItems = ref()
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  itemPerPages: 10
})

// --- GET : List User ---
const loading = ref(false)
const listUser = ref([])

const getUserList = async () => {
  loading.value = true
  try {
    const res = await useUser({
      page: pagination.value.currentPage - 1,
      pageSize: pagination.value.itemPerPages
    })
    if (res.value) {
      let data = res.value.data
      pagination.value.currentPage = data.number + 1
      pagination.value.totalPages = data.totalPages
      pagination.value.itemPerPages = data.size
      totalItems.value = data.totalElements
      listUser.value = data.content

      console.log(listUser.value)
      loading.value = false
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'Error',
      text: 'ไม่สามารถเรียกดู list user ได้'
    })
    loading.value = false
  }
}
await getUserList()
</script>

<style lang="scss" scoped></style>
