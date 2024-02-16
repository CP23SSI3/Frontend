<template>
  <div class="flex flex-col justify-between gap-2 sm:items-center sm:flex-row">
    <div class="flex items-center gap-4">
      <!-- <h1 class="text-2xl font-bold leading-8 text-black">All users</h1>
      <span class="text-sm text-gray-400">{{ totalItems }} accounts </span> -->
      <!-- <button
            type="button"z
            class="p-2 -m-2 text-gray-400 hover:text-gray-500 lg:hidden"
            @click="openFilter()"
          >
            <span class="sr-only">Filters</span>

            <FunnelIcon class="w-5 h-5" aria-hidden="true" />
          </button> -->
    </div>
  </div>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-4">
      <BaseInput
        class="col-span-1s"
        label=""
        type="search"
        id="search"
        placeholder="Search user"
        :iconInput="MagnifyingGlassIcon"
        v-model="searchValue"
      ></BaseInput>
    </div>
    <BaseLoading v-if="loading" />
    <EasyDataTable
      v-else
      :headers="headers"
      :items="items"
      :loading="loading"
      table-class-name="customize-table"
      theme-color="#0089FF"
      :header-item-class-name="headerItemClassNameFunction"
      show-index
      v-model:server-options="serverOptions"
      :server-items-length="serverItemsLength"
      buttons-pagination
      ref="dataTable"
    >
      <template #item-index="{ index }">
        <div class="text-sm font-medium text-gray-900">
          {{ index }}
        </div>
      </template>

      <template #item-name="item">
        <div class="flex items-center w-full gap-4 text-sm text-gray-500">
          <BaseProfile :fname="item.firstname" :lname="item.lastname" />
          <BaseItemDesc
            :text="`${item.firstname} ${item.lastname}`"
            :desc="item.username"
          />
        </div>
      </template>

      <template #item-email="item">
        <div class="flex w-full gap-4 text-sm text-gray-500">
          {{ item.email }}
        </div>
      </template>
      <template #item-phoneNumber="{ phoneNumber }">
        <div class="text-sm text-gray-500 whitespace-normal">
          {{ formatPhoneNumber(phoneNumber) }}
        </div>
      </template>
      <template #item-role="item">
        <div class="flex w-full gap-4 text-sm text-gray-500">
          {{ item.role }}
        </div>
      </template>

      <template #item-createdDate="{ createdDate }">
        <div class="text-sm text-gray-500 whitespace-normal">
          {{ moment(createdDate).format('DD-MM-YYYY') }}
          <br />
          {{ moment(createdDate).format('hh:mm ') }}
        </div>
      </template>

      <template #item-operator="{ userId }">
        <div class="flex w-full gap-4 text-sm text-gray-500">
          <BaseButton
            :leadingIcon="TrashIcon"
            negative
            @click="removeUser(userId)"
          ></BaseButton>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>

<script lang="ts" setup>
import type {
  Header,
  Item,
  ServerOptions,
  HeaderItemClassNameFunction
} from 'vue3-easy-data-table'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { User } from '~/types/User'
import { Address, Company } from '~/types/Post'
import Swal from 'sweetalert2'
import moment from 'moment'

type UserData = User & {
  address: Address
  company: Company | null
}

const searchValue = ref('')

// --- GET : List User ---
const loading = ref(false)
// const listUser = ref([])

const items = ref<Item>([])

// --- Pagination ---
const totalItems = ref()

const serverOptions = ref<ServerOptions>({
  page: 1,
  rowsPerPage: 10
})

const serverItemsLength = ref(0)

const getUserList = async () => {
  loading.value = true
  try {
    const res = await useUser({
      page: serverOptions.value.page - 1,
      pageSize: serverOptions.value.rowsPerPage
    })
    if (res.value) {
      let data = res.value.data
      serverOptions.value.page = data.number + 1
      serverOptions.value.rowsPerPage = data.size
      serverItemsLength.value = data.totalElements
      totalItems.value = data.totalElements
      items.value = data.content

      // console.log(listUser.value)
      loading.value = false
    }
  } catch (error) {
    console.log(error)
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

const changePage = () => {
  getUserList()
}

const headers: Header[] = [
  // { text: 'USER ID', value: 'userId' },
  { text: 'NAME', value: 'name' },
  { text: 'EMAIL', value: 'email' },
  { text: 'PHONE', value: 'phoneNumber' },
  { text: 'ROLE', value: 'role' },
  { text: 'CREATED DATE', value: 'createdDate' },
  { text: '', value: 'operator' }
]

// -- style EasyDataTable --
const headerItemClassNameFunction: HeaderItemClassNameFunction = (
  header: Header,
  columnNumber: number
): string => 'text-left text-sm leading-7 font-semibold sm:pl-6'

const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber) {
    var cleaned = ('' + phoneNumber).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return match[1] + '-' + match[2] + '-' + match[3]
    }
    return phoneNumber
  } else {
    return '-'
  }
}

// -- Delete User ---
const removeUser = async (userId: string) => {
  Swal.fire({
    title: 'Are you sure remove this user?',
    text: 'คุณต้องการลบ User นี้หรือไม่?',
    icon: 'warning',
    confirmButtonText: 'Comfirm',
    confirmButtonColor: 'red',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: 'gray',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      fetchDeleteUser(userId)
    }
  })
}

const fetchDeleteUser = async (userId: string) => {
  try {
    const res = await useDeleteUser(userId)
    if (res.value?.status == 200) {
      Swal.fire({
        title: 'User Deleted',
        text: 'ลบชื่อผู้ใช้งานนี้เรียบร้อยแล้ว',
        icon: 'success',
        confirmButtonColor: 'blue'
      }).then(() => getUserList())
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'Error',
      text: 'ไม่สามารถลบ user นี้ได้'
    })
  }
}
</script>

<style lang="scss" scoped>
.customize-table {
  //header
  --easy-table-header-font-size: 14px;
  --easy-table-header-font-color: #6b7280;
  --easy-table-header-background-color: rgb(249 250 251 / var(--tw-bg-opacity));
  --easy-table-header-item-padding: 14px 12px;

  //body
  --easy-table-body-item-padding: 16px 12px;
  --easy-table-body-row-font-color: #111827;
  --easy-table-body-font-size: 14px;
}
</style>
