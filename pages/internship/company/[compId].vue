<template>
  <BaseLoading v-if="!company"></BaseLoading>
  <div v-else>
    <BaseItem
      :icon="ChevronLeftIcon"
      class="mb-4 cursor-pointer max-w-min hover:underline"
      @click="back()"
    >
      back
    </BaseItem>

    <div class="relative -z-10">
      <img
        src="@/public/background-company.jpg"
        class="object-cover w-full h-32 lg:h-48 rounded-2xl"
      />
      <div class="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
    </div>

    <div class="max-w-5xl px-4 mx-auto sm:px-2 lg:px-8">
      <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
        <div class="flex">
          <BaseProfile
            company
            size="XL"
            class="w-24 h-24 text-4xl sm:h-32 sm:w-32 ring-4 ring-white"
            :fname="wordForProfileCompany(company.data.compName, 0)"
            :lname="wordForProfileCompany(company.data.compName, 1)"
          />
        </div>
        <div
          class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
        >
          <div class="flex-1 min-w-0 mt-6 sm:hidden md:block">
            <h1 class="text-2xl font-bold text-gray-900 truncate">
              {{ company.data.compName }}
            </h1>
          </div>
          <div
            class="flex flex-col mt-6 space-y-3 justify-stretch sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <NuxtLink
              :to="company.data.compUrl"
              target="_blank"
              v-if="company.data.compUrl != null"
            >
              <BaseButton :leading-icon="LinkIcon" outline full
                >Website</BaseButton
              >
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex-1 hidden min-w-0 mt-6 sm:block md:hidden">
        <h1 class="text-2xl font-bold text-gray-900 truncate">
          {{ company.data.compName }}
        </h1>
      </div>
    </div>
    <BaseSectionContent
      class="max-w-6xl px-5 py-4 mx-auto my-6 space-y-6 md:px-10 md:py-8"
    >
      <BaseDescription label="About Company">
        {{ company.data.compDesc ? company.data.compDesc : '-' }}
      </BaseDescription>
      <BaseDescription label="Basic Welfare">
        <div
          v-html="company.data.defaultWelfare"
          v-if="company.data.defaultWelfare != null"
        ></div>
        <div v-else>-</div>
      </BaseDescription>
      <BaseDescription label="Address" v-if="company.data.address != null">
        {{
          `${company.data.address.area} แขวง${company.data.address.subDistrict} เขต${company.data.address.district}, ${company.data.address.city}  ${company.data.address.postalCode}`
        }}
      </BaseDescription>
      <BaseDescription label="Address" v-else>-</BaseDescription>
      <BaseMap
        v-if="company.data.address != null"
        :lat="company.data.address.latitude"
        :lng="company.data.address.longitude"
      />
    </BaseSectionContent>

    <!-- List Post -->
    <div
      class="flex flex-col max-w-5xl col-span-1 gap-4 px-1 mx-auto lg:col-span-9 sm:px-0"
      v-if="listPost.length !== 0"
    >
      <!-- Topic -->
      <div
        class="flex flex-col justify-between gap-2 sm:items-center sm:flex-row"
      >
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-bold leading-8 text-black">
            Internship program other
          </h1>
          <!-- total element -->
          <span class="hidden text-sm text-gray-500 md:flex"
            >{{ totalItems }} posts</span
          >
        </div>
        <div class="flex items-center justify-between">
          <!-- Pagination -->
          <!-- <div
            v-if="listPost.length == 0 && !loading"
            class="flex justify-center"
          >
            <BaseButton :leading-icon="ArrowPathIcon" outline @click="refresh()"
              >Refresh</BaseButton
            >
          </div> -->
          <div class="p-4" v-if="!loading">
            <v-pagination
              v-model="pagination.currentPage"
              :pages="pagination.totalPages"
              :range-size="1"
              active-color="#DBEAFE"
              class="flex justify-center"
              @update:modelValue="changePage"
            />
          </div>
          <NuxtLink :to="{ path: '/internship/form' }">
            <BaseButton
              :leadingIcon="PlusCircleIcon"
              class="w-full md:w-auto"
              v-if="auth.user?.role == 'ADMIN' || auth.user?.role == 'COMPANY'"
              >Add Post</BaseButton
            >
          </NuxtLink>
        </div>
      </div>

      <!-- List -->
      <BaseLoading v-if="loading" />
      <div v-else class="flex flex-col w-full col-span-4 gap-2 lg:col-span-3">
        <div v-if="listPost.length == 0" class="flex justify-center">
          -- บริษัทยังไม่มีการประกาศโพสต์ใดๆ --
        </div>

        <BaseSectionContent
          v-else
          class="px-5 py-5"
          v-for="(post, index) in listPost"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-2 lg:gap-6">
              <!-- * add Logo Company -->
              <!-- <nuxt-img
                class="w-10 h-10 rounded-md shadow-md lg:w-12 lg:h-12 lg:rounded-sm bg-gray-50"
                src="../public/logo-test.png"
                :alt="post.comp.compName"
              /> -->
              <BaseProfile
                company
                class="w-10 h-10 rounded-md shadow-md lg:w-12 lg:h-12 lg:rounded-md bg-gray-50"
                :fname="wordForProfileCompany(post.comp.compName, 0)"
                :lname="wordForProfileCompany(post.comp.compName, 1)"
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
                  <NuxtLink
                    :to="`/internship/company/${post.comp.compId}`"
                    class="text-sm font-semibold leading-6 text-gray-600 cursor-pointer hover:text-blue-800"
                  >
                    {{ post.comp.compName }}
                  </NuxtLink>
                  <span class="text-xs text-gray-500">
                    {{
                      post.cloedDate
                        ? moment(new Date(post.cloedDate)).format('DD/MM/YYYY')
                        : ''
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
                v-if="auth.statusLogin"
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
    </div>
  </div>
</template>

<script setup>
import { StarIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/24/solid'
import {
  LinkIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  Bars3BottomLeftIcon,
  StarIcon as ActiveStarIcon,
  ClockIcon,
  ArrowPathIcon
} from '@heroicons/vue/20/solid'
import Swal from 'sweetalert2'
import moment from 'moment'

// definePageMeta({
//   // middleware: ['authen']
// })
const auth = useAuth()
const route = useRoute()
const compId = route.params.compId
const company = await getCompanyById(compId)

const router = useRouter()
const wordForProfileCompany = (compName, index) => {
  let words = compName.split(' ')
  return words[index]
}
const back = () => router.go(-1)

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
  itemPerPages: 5
})

// ---- GET : LIST POST ----
const loading = ref(false)
const listPost = ref([])

const getPost = async () => {
  loading.value = true
  try {
    const res = await getPostByCompId(compId, {
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
      console.log(listPost.value)
      loading.value = false
    }
  } catch (error) {
    console.log(error)
    // Swal.fire({
    //   showConfirmButton: true,
    //   timerProgressBar: true,
    //   confirmButtonColor: 'blue',
    //   icon: 'error',
    //   title: 'Error',
    //   text: 'ไม่สามารถเรียกดู list post ได้'
    // })
    loading.value = false
  }
}

await getPost()

// const refresh = () => {
//   getPost()
// }

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

// console.log(listPost.value)
</script>

<style lang="scss" scoped></style>
