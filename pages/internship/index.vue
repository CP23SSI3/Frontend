<template>
  {{ filter }}

  <!-- Filter -->
  <div class="grid items-start grid-cols-4 gap-6">
    <BaseSectionContent
      class="hidden col-span-1 gap-2 px-5 py-5 min-h-fit lg:flex lg:flex-col"
    >
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <BaseTitleForm>Search</BaseTitleForm>
          <BaseItem
            class="cursor-pointer hover:text-gray-800"
            :icon="ArrowPathIcon"
            >clear</BaseItem
          >
        </div>
        <BaseInput
          label="Search"
          id="search"
          placeholder="name company, post"
          :iconInput="MagnifyingGlassIcon"
          v-model="filter.search"
        ></BaseInput>
        <BaseDropdown
          :option-lists="categoryLists"
          label="หมวดหมู่งาน"
          v-model="filter.category"
        >
        </BaseDropdown>

        <div>
          <BaseLabel>ชื่อตำแหน่งงาน</BaseLabel>
          <Multiselect
            v-model="filter.position"
            mode="tags"
            :close-on-select="false"
            :searchable="true"
            :create-option="true"
            :options="options"
            class="multiselect-blue"
          />
        </div>
        <BaseLine />
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between">
            <BaseTitleForm>Filter</BaseTitleForm>
            <BaseItem
              class="cursor-pointer hover:text-gray-800"
              :icon="ArrowPathIcon"
              >clear</BaseItem
            >
          </div>

          <BaseInputGroup
            label="ระยะเวลาที่ทำงาน"
            id="price"
            type="number"
            v-model:amount="filter.workMonth.amount"
            v-model:unit="filter.workMonth.unit"
            unitSelect
          ></BaseInputGroup>

          <BaseInput
            label="สถานที่ฝึกงาน"
            id="location"
            :icon="MapPinIcon"
            placeholder="ชื่อจังหวัด / แขวง / เขต"
            v-model="filter.location"
          ></BaseInput>

          <BaseDropdown
            :option-lists="statusLists"
            label="การรับสมัคร"
            v-model="filter.status"
          >
          </BaseDropdown>
        </div>
      </div>
    </BaseSectionContent>

    <!-- List Post -->
    <div class="flex flex-col w-full col-span-4 gap-2 lg:col-span-3">
      <BaseSectionContent class="px-5 py-5" v-for="(item, index) in 5">
        <div class="flex items-start gap-2 mb-3 lg:gap-6">
          <nuxt-img
            class="w-12 h-12 rounded-sm shadow-md bg-gray-50"
            src="/logo-test.png"
            alt="Your Company"
          />

          <!-- <div class="flex flex-col w-full gap-2"> -->
          <div class="flex flex-col-reverse lg:flex-col">
            <div class="text-sm lg:text-lg">
              ประชาสัมพันธ์ บริษัทรับนักศึกษาฝึกงานค่ะ ตามรายละเอียดด้านล่างค่ะ
            </div>

            <div class="flex gap-2">
              <div class="text-xs font-semibold leading-6 lg:text-sm">
                แอทโมสฟ์ ดิจิทัล โซลูชั่นส์ almosph.com
              </div>
              <BaseBadge color="green" class="hidden lg:flex"
                >เปิดรับตลอด</BaseBadge
              >
            </div>
          </div>

          <!-- </div> -->
        </div>

        <div class="flex flex-col gap-2 lg:ml-[70px]">
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(item, index) in listPosition"
              class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md lg:px-3 lg:text-sm"
              >{{ item }}</span
            >
          </div>

          <div
            class="flex flex-col gap-2 md:items-end xl:items-center md:justify-between md:flex-row"
          >
            <div class="flex flex-col xl:flex-row xl:space-x-6">
              <BaseItem :icon="BriefcaseIcon">4-6 เดือน</BaseItem>
              <BaseItem :icon="CurrencyDollarIcon">100-120 บาท/วัน</BaseItem>
              <BaseItem :icon="MapPinIcon"
                >สีลม เขตบางรัก กรุงเทพมหานคร</BaseItem
              >
            </div>
            <NuxtLink
              :to="{
                path: `/internship/${index}`
              }"
            >
              <BaseButton :trailingIcon="Bars3BottomLeftIcon" outline>
                ดูรายละเอียด
              </BaseButton></NuxtLink
            >
          </div>
        </div>
      </BaseSectionContent>
    </div>
  </div>
</template>

<script setup>
// definePageMeta({
//   layout: 'filter'
// })

import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon
} from '@heroicons/vue/20/solid'

const filter = ref({
  search: '',
  category: { id: 0, text: '--Select--', value: 'default' },
  position: [],
  workMonth: { amount: null, unit: 'เดือน' },
  salary: 0,
  location: '',
  status: { id: 0, text: '--Select--', value: 'default' }
})

const categoryLists = [
  { id: 0, text: '--Select--', value: 'default' },
  { id: 1, text: 'ไอที', value: 'IT' },
  { id: 2, text: 'งานช่าง', value: 'Engineer' },
  { id: 3, text: 'บัญชี', value: 'Accountant' }
]
const statusLists = [
  { id: 1, text: 'เปิดรับตลอด', value: true },
  { id: 2, text: 'ใกล้ปิดรับสมัคร', value: false }
]

const options = [
  'Frontend',
  'Backend',
  'UX/UI',
  'Developer',
  'Dev',
  'Full stack'
]

const listPosition = ['Frontend', 'Backend', 'Developer', 'Infrastructure']
</script>

<style lang="scss" scoped>
.multiselect-blue {
  --ms-tag-bg: #dbeafe;
  --ms-tag-color: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
}
</style>
