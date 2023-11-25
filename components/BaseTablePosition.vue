<template>
  <div>
    <EasyDataTable
      :headers="headers"
      :items="items"
      :header-item-class-name="headerItemClassNameFunction"
      hide-footer
      table-class-name="customize-table"
      class="rounded-md shadow-sm h-fit"
      sort-by="openPositionTitle"
      sort-type="asc"
    >
      <template
        #item-openPositionTitle="{ openPositionTitle, openPositionDesc }"
      >
        <div class="text-sm text-gray-500 whitespace-normal">
          <div class="text-sm font-semibold text-gray-900">
            {{ openPositionTitle }}
          </div>
          <div class="text-sm font-medium text-gray-500 capitalize">
            {{ openPositionDesc }}
          </div>
        </div>
      </template>
      <template #item-workMonth="{ workMonth }">
        <div class="text-sm text-gray-500 whitespace-normal">
          {{ workMonth }} เดือน
        </div>
      </template>
      <template #item-salary="{ salary }">
        <div class="text-sm text-gray-500 whitespace-normal">
          {{ salary ? salary + ' บาท/วัน' : 'ไม่ระบุ' }}
        </div>
      </template>
      <template #item-openPositionNum="{ openPositionNum }">
        <div class="text-sm text-gray-500 whitespace-normal">
          {{ openPositionNum }} คน
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>
<script lang="ts" setup>
import type {
  Header,
  Item,
  HeaderItemClassNameFunction
} from 'vue3-easy-data-table'
import type { Position } from '@/types/Post'

const props = defineProps({
  list: {
    type: Array,
    required: true
  }
})

const headers: Header[] = [
  { text: 'ตำแหน่งที่เปิดรับ', value: 'openPositionTitle', width: 200 },
  { text: 'ระยะเวลาการฝึกงาน', value: 'workMonth', width: 100 },
  { text: 'ค่าตอบแทน', value: 'salary', width: 120 },
  { text: 'จำนวนที่เปิดรับ', value: 'openPositionNum', width: 100 }
]

const items: Item[] = props.list

const headerItemClassNameFunction: HeaderItemClassNameFunction = (
  header: Header,
  columnNumber: number
): string => 'text-left text-sm font-semibold sm:pl-6'
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
  --da0d4328: 50px !important;

  --easy-table-body-row-hover-background-color: #fff;
}
</style>
