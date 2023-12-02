<template>
  <div class="grid items-start grid-cols-4 gap-6">
    <!-- Filter -->
    <FilterCompenent />

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
        </div>
        <NuxtLink :to="{ path: '/internship/form' }">
          <BaseButton :leadingIcon="PlusCircleIcon">Add Post</BaseButton>
        </NuxtLink>
      </div>

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
                src="/logo-test.png"
                :alt="post.comp.compName"
              />
              <div class="flex flex-col-reverse lg:flex-col">
                <h2 class="hidden text-sm font-semibold lg:flex lg:text-lg">
                  {{ post.title }}
                </h2>

                <div class="flex items-center gap-2">
                  <div class="text-sm font-semibold leading-6 text-gray-600">
                    {{ post.comp.compName }}
                  </div>
                  <span class="text-xs text-gray-500">
                    {{
                      moment(new Date(post.lastUpdateDate)).format('DD/MM/YYYY')
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
            <h2 class="flex text-base font-semibold lg:hidden">
              {{ post.title }}
            </h2>
            <div class="flex flex-col gap-1 xl:flex-row xl:space-x-6">
              <BaseItem :icon="BriefcaseIcon">
                {{
                  post.rangeData.workMonth.all.length > 1 &&
                  post.rangeData.workMonth.min != post.rangeData.workMonth.max
                    ? `${post.rangeData.workMonth.min} - ${post.rangeData.workMonth.max} เดือน`
                    : `${post.rangeData.workMonth.all[0]} เดือน`
                }}
              </BaseItem>
              <BaseItem :icon="CurrencyDollarIcon">
                {{
                  post.rangeData.salary.all.length > 1 &&
                  post.rangeData.salary.min != post.rangeData.salary.max
                    ? `${post.rangeData.salary.min} - ${post.rangeData.salary.max} บาทต่อวัน`
                    : `${post.rangeData.salary.all[0]} บาท/วัน`
                }}
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
      <div class="p-4 bg-white">
        <v-pagination
          v-show="!loading"
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
  BriefcaseIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  Bars3BottomLeftIcon,
  ArrowPathIcon,
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
  StarIcon as ActiveStarIcon
} from '@heroicons/vue/20/solid'
import { StarIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import FilterCompenent from '~/components/filter/FilterCompenent.vue'
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
  if (positionList) {
    positionList.forEach((num) => {
      rangeData.workMonth.all.push(num.workMonth)
      if (num.salary) {
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
      pageSize: pagination.value.itemPerPages
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
    console.log(error)
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
// --- แสดง text description ---
function cutDescription(description, maxLength) {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...'
  } else {
    return description
  }
}

// -- check field --
const data = {
  number: 0,
  size: 10,
  totalPages: 1,
  totalElements: 1,
  content: [
    {
      address: {
        // addressId: '9346a466-4a82-4037-ab00-72ba24fa50bf',
        // area: '17 Chan road',
        city: 'Bangkok',
        country: 'Thailand',
        district: 'Sathorn',
        // latitude: 13.705368,
        // longitude: 100.5331527,
        postalCode: '10120',
        subDistrict: 'ThungWatDon'
      },
      closedDate: null,
      comp: {
        // address: {
        //   addressId: '9346a466-4a82-4037-ab00-72ba24fa50bf',
        //   area: '17 Chan road',
        //   city: 'Bangkok',
        //   country: 'Thailand',
        //   district: 'Sathorn',
        //   latitude: 13.705368,
        //   longitude: 100.5331527,
        //   postalCode: '10120',
        //   subDistrict: 'ThungWatDon'
        // },
        // compDesc:
        //   'This is a compDesc as an example. Hope we will be able to make a move soon',
        compId: '8e20782f-2807-4f13-a11e-0fb9ff955488',
        compLogoKey: 'https://www.google.com',
        compName: 'Test company',
        compUrl: 'https://www.google.com'
        // createdDate: '2023-10-04T13:30:00',
        // defaultWelfare:
        //   'Lorem for the welfare for this company, This is the example script only',
        // lastActive: '2023-10-04T13:30:00',
        // lastUpdate: '2023-10-04T13:30:00'
      },
      // coordinatorName: 'Vichuta Pipoppinyo',
      createdDate: '2023-10-04T13:30:00',
      // documents: ['portfolio', 'resume', 'cv'],
      // email: 'nice.vct@mail.kmutt.ac.th',
      // enrolling:
      //   'ติดต่อไนซ์ วิชชุตา พิภพภิญโญสำหรับข้อมูลเพิ่มเติม กรุณาติดต่อผ่านอีเมลที่ระบุเอาไว้เท่านั้น',
      lastUpdateDate: '2023-10-05T13:30:00',
      openPositionList: [
        {
          // openPositionDesc: 'Working on Frontend mainly, using React',
          //     openPositionId: '24526070-68cf-48ff-8d02-29e9d05aeda2',
          // openPositionNum: 4,
          openPositionTitle: 'Frontend Developer',
          salary: 300,
          workMonth: 6
        },
        {
          //     openPositionDesc: 'Open position - for Java or Kotlin',
          //     openPositionId: '72d02945-9f1b-401a-9809-b10aff9406cc',
          //     openPositionNum: 2,
          openPositionTitle: 'Backend developer',
          salary: 250,
          workMonth: 4
        }
      ],
      // postDesc:
      //   'ประกาศรับฝึกงานด่วนที่สุดแต่ตลอดทั้งปี นี่คือส่วนหนึ่งของตัวอย่างรายละเอียดข้อมูล',
      postId: 'eba83fe4-937b-4054-a420-d977534feebe',
      postTagList: ['Backend developer', 'Frontend developer'],
      postUrl: 'https://www.wikipedia.org/',
      // postWelfare: 'สวัสดิการพื้นฐาน : กินขนมฟรี ข้าวฟรี ไม่มีเงินเดือน',
      status: 'OPENED',
      // tel: '012-345-6789',
      title: 'ประกาศรับฝึกงาน ด่วนที่สุด บริษัทตามใจฉัน',
      // totalView: 125,
      // workDay: ['mon', 'tue', 'wed', 'thu', 'fri'],
      // workEndTime: '17:30:00',
      // workStartTime: '09:30:00',
      workType: 'HYBRID'
    }
  ]
}
</script>

<style lang="scss" scoped>
.multiselect-blue {
  --ms-tag-bg: #dbeafe;
  --ms-tag-color: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
}
</style>
