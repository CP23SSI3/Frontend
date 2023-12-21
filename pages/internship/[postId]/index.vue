<template>
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

        <div class="flex flex-col-reverse lg:flex-col lg:pr-[350px]">
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
              {{ moment(new Date(post.lastUpdateDate)).format('DD/MM/YYYY') }}
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
        <BaseButton
          :trailingIcon="ShareIcon"
          class="w-full sm:w-auto"
          @click="copyLinkToClipboard()"
          >Share</BaseButton
        >
      </div>
    </div>
    <BaseLine />

    <!-- Content -->
    <div class="flex flex-col gap-6 lg:gap-8 lg:px-4 lg:flex-row">
      <!-- column 1  -->
      <div class="w-full space-y-6">
        <div class="flex flex-col-reverse w-full gap-5 lg:flex-col">
          <BaseTablePosition :list="post.openPositionList" />
        </div>
        <div class="flex flex-col gap-5 md:px-3">
          <div class="space-y-4">
            <BaseLineTopic>ข้อมูลการฝึกงาน</BaseLineTopic>
            <div class="grid gap-5 lg:grid-cols-2">
              <BaseDescription label="รูปแบบการฝึกงาน" class="lg:col-span-1">
                {{ post.workType }}
              </BaseDescription>
              <BaseDescription label="วัน-เวลาทำงาน" class="lg:col-span-1">
                {{ getThaiWorkDays(post.workDay) }}
                <b>,</b>
                {{
                  post.workStartTime.substring(0, 5) +
                  ' - ' +
                  post.workEndTime.substring(0, 5)
                }}
              </BaseDescription>
            </div>

            <BaseDescription label="รายละเอียดงาน">
              <div v-html="post.postDesc"></div>
            </BaseDescription>
            <BaseDescription label="สวัสดิการอื่นๆ">
              <div v-html="post.postWelfare"></div>
            </BaseDescription>
          </div>
          <div class="space-y-4">
            <BaseLineTopic>การสมัคร</BaseLineTopic>
            <div class="grid gap-5 lg:grid-cols-4">
              <BaseDescription label="วิธีการสมัคร" class="lg:col-span-3">
                <div v-html="post.enrolling"></div>
              </BaseDescription>
              <BaseDescription
                label="เอกสารประกอบการสมัคร"
                class="lg:col-span-1"
              >
                {{ getListDocs(post.documents) }}
              </BaseDescription>
            </div>
          </div>
        </div>
      </div>

      <!-- column 2  -->
      <div class="space-y-6 md:px-3">
        <div class="space-y-4">
          <BaseLineTopic>สถานที่ฝึกงาน</BaseLineTopic>
          <BaseDescription label="">
            {{
              `${post.address.area} แขวง${post.address.subDistrict} เขต${post.address.district}, ${post.address.city}  ${post.address.postalCode}`
            }}
          </BaseDescription>
          <BaseMap :lat="post.address.latitude" :lng="post.address.longitude" />
        </div>

        <div class="space-y-3">
          <BaseLineTopic>ช่องทางการติดต่อ</BaseLineTopic>
          <BaseDescription label="ชื่อผู้ประสานงาน">
            {{ post.coordinatorName }}
          </BaseDescription>
          <BaseDescription label="ติดต่อ">
            <div class="flex flex-col gap-1">
              <BaseItem :icon="EnvelopeIcon" class="text-gray-900">
                {{ post.email }}
              </BaseItem>
              <BaseItem :icon="PhoneIcon" class="text-gray-900">
                {{ post.tel }}
              </BaseItem>
              <BaseItem
                :icon="LinkIcon"
                class="text-gray-900"
                v-show="post.postUrl"
              >
                <a :href="post.postUrl" target="_blank">
                  {{ post.postUrl }}
                </a>
              </BaseItem>
            </div>
          </BaseDescription>
        </div>
        <BaseDescription
          label="Tag"
          class="lg:col-span-1"
          v-if="post.postTagList.length > 0"
        >
          <div class="flex flex-wrap gap-2 col-span-full">
            <span
              v-for="item in post.postTagList"
              class="inline-flex items-center px-2 py-0.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-md lg:text-sm"
              >{{ item }}</span
            >
          </div>
        </BaseDescription>
      </div>
    </div>
    <BaseLine />
    <!-- Footer -->
    <div class="flex items-center justify-between mb-3 lg:px-4">
      <div>
        <NuxtLink
          :to="{
            path: `/internship`
            // --- เอาไว้ย้อนกลับหน้า page เดิม ---
            // query: { page: route.query.page }
          }"
          class="max-w-fit"
        >
          <BaseItem :icon="ChevronLeftIcon" class="mb-4 cursor-pointer"
            >back</BaseItem
          >
        </NuxtLink>
      </div>
      <div class="space-x-3">
        <BaseButton :leadingIcon="TrashIcon" negative @click="removePost()"
          >Delete</BaseButton
        >
        <BaseButton :leadingIcon="PencilIcon" secondary @click="goToEdit()"
          >Edit</BaseButton
        >
      </div>
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
const router = useRouter()
const back = () => router.push({ path: '/internship' })
const goToEdit = () => router.push({ path: `/internship/${postId}/edit` })

// ---- GET : LIST POST ----
// const loading = ref(false)
const post = ref([])
const props = defineProps({
  post: {
    type: Object
  }
})

post.value = props?.post

useSeoMeta({
  title: 'InternHub - ' + props.title,
  ogTitle: props.title,
  description: props.description,
  ogDescription: props.description,
  ogImage: '../../../public/InternHub-logo.svg'
})

// -- share --
const copyLinkToClipboard = () => {
  const currentUrl = window.location.href // Replace with your actual link

  navigator.clipboard
    .writeText(currentUrl)
    .then(() => {
      Swal.fire({
        showConfirmButton: true,
        timerProgressBar: true,
        confirmButtonColor: 'blue',
        icon: 'success',
        title: 'Link copied to clipboard',
        text: 'คัดลอกลิ้งค์ สำเร็จ'
      })
    })
    .catch((error) => {
      Swal.fire({
        showConfirmButton: true,
        timerProgressBar: true,
        confirmButtonColor: 'red',
        icon: 'error',
        title: 'Unable to copy link to clipboard',
        text: error
      })
    })
}

// const getPostDetail = async () => {
//   loading.value = true
//   try {
//     const res = await getPostById(postId)
//     if (res.value) {
//       post.value = res.value.data
//       loading.value = false
//     }
//   } catch (error) {
//     Swal.fire({
//       showConfirmButton: true,
//       timerProgressBar: true,
//       icon: 'error',
//       title: 'Error',
//       text: 'ระบบผิดพลาด'
//     })
//   }
// }

// await getPostDetail()

// -- แสดงสถานะของ Badge (วันที่ปิดรับสมัคร)---
const statusClosedDate = (postCloseDate) => {
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

// --- Format Documents ---
const listDocs = [
  { text: 'Portfolio', value: 'portfolio' },
  { text: 'Resume', value: 'resume' },
  { text: 'CV', value: 'cv' },
  { text: 'Transcript', value: 'transcript' }
]

const getListDocs = (array) => {
  let docuemnts
  if (array.length > 0) {
    array.forEach((element, index) => {
      let text = listDocs.find((item) => item.value == element)
      docuemnts = index == 0 ? text.text : docuemnts + ', ' + text.text
    })
  } else {
    docuemnts = '-'
  }
  return docuemnts
}

// --- Format Workday ---
const listDays = [
  { text: 'อาทิตย์', value: 'sun' },
  { text: 'จันทร์', value: 'mon' },
  { text: 'อังคาร', value: 'tue' },
  { text: 'พุธ', value: 'wed' },
  { text: 'พฤหัส', value: 'thu' },
  { text: 'ศุกร์', value: 'fri' },
  { text: 'เสาร์', value: 'sat' }
]
function groupConsecutiveDays(days) {
  const result = []
  let currentGroup = [days[0]]

  for (let i = 1; i < days.length; i++) {
    const currentDay = days[i]
    const previousDay = days[i - 1]

    if (listDays.indexOf(currentDay) - listDays.indexOf(previousDay) === 1) {
      // Days are consecutive
      currentGroup.push(currentDay)
    } else {
      // Days are not consecutive, start a new group
      result.push(currentGroup)
      currentGroup = [currentDay]
    }
  }
  result.push(currentGroup) // Add the last group

  return result
}

function getThaiWorkDays(workDay) {
  const thaiDays = listDays
    .filter((day) => workDay.includes(day.value))
    .map((day) => day.text)
  if (thaiDays.length === 0) {
    return ''
  } else if (thaiDays.length === 1) {
    return thaiDays[0]
  } else if (thaiDays.length === 7) {
    return 'ทุกวัน'
  } else {
    const selectedDays = listDays.filter((day) => workDay.includes(day.value))
    // return thaiDays.join(', ')
    const groupedDays = groupConsecutiveDays(selectedDays)

    let result = groupedDays
      .map((group) => {
        if (group.length === 1) {
          return group[0].text // Single day in the group
        } else {
          return `${group[0].text}-${group[group.length - 1].text}` // Multiple consecutive days in the group
        }
      })
      .join(', ')

    return result
  }
}

const removePost = async () => {
  Swal.fire({
    title: 'Are you sure remove this post?',
    text: 'คุณต้องการลบโพสต์นี้หรือไม่?',
    icon: 'warning',
    confirmButtonText: 'Comfirm',
    confirmButtonColor: 'red',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: 'gray',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      fetchDeletePost()
    }
  })
}

const fetchDeletePost = async () => {
  try {
    const res = await deletePost(postId)
    if (res.value.status == 200) {
      Swal.fire({
        title: 'Deleted',
        text: 'ลบโพสต์เรียบร้อยแล้ว',
        icon: 'success',
        confirmButtonColor: 'blue'
      }).then(() => back())
    }
  } catch (error) {}
}
</script>

<style lang="scss" scoped></style>
