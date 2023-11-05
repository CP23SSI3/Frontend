<template>
  <BaseLoading v-if="loading" />
  <!-- Filter -->
  <div v-else class="grid items-start grid-cols-4 gap-6">
    <BaseSectionContent
      class="hidden col-span-1 gap-2 px-5 py-5 min-h-fit lg:flex lg:flex-col"
    >
      <div class="flex flex-col gap-4">
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

    <!-- List Post -->
    <div
      class="flex flex-col w-full col-span-4 gap-4 px-1 lg:col-span-3 sm:px-0"
    >
      <!-- Topic -->
      <div
        class="flex flex-col justify-between gap-2 sm:items-center sm:flex-row"
      >
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-bold leading-8 text-black">
            Internship List
          </h1>
          <span class="text-sm text-gray-400">2 posts</span>
        </div>
        <BaseButton :leadingIcon="PlusCircleIcon">New Post</BaseButton>
      </div>

      <!-- List -->
      <div class="flex flex-col w-full col-span-4 gap-2 lg:col-span-3">
        <BaseSectionContent class="px-5 py-5" v-for="(post, index) in listPost">
          <div class="flex items-start justify-between mb-3">
            <div class="flex gap-2 lg:gap-6">
              <nuxt-img
                class="w-12 h-12 rounded-sm shadow-md bg-gray-50"
                src="/logo-test.png"
                alt="Your Company"
              />
              <div class="flex flex-col-reverse lg:flex-col">
                <h2 class="text-sm font-semibold lg:text-lg">
                  {{ post.title }}
                </h2>

                <div class="flex items-center gap-2">
                  <div
                    class="text-xs font-semibold leading-6 text-gray-600 lg:text-sm"
                  >
                    {{ post.comp.compName }}
                  </div>
                  <span class="text-xs text-gray-500">
                    {{
                      moment(new Date(post.createdDate)).format('DD/MM/YYYY')
                    }}
                  </span>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <BaseBadge
                :color="statusClosedDate(post.closedDate).color"
                class="hidden sm:flex"
              >
                {{ statusClosedDate(post.closedDate).text }}
              </BaseBadge>

              <!-- *เดี๋ยวมาทำ statusStar ผูกกับ Object Post -->
              <component
                :is="statusStar ? ActiveStarIcon : StarIcon"
                :class="[
                  statusStar ? 'text-yellow-500' : 'text-gray-500',
                  'shrink-0 h-6 w-6 cursor-pointer'
                ]"
                aria-hidden="true"
                @click="changeStarButton()"
              />
            </div>
          </div>

          <div class="flex flex-col gap-2 lg:ml-[70px]">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(item, index) in post.openPositionList"
                class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-md lg:text-sm"
                >{{ item.openPositionTitle }}</span
              >
            </div>

            <div
              class="flex flex-col gap-2 md:items-end xl:items-center md:justify-between md:flex-row"
            >
              <div class="flex flex-col gap-1 xl:flex-row xl:space-x-6">
                <BaseItem :icon="BriefcaseIcon">{{
                  post.rangeData.workMonth.all.length > 1 &&
                  post.rangeData.workMonth.min != post.rangeData.workMonth.max
                    ? `${post.rangeData.workMonth.min} - ${post.rangeData.workMonth.max} เดือน`
                    : `${post.rangeData.workMonth.all[0]} เดือน`
                }}</BaseItem>
                <BaseItem :icon="CurrencyDollarIcon">{{
                  post.rangeData.salary.all.length > 1 &&
                  post.rangeData.salary.min != post.rangeData.salary.max
                    ? `${post.rangeData.salary.min} - ${post.rangeData.salary.max} บาทต่อวัน`
                    : `${post.rangeData.salary.all[0]} บาท/วัน`
                }}</BaseItem>
                <BaseItem :icon="MapPinIcon">{{
                  `${post.address.subDistrict} ${post.address.district}, ${post.address.city} `
                }}</BaseItem>
              </div>
              <NuxtLink
                :to="{
                  path: `/internship/${post.postId}`
                }"
              >
                <BaseButton :trailingIcon="Bars3BottomLeftIcon" outline full>
                  ดูรายละเอียด
                </BaseButton>
              </NuxtLink>
            </div>
          </div>
        </BaseSectionContent>
      </div>

      <!-- Pagination -->
      <nav
        class="flex items-center justify-between px-4 border-t border-gray-200 sm:px-0"
      >
        <div class="flex flex-1 w-0 -mt-px">
          <button
            @click="prevPage()"
            v-if="currentPage != 1"
            class="inline-flex items-center pt-4 pr-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon
              class="w-5 h-5 mr-3 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </button>
        </div>
        <div class="hidden md:-mt-px md:flex">
          <button
            v-for="pageNumber in totalPage"
            @click="goToThisPage(pageNumber)"
            :class="[
              currentPage == pageNumber
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'inline-flex items-center px-4 pt-4 text-sm font-medium border-t-2'
            ]"
          >
            {{ pageNumber }}
          </button>
          <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
          <!-- 
          <span
            class="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent"
            >...</span
          >-->
        </div>
        <div class="flex justify-end flex-1 w-0 -mt-px">
          <button
            @click="nextPage()"
            v-if="currentPage != totalPage"
            class="inline-flex items-center pt-4 pl-1 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon
              class="w-5 h-5 ml-3 text-gray-400"
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>
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
  ArrowPathIcon,
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
  PlusCircleIcon,
  StarIcon as ActiveStarIcon
} from '@heroicons/vue/20/solid'
import { StarIcon } from '@heroicons/vue/24/outline'
import moment from 'moment'
import Swal from 'sweetalert2'

// ---- SET : MIN-MAX ของระยะการฝึกงาน, ค่าตอบแทนของแต่ละ post ----
const setMinMax = (positionList, postIndex) => {
  let rangeData = {
    workMonth: {
      all: [],
      min: 0,
      max: 0
    },
    salary: {
      all: [],
      min: 0,
      max: 0
    }
  }
  positionList.forEach((num) => {
    rangeData.workMonth.all.push(num.workMonth)
    rangeData.salary.all.push(num.salary)
  })
  if (rangeData.workMonth.all.length > 1) {
    rangeData.workMonth.min = Math.min.apply(Math, rangeData.workMonth.all)
    rangeData.workMonth.max = Math.max.apply(Math, rangeData.workMonth.all)
  }

  if (rangeData.salary.all.length > 1) {
    rangeData.salary.min = Math.min.apply(Math, rangeData.salary.all)
    rangeData.salary.max = Math.max.apply(Math, rangeData.salary.all)
  }
  listPost.value[postIndex].rangeData = rangeData
}

// ---- GET : LIST POST ----
const loading = ref(false)
const listPost = ref([])

const getPost = async () => {
  loading.value = true
  try {
    const res = await usePost({})
    if (res.value) {
      listPost.value = res.value.data.content
      listPost.value.forEach((post, index) => {
        setMinMax(post.openPositionList, index)
      })
      console.log(listPost.value)
      loading.value = false
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      icon: 'error',
      title: 'Error',
      text: 'ระบบผิดพลาด'
    })
  }
}

await getPost()

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

const currentPage = ref(1)
const totalPage = ref(10)

const goToThisPage = (numberPage) => {
  currentPage.value = numberPage
}
const prevPage = () => (currentPage.value > 1 ? currentPage.value-- : '')
const nextPage = () =>
  currentPage.value < totalPage.value ? currentPage.value++ : ''

// --- Favorite Button ---
const statusStar = ref(false)
const changeStarButton = () => {
  statusStar.value ? (statusStar.value = false) : (statusStar.value = true)
}

// -- แสดงค่า min - max ของระยะเวลาการฝึกงาน/ค่าตอบเทน --
const rangeDate = ref({
  workMonth: {
    all: [],
    min: 0,
    max: 0
  },
  salary: {
    all: [],
    min: 0,
    max: 0
  }
})

// -- แสดงสถานะของ Badge (วันที่ปิดรับสมัคร)---
const statusClosedDate = (postCloseDate, postIdex) => {
  if (postCloseDate == null) {
    return { text: 'เปิดรับตลอด', color: 'green' }
  } else {
    let endDate = new Date(new Date(postCloseDate).setHours(23, 59, 0, 0))
    let closedDate = moment(endDate).format('DD/MM/YYYY')
    if (new Date() > endDate) {
      return { text: 'ปิดรับสมัครแล้ว', color: 'red' }
    } else {
      // ถ้ายังไม่เลยวันที่ปิดรับสมัคร ดูว่าใกล้ปิดภายใน 7 วันหรือไม่
      if (
        new Date(moment(endDate).subtract(7, 'days')) <= new Date() &&
        new Date() <= endDate
      ) {
        return { text: 'ปิดรับสมัคร ' + closedDate, color: 'yellow' }
      }
      return { text: 'ปิดรับสมัคร ' + closedDate }
    }
  }
}
</script>

<style lang="scss" scoped>
.multiselect-blue {
  --ms-tag-bg: #dbeafe;
  --ms-tag-color: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
}
</style>
