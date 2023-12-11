<template>
  <!-- Filter -->
  <BaseSectionContent
    class="hidden col-span-1 gap-2 px-5 py-5 min-h-fit lg:flex lg:flex-col"
  >
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <BaseTitleForm>Search</BaseTitleForm>
        <BaseItem
          @click="clearSearch"
          class="cursor-pointer hover:text-gray-800"
          :icon="ArrowPathIcon"
          >clear</BaseItem
        >
      </div>
      <BaseInput
        label="Search"
        type="search"
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
        <!-- *search by portTagList -->
        <BaseLabel id="position">ชื่อตำแหน่งงาน</BaseLabel>
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
            @click="clearFilter"
            class="cursor-pointer hover:text-gray-800"
            :icon="ArrowPathIcon"
            >clear</BaseItem
          >
        </div>

        <BaseInputGroup
          label="ระยะเวลาที่ทำงาน"
          id="price"
          type="number"
          :icon="BriefcaseIcon"
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
</template>

<script setup>
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
  StarIcon as ActiveStarIcon
} from '@heroicons/vue/20/solid'
const filter = ref({
  search: '',
  category: { id: 0, text: '--เลือกหมวดหมู่--', value: 'default' },
  position: [],
  workMonth: { amount: null, unit: 'เดือน' },
  salaryRange: { min: 300, max: 600 },
  location: '',
  status: { id: 0, text: '--เลือก--', value: 'default' }
})

const clearSearch = () => {
  filter.value.search = ''
  filter.value.category = { id: 0, text: '--เลือกหมวดหมู่--', value: 'default' }
  filter.value.position = []
}

const clearFilter = () => {
  filter.value.workMonth = { amount: null, unit: 'เดือน' }
  filter.value.salaryRange = { min: 300, max: 600 }
  filter.value.location = ''
  filter.value.status = { id: 0, text: '--เลือก--', value: 'default' }
}

const categoryLists = [
  { id: 0, text: '--เลือกหมวดหมู่--', value: 'default' },
  { id: 1, text: 'ไอที', value: 'IT' },
  { id: 2, text: 'งานช่าง', value: 'Engineer' },
  { id: 3, text: 'บัญชี', value: 'Accountant' }
]
const statusLists = [
  { id: 0, text: '--เลือก--', value: 'default' },
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
