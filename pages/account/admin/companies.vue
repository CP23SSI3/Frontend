<template>
  <div>
    <div class="flex flex-col gap-2">
      <!-- <div class="grid grid-cols-4">
        <BaseInput
          class="col-span-1s"
          label=""
          type="search"
          id="search"
          placeholder="Search company"
          :iconInput="MagnifyingGlassIcon"
          v-model="searchValue"
        ></BaseInput>
      </div> -->
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
        <template #item-compName="item">
          <div class="flex items-center w-full gap-4 text-sm text-gray-500">
            <BaseProfile
              company
              size="L"
              :fname="wordForProfileCompany(item.compName, 0)"
              :lname="wordForProfileCompany(item.compName, 1)"
            />
            <BaseItemDesc
              class="max-w-sm"
              :text="item.compName"
              :desc="item.compDesc"
            />
          </div>
        </template>
        <!-- <template #item-compDesc="{ compDesc }">
          <div class="flex w-full gap-4 text-sm text-gray-500">
            {{ compDesc }}
          </div>
        </template> -->
        <template #item-address="item">
          <div
            class="flex w-full gap-4 text-sm text-gray-500"
            v-if="item.address != null"
          >
            {{
              `${item.address.area} ${item.address.subDistrict} ${item.address.district} ${item.address.city} ${item.address.postalCode} `
            }}
          </div>
          <div v-else class="flex w-full gap-4 text-sm text-gray-500">-</div>
        </template>
        <template #item-createdDate="{ createdDate }">
          <div class="text-sm text-gray-500 whitespace-normal">
            {{ moment(createdDate).format('DD-MM-YYYY') }}
            <br />
            {{ moment(createdDate).format('hh:mm ') }}
          </div>
        </template>
      </EasyDataTable>
    </div>
  </div>
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
import moment from 'moment'
const props = defineProps({
  myUser: {
    type: Object,
    required: false
  }
})
type UserData = User & {
  address: Address
  company: Company | null
}

const wordForProfileCompany = (compName: string, index: number) => {
  let words = compName.split(' ')
  return words[index]
}

const searchValue = ref('')

// --- GET : List Company ---
const loading = ref(false)
const headers: Header[] = [
  { text: 'NAME', value: 'compName', width: 500 },
  { text: 'Address', value: 'address' },
  { text: 'CREATED DATE', value: 'createdDate', width: 120 }
]
const items = ref<Item>([])

// --- Pagination ---
const totalItems = ref()

const serverOptions = ref<ServerOptions>({
  page: 1,
  rowsPerPage: 10
})

const serverItemsLength = ref(0)

const getCompanyList = async () => {
  loading.value = true
  try {
    const res = await useCompany({
      pageNumber: serverOptions.value.page - 1,
      pageSize: serverOptions.value.rowsPerPage
    })
    console.log(res.value)
    if (res.value) {
      let data = res.value.data
      serverOptions.value.page = data.number + 1
      serverOptions.value.rowsPerPage = data.size
      serverItemsLength.value = data.totalElements
      totalItems.value = data.totalElements
      items.value = data.content
    }
  } catch (error) {
    console.log(error)
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'Error',
      text: "Can't view company list"
    })
  }
  loading.value = false
}
await getCompanyList()

watch(
  [serverOptions, serverItemsLength],
  async () => {
    await getCompanyList()
  },
  { deep: true }
)

// -- style EasyDataTable --
const headerItemClassNameFunction: HeaderItemClassNameFunction = (
  header: Header,
  columnNumber: number
): string => 'text-left text-sm leading-7 font-semibold sm:pl-6'
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
