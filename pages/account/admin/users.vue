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
    <!-- <NuxtLink :to="{ path: '/internship/form' }">
          <BaseButton :leadingIcon="PlusCircleIcon" class="w-full md:w-auto"
            >Add Post</BaseButton
          >
        </NuxtLink> -->
  </div>
  <EasyDataTable
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
    <template #item-username="item">
      <div class="flex w-full gap-4 text-sm text-gray-500">
        <BaseItemDesc :text="`${item.username}`" :desc="item.userId" />
      </div>
    </template>
    <template #item-name="item">
      <div class="flex w-full gap-4 text-sm text-gray-500">
        <BaseItemDesc
          :text="`${item.firstname} ${item.lastname}`"
          :desc="item.email"
        />
      </div>
    </template>
    <template #item-phoneNumber="{ phoneNumber }">
      <div class="text-sm text-gray-500 whitespace-normal">
        {{ formatPhoneNumber(phoneNumber) }}
      </div>
    </template>
    <template #item-address="item">
      <div class="flex w-full gap-4 text-sm text-gray-500">
        {{
          `${item.address.area} แขวง${item.address.subDistrict} เขต${item.address.district}, ${item.address.city}  ${item.address.postalCode}`
        }}
      </div>
    </template>
  </EasyDataTable>
</template>

<script lang="ts" setup>
import type {
  Header,
  Item,
  ServerOptions,
  HeaderItemClassNameFunction
} from 'vue3-easy-data-table'
import { User } from '~/types/User'
import { Address, Company } from '~/types/Post'
import Swal from 'sweetalert2'

type UserData = User & {
  address: Address
  company: Company | null
}

// --- GET : List User ---
const loading = ref(false)
// const listUser = ref([])

const items = ref<Item>([])

// --- Pagination ---
const totalItems = ref()
const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  itemPerPages: 10
})

const serverOptions = ref<ServerOptions>({
  page: 1,
  rowsPerPage: 20
})

const serverItemsLength = ref(0)

const getUserList = async () => {
  loading.value = true
  try {
    const res = await useUser({
      // page: pagination.value.currentPage - 1,
      // pageSize: pagination.value.itemPerPages
      page: serverOptions.value.page - 1,
      pageSize: serverOptions.value.rowsPerPage
    })
    if (res.value) {
      let data = res.value.data
      // pagination.value.currentPage = data.number + 1
      // pagination.value.totalPages = data.totalPages
      // pagination.value.itemPerPages = data.size
      serverOptions.value.page = data.number + 1
      serverOptions.value.rowsPerPage = data.size
      serverItemsLength.value = data.totalElements
      totalItems.value = data.totalElements
      // listUser.value = data.content
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
  { text: 'USERNAME / USER ID', value: 'username' },
  // { text: 'USER ID', value: 'userId' },
  { text: 'NAME', value: 'name' },
  { text: 'PHONE', value: 'phoneNumber' },
  { text: 'ADDRESS', value: 'address' }
]

// -- style EasyDataTable --
const headerItemClassNameFunction: HeaderItemClassNameFunction = (
  header: Header,
  columnNumber: number
): string => 'text-left text-sm leading-7 font-semibold sm:pl-6'

const formatPhoneNumber = (phoneNumber: string) => {
  var cleaned = ('' + phoneNumber).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3]
  }
  return phoneNumber
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
