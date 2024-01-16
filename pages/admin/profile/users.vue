<template>
  <div>User List</div>
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
