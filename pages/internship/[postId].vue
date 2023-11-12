<template>
  <NuxtLink
    :to="{
      path: `/internship`
      // --- เอาไว้ย้อนกลับหน้า page เดิม ---
      // query: { page: route.query.page }
    }"
  >
    <BaseItem :icon="ChevronLeftIcon" class="mb-4 cursor-pointer"
      >back</BaseItem
    >
  </NuxtLink>

  <BaseSectionContent class="flex flex-col gap-6 px-4 py-4 sm:px-6 sm:py-7">
    <!-- Header -->
    <div
      class="relative flex flex-col w-full gap-2 sm:justify-between sm:flex-row sm:items-start lg:px-4"
    >
      <div class="flex flex-col gap-2 lg:items-start lg:gap-6 lg:flex-row">
        <nuxt-img
          class="w-20 h-20 rounded-sm shadow-md lg:h-12 lg:w-12 bg-gray-50"
          src="/logo-test.png"
          alt="Your Company"
        />

        <div class="flex flex-col-reverse lg:flex-col lg:pr-[300px]">
          <h2 class="text-lg font-semibold lg:text-lg">
            {{ post.title }}
          </h2>

          <div class="flex items-center gap-2">
            <div
              class="text-xs font-semibold leading-6 text-gray-600 lg:text-sm"
            >
              {{ post.comp.compName }}
            </div>
            <span class="text-xs text-gray-500">
              {{ moment(new Date(post.createdDate)).format('DD/MM/YYYY') }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 sm:absolute sm:right-0">
        <BaseBadge
          :color="statusClosedDate(post.closedDate).color"
          class="absolute top-0 right-0 sm:static sm:right-auto sm:top-auto"
        >
          {{ statusClosedDate(post.closedDate).text }}
        </BaseBadge>
        <BaseButton
          :leadingIcon="statusStar ? ActiveStarIcon : StarIcon"
          outline
          :class="[statusStar ? 'text-yellow-500' : '', 'w-full sm:w-auto']"
          @click="changeStarButton()"
          ><span class="w-auto text-gray-700">Favorite</span></BaseButton
        >
        <BaseButton :trailingIcon="ShareIcon" class="w-full sm:w-auto"
          >Share</BaseButton
        >
      </div>
    </div>
    <BaseLine />

    <!-- Content -->
    <div class="flex flex-col-reverse gap-6 lg:gap-8 lg:px-4 lg:flex-row">
      <!-- column 1  -->
      <div class="flex flex-col gap-5 md:px-3">
        <BaseDescription label="สถานที่ฝึกงาน">
          {{
            `${post.address.area} ${post.address.subDistrict} ${post.address.district}, ${post.address.city} ${post.address.country} ${post.address.postalCode}`
          }}
        </BaseDescription>
        <BaseMap :lat="post.address.latitude" :lng="post.address.longitude" />

        <BaseDescription label="ชื่อผู้ประสานงาน">
          {{ post.coordinatorName }}
        </BaseDescription>
        <BaseDescription label="ช่องทางติดต่อ">
          <div class="flex flex-col gap-1">
            <BaseItem :icon="EnvelopeIcon" class="text-gray-900">
              {{ post.email }}
            </BaseItem>
            <BaseItem :icon="PhoneIcon" class="text-gray-900">
              {{ post.tel }}
            </BaseItem>
            <BaseItem :icon="LinkIcon" class="text-gray-900">
              <a :href="post.comp.compUrl" target="_blank">{{
                post.comp.compUrl
              }}</a>
            </BaseItem>
          </div>
        </BaseDescription>
      </div>
      <!-- column 2  -->
      <div class="flex flex-col w-full gap-5">
        <BaseTablePosition :list="post.openPositionList" :loading="loading" />
        <div class="flex flex-col gap-5 md:px-3">
          <div class="grid gap-5 lg:grid-cols-4">
            <BaseDescription label="รูปแบบการฝึกงาน" class="lg:col-span-1">
              {{ post.workType }}
            </BaseDescription>
            <BaseDescription label="วัน-เวลาทำงาน" class="lg:col-span-3">
              {{ post.workDay }},
              {{
                post.workStartTime.substring(0, 5) +
                ' - ' +
                post.workEndTime.substring(0, 5)
              }}
            </BaseDescription>
          </div>

          <BaseDescription label="รายละเอียดงาน">
            {{ post.postDesc }}
          </BaseDescription>
          <BaseDescription label="สวัสดิการอื่นๆ">
            {{ post.postWelfare }}
          </BaseDescription>
          <div class="grid gap-5 lg:grid-cols-4">
            <BaseDescription label="เอกสารประกอบการสมัคร" class="lg:col-span-1">
              {{ post.documents }}
            </BaseDescription>
            <BaseDescription label="วิธีการสมัคร" class="lg:col-span-3">
              {{ post.enrolling }}
            </BaseDescription>
          </div>
        </div>
      </div>
    </div>
    <BaseLine />
    <!-- Footer -->
    <div class="flex justify-end gap-3 mb-3 lg:px-4">
      <BaseButton :leadingIcon="TrashIcon" negative>Delete</BaseButton>
      <BaseButton :leadingIcon="PencilIcon" secondary>Edit</BaseButton>
    </div>
  </BaseSectionContent>
</template>

<script setup>
import {
  ChevronLeftIcon,
  ShareIcon,
  StarIcon as ActiveStarIcon
} from '@heroicons/vue/24/solid'
import {
  StarIcon,
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import Swal from 'sweetalert2'
import moment from 'moment'

const route = useRoute()
const postId = route.params.postId

// ---- GET : LIST POST ----
const loading = ref(false)
const post = ref([])

const getPostDetail = async () => {
  loading.value = true
  try {
    const res = await getPostById(postId)
    if (res.value) {
      post.value = res.value.data
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

await getPostDetail()

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

// --- Favorite Button ---
const statusStar = ref(false)
const changeStarButton = () => {
  statusStar.value ? (statusStar.value = false) : (statusStar.value = true)
}
</script>

<style lang="scss" scoped></style>
