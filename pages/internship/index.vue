<template>
  <div class="grid items-start grid-cols-4 gap-4">
    <!-- Filter -->
    <BaseSectionContent
      class="hidden col-span-1 gap-2 px-5 py-5 min-h-fit lg:flex lg:flex-col"
    >
      <FilterCompenent
        :filter="filter"
        @cancel="clearFilterValue()"
        @search="search()"
        @setLocation="setFilterLocation()"
        @clearLocation="clearFilterLocation()"
      />
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
            Internship program
          </h1>
          <!-- total element -->
          <span class="text-sm text-gray-400">{{ totalItems }} posts</span>
          <button
            type="button"
            class="p-2 -m-2 text-gray-400 hover:text-gray-500 lg:hidden"
            @click="openFilter()"
          >
            <span class="sr-only">Filters</span>

            <FunnelIcon class="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
        <NuxtLink :to="{ path: '/internship/form' }">
          <BaseButton :leadingIcon="PlusCircleIcon" class="w-full md:w-auto"
            >Add Post</BaseButton
          >
        </NuxtLink>
      </div>
      <!-- Sidebar for Mobile -->
      <div
        id="slideover-container"
        :class="[
          'fixed inset-0 w-full h-full z-40',
          filterMobile ? '' : 'invisible'
        ]"
      >
        <div
          id="slideover-bg"
          :class="[
            'absolute inset-0 w-full h-full transition-all duration-500 ease-out bg-gray-900 ',
            filterMobile ? 'opacity-50' : 'opacity-0'
          ]"
          @click="closeFilter()"
        ></div>
        <div
          id="slideover"
          :class="[
            'absolute top-16 right-0 h-full transition-all duration-300 ease-out bg-white md:w-96 w-80',
            filterMobile ? '' : 'translate-x-full'
          ]"
        >
          <div
            class="absolute top-0 right-0 flex items-center justify-center w-8 h-8 mt-5 mr-5 text-gray-600 cursor-pointer"
          >
            <XMarkIcon class="w-10 h-10" @click="closeFilter()"></XMarkIcon>
          </div>
          <div class="col-span-1 gap-2 px-5 py-5 min-h-fit lg:flex lg:flex-col">
            <!-- filter for mobile size -->
            <FilterCompenent
              :filter="filter"
              @cancel="clearFilterValue()"
              @search="search()"
              @setLocation="setFilterLocation()"
              @clearLocation="clearFilterLocation()"
            />
          </div>
        </div>
      </div>
      <!-- </div> -->

      <!-- List -->
      <BaseLoading v-if="loading" />
      <div v-else class="flex flex-col w-full col-span-4 gap-2 lg:col-span-3">
        <div v-if="listPost.length == 0" class="flex justify-center">
          - ไม่พบข้อมูล -
        </div>

        <BaseSectionContent
          v-else
          class="px-5 py-5"
          v-for="(post, index) in listPost"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-2 lg:gap-6">
              <!-- * add Logo Company -->
              <nuxt-img
                class="w-10 h-10 rounded-full shadow-md lg:w-12 lg:h-12 lg:rounded-sm bg-gray-50"
                src="../public/logo-test.png"
                :alt="post.comp.compName"
              />
              <div class="flex flex-col-reverse lg:flex-col">
                <h2
                  class="hidden max-w-2xl text-sm font-semibold lg:flex lg:text-lg"
                >
                  {{ post.title }}
                </h2>

                <div
                  class="flex flex-col gap-0 sm:gap-2 item-start sm:items-center sm:flex-row"
                >
                  <div class="text-sm font-semibold leading-6 text-gray-600">
                    {{ post.comp.compName }}
                  </div>
                  <span class="text-xs text-gray-500">
                    {{
                      moment(new Date(post.lastUpdateDate)).format('DD/MM/YYYY')
                    }}
                    <BaseBadge
                      :color="
                        statusClosedDate(post.status, post.closedDate).color
                      "
                      class="flex sm:hidden"
                    >
                      {{ statusClosedDate(post.status, post.closedDate).text }}
                    </BaseBadge>
                  </span>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <BaseBadge
                :color="statusClosedDate(post.status, post.closedDate).color"
                class="hidden sm:flex"
              >
                {{ statusClosedDate(post.status, post.closedDate).text }}
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
            <h2 class="flex text-base font-semibold lg:hidden">
              {{ post.title }}
            </h2>
            <div class="flex flex-col gap-1 xl:flex-row xl:space-x-6">
              <BaseItem :icon="ClockIcon">
                {{ showRangeData(post.rangeData, 'workMonth') }}
              </BaseItem>
              <BaseItem :icon="CurrencyDollarIcon">
                {{ showRangeData(post.rangeData, 'salary') }}
              </BaseItem>
              <BaseItem :icon="MapPinIcon">{{
                `${post.address.subDistrict} - ${post.address.district}, ${post.address.city} ${post.address.postalCode} `
              }}</BaseItem>
            </div>
            <div class="hidden text-sm text-gray-400 sm:flex">
              {{ cutDescription(post.postDesc.replace(/<[^>]*>/g, ' '), 200) }}
            </div>

            <div
              class="flex flex-col gap-2 sm:items-center sm:justify-between sm:flex-row"
            >
              <div class="flex flex-wrap gap-2">
                <span
                  v-if="post.postTagList.length > 0"
                  v-for="item in post.postTagList"
                  class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-md lg:text-sm"
                  >{{ item }}</span
                >

                <!-- <span
                v-else
                v-for="item in post.openPositionList"
                class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-md lg:text-sm"
                >{{ item.openPositionTitle }}</span
              > -->
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
      <div v-if="listPost.length == 0 && !loading" class="flex justify-center">
        <BaseButton :leading-icon="ArrowPathIcon" outline @click="refresh()"
          >Refresh</BaseButton
        >
      </div>
      <div class="p-4 bg-white" v-else-if="!loading">
        <v-pagination
          v-model="pagination.currentPage"
          :pages="pagination.totalPages"
          :range-size="1"
          active-color="#DBEAFE"
          class="flex justify-center"
          @update:modelValue="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CurrencyDollarIcon,
  MapPinIcon,
  Bars3BottomLeftIcon,
  StarIcon as ActiveStarIcon,
  ClockIcon,
  FunnelIcon,
  XMarkIcon,
  ArrowPathIcon
} from '@heroicons/vue/20/solid'
import { StarIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import FilterCompenent from '~/components/filter/FilterCompenent.vue'
import moment from 'moment'
import Swal from 'sweetalert2'

// -- Filter : Mobile  --
const filterMobile = ref(false)
const openFilter = () => {
  filterMobile.value = true
}
const closeFilter = () => {
  filterMobile.value = false
}

const filter = ref({
  search: '',
  postTag: [],
  location: null,
  status: {
    id: 1,
    text: 'เปิดอยู่',
    color: 'fill-gray-500',
    value: 'NEARLY_CLOSED,OPENED,ALWAYS_OPENED'
  },
  workMonth: null,
  salary: null,
  city: null,
  district: null
})

const clearFilterValue = () => {
  filter.value = {
    search: '',
    postTag: [],
    location: null,
    status: {
      id: 1,
      text: 'เปิดอยู่',
      color: 'fill-gray-500',
      value: 'NEARLY_CLOSED,OPENED,ALWAYS_OPENED'
    },
    workMonth: null,
    salary: null,
    city: null,
    district: null
  }
}

const refresh = () => {
  clearFilterValue()
  getPost()
}

const setFilterLocation = () => {
  let location = filter.value.location
  if (location.includes(',')) {
    let array = location.split(',')
    filter.value.city = array[1].trim()
    filter.value.district = array[0]
  } else {
    filter.value.city = location
    filter.value.district = null
  }
}

const clearFilterLocation = () => {
  filter.value.city = null
  filter.value.district = null
}

const search = () => {
  closeFilter()
  getPost()
}

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
  if (positionList) {
    positionList.forEach((num) => {
      if (num.workMonth !== null) {
        rangeData.workMonth.all.push(num.workMonth)
      }
      if (num.salary !== null) {
        rangeData.salary.all.push(num.salary)
      }
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
  } else {
    listPost.value[postIndex].rangeData = rangeData
  }
}
// --- show text max-min workMonth and salary ---
const showRangeData = (postRangeData, fieldName) => {
  let text
  if (fieldName === 'workMonth') {
    if (postRangeData.workMonth.all.length == 1) {
      postRangeData.workMonth.all[0] === 0
        ? (text = 'ไม่ระบุ')
        : (text = `รับฝึก ${postRangeData.workMonth.all[0]} เดือน`)
    } else if (postRangeData.workMonth.all.length > 1) {
      if (postRangeData.workMonth.min != postRangeData.workMonth.max) {
        postRangeData.workMonth.min == 0
          ? (text = `รับฝึก ${postRangeData.workMonth.max} เดือน`)
          : (text = `รับฝึก ${postRangeData.workMonth.min} - ${postRangeData.workMonth.max} เดือน`)
      } else {
        postRangeData.workMonth.min == 0
          ? (text = 'ไม่ระบุ')
          : (text = `รับฝึก ${postRangeData.workMonth.min} เดือน`)
      }
    } else {
      return (text = 'ไม่ระบุ')
    }
  }

  if (fieldName === 'salary') {
    if (postRangeData.salary.all.length == 1) {
      postRangeData.salary.all[0] === 0
        ? (text = 'ไม่ระบุ')
        : (text = `${postRangeData.salary.all[0]} บาท/วัน`)
    } else if (postRangeData.salary.all.length > 1) {
      if (postRangeData.salary.min != postRangeData.salary.max) {
        postRangeData.salary.min == 0
          ? (text = `${postRangeData.salary.max} บาท/วัน`)
          : (text = `${postRangeData.salary.min} - ${postRangeData.salary.max} บาท/วัน`)
      } else {
        postRangeData.salary.min == 0
          ? (text = 'ไม่ระบุ')
          : (text = `${postRangeData.salary.min} บาท/วัน`)
      }
    } else {
      return (text = 'ไม่ระบุ')
    }
  }
  return text
}

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

// ---- GET : LIST POST ----
const loading = ref(false)
const listPost = ref([])

const getPost = async () => {
  loading.value = true
  try {
    const res = await usePost({
      page: pagination.value.currentPage - 1,
      pageSize: pagination.value.itemPerPages,
      q: filter.value.search,
      city: filter.value.city,
      district: filter.value.district,
      status: filter.value.status.value,
      tags: filter.value.postTag.toString(),
      minSalary: filter.value.salary
    })
    if (res.value) {
      let data = res.value.data
      pagination.value.currentPage = data.number + 1
      pagination.value.totalPages = data.totalPages
      pagination.value.itemPerPages = data.size
      totalItems.value = data.totalElements
      listPost.value = data.content
      listPost.value.forEach((post, index) => {
        setMinMax(post.openPositionList, index)
      })
      // console.log(listPost.value)
      loading.value = false
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'Error',
      text: 'ไม่สามารถเรียกดู list post ได้'
    })
    loading.value = false
  }
}
await getPost()

// --- Favorite Button ---
const statusStar = ref(false)
const changeStarButton = () => {
  statusStar.value ? (statusStar.value = false) : (statusStar.value = true)
}

// -- แสดงสถานะของ Badge (วันที่ปิดรับสมัคร)---
const statusClosedDate = (postStatus, postClosedDate) => {
  let closedDate
  if (postClosedDate != null) {
    closedDate = moment(new Date(postClosedDate)).format('DD/MM/YYYY')
  }
  switch (postStatus) {
    case 'OPENED':
      return closedDate
        ? { text: 'ปิดรับสมัคร ' + closedDate }
        : { text: 'เปิดรับตลอด', color: 'green' }
    case 'ALWAYS_OPENED':
      return { text: 'เปิดรับตลอด', color: 'green' }
    case 'NEARLY_CLOSED':
      return { text: 'ปิดรับสมัคร ' + closedDate, color: 'yellow' }
    case 'CLOSED':
      return { text: 'ปิดรับสมัครแล้ว', color: 'red' }
  }
}
// --- แสดง text description ---
function cutDescription(description, maxLength) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...'
  } else {
    return description
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
