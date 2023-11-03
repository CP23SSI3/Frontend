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

  <BaseSectionContent class="flex flex-col gap-4 px-6 py-6">
    <!-- Header -->
    <div
      class="flex flex-col items-center justify-between w-full sm:flex-row lg:px-4"
    >
      <div class="flex items-start gap-2 mb-3 lg:gap-6">
        <nuxt-img
          class="w-12 h-12 rounded-sm shadow-md bg-gray-50"
          src="/logo-test.png"
          alt="Your Company"
        />

        <div class="flex flex-col-reverse lg:flex-col">
          <h2 class="text-sm lg:text-lg">
            {{ data.title }}
          </h2>

          <div class="flex gap-2">
            <div class="text-xs font-semibold leading-6 lg:text-sm">
              {{ data.comp.compName }}
            </div>
            <BaseBadge v-if="!closedDate" color="green" class="hidden lg:flex">
              เปิดรับตลอด
            </BaseBadge>
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <BaseButton :leadingIcon="StarIcon" outline>Favorite</BaseButton>
        <BaseButton :trailingIcon="ShareIcon">Share</BaseButton>
      </div>
    </div>
    <BaseLine />

    <!-- Content -->
    <div class="flex flex-col-reverse gap-6 lg:gap-8 lg:px-4 md:flex-row">
      <!-- column 1  -->
      <div class="flex flex-col gap-5">
        <!-- <BaseDescription label="ช่วงระยะเวลาของการฝึกงาน">
          {{
            rangeData.workMonth.all.length > 1 &&
            rangeData.workMonth.min != rangeData.workMonth.max
              ? `${rangeData.workMonth.min} - ${rangeData.workMonth.max} เดือน`
              : `${rangeData.workMonth.all[0]} เดือน`
          }}
        </BaseDescription>

        <BaseDescription label="ค่าตอบแทน">
          {{
            rangeData.salary.all.length > 1 &&
            rangeData.salary.min != rangeData.salary.max
              ? `${rangeData.salary.min} - ${rangeData.salary.max} บาทต่อวัน`
              : `${rangeData.salary.all[0]} บาทต่อวัน`
          }}
        </BaseDescription> -->
        <BaseDescription label="สถานที่ฝึกงาน">
          {{
            `${data.address.area} ${data.address.subDistrict} ${data.address.district}, ${data.address.city} ${data.address.country} ${data.address.postalCode}`
          }}
        </BaseDescription>
        <BaseMap :lat="data.address.latitude" :lng="data.address.longitude" />

        <BaseDescription label="ชื่อผู้ประสานงาน">
          {{ data.coordinatorName }}
        </BaseDescription>
        <BaseDescription label="ช่องทางติดต่อ">
          <div class="flex flex-col gap-1">
            <BaseItem :icon="EnvelopeIcon" class="text-gray-900">
              {{ data.email }}
            </BaseItem>
            <BaseItem :icon="PhoneIcon" class="text-gray-900">
              {{ data.tel }}
            </BaseItem>
            <BaseItem :icon="LinkIcon" class="text-gray-900">
              <a :href="data.comp.compUrl" target="_blank">{{
                data.comp.compUrl
              }}</a>
            </BaseItem>
          </div>
        </BaseDescription>
      </div>
      <!-- column 2  -->
      <div class="flex flex-col w-full gap-5">
        <BaseTablePosition :list="data.openPositionList" />
        <div class="flex flex-col gap-5 md:px-3">
          <div class="grid gap-5 lg:grid-cols-4">
            <BaseDescription label="รูปแบบการฝึกงาน" class="lg:col-span-1">
              {{ data.workType }}
            </BaseDescription>
            <BaseDescription label="วัน-เวลาทำงาน" class="lg:col-span-3">
              {{ data.workDay }},
              {{
                data.workStartTime.substring(0, 5) +
                ' - ' +
                data.workEndTime.substring(0, 5)
              }}
            </BaseDescription>
          </div>

          <BaseDescription label="รายละเอียดงาน">
            {{ data.postDesc }}
          </BaseDescription>
          <BaseDescription label="สวัสดิการอื่นๆ">
            {{ data.postWelfare }}
          </BaseDescription>
          <div class="grid gap-5 lg:grid-cols-4">
            <BaseDescription label="เอกสารประกอบการสมัคร" class="lg:col-span-1">
              {{ data.documents }}
            </BaseDescription>
            <BaseDescription label="วิธีการสมัคร" class="lg:col-span-3">
              {{ data.enrolling }}
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
import { ChevronLeftIcon, ShareIcon } from '@heroicons/vue/24/solid'
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import {
  StarIcon,
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon
} from '@heroicons/vue/24/outline'
import Swal from 'sweetalert2'
import moment from 'moment'

const route = useRoute()

const data = {
  postId: 'eba83fe4-937b-4054-a420-d977534feebe',
  title: 'ประกาศรับฝึกงาน ด่วนที่สุด บริษัทตามใจฉัน',
  createdDate: '2023-10-04T06:30:00Z',
  lastUpdateDate: '2023-10-05T06:30:00Z',
  closedDate: null,
  totalView: 125,
  status: 'OPENED',
  postDesc:
    'ประกาศรับฝึกงานด่วนที่สุดแต่ตลอดทั้งปี นี่คือส่วนหนึ่งของตัวอย่างรายละเอียดข้อมูล',
  comp: {
    compId: '8e20782f-2807-4f13-a11e-0fb9ff955488',
    compName: 'Test company',
    compLogoKey: 'https://www.google.com',
    compDesc:
      'This is a compDesc as an example. Hope we will be able to make a move soon',
    defaultWelfare:
      'Lorem for the welfare for this company, This is the example script only',
    createdDate: '2023-10-04T06:30:00Z',
    lastUpdate: '2023-10-04T06:30:00Z',
    lastActive: '2023-10-04T06:30:00Z',
    compUrl: 'https://www.google.com',
    address: {
      addressId: '9346a466-4a82-4037-ab00-72ba24fa50bf',
      country: 'Thailand',
      postalCode: '10120',
      city: 'Bangkok',
      district: 'Sathorn',
      subDistrict: 'ThungWatDon',
      area: '17 Chan road',
      latitude: 13.705368,
      longitude: 100.5331527
    }
  },
  postWelfare: 'สวัสดิการพื้นฐาน : กินขนมฟรี ข้าวฟรี ไม่มีเงินเดือน',
  enrolling:
    'ติดต่อไนซ์ วิชชุตา พิภพภิญโญสำหรับข้อมูลเพิ่มเติม กรุณาติดต่อผ่านอีเมลที่ระบุเอาไว้เท่านั้น',
  documents: 'port-folio,resume,cv',
  coordinatorName: 'Vichuta Pipoppinyo',
  tel: '012-345-6789',
  email: 'nice.vct@mail.kmutt.ac.th',
  address: {
    addressId: '9346a466-4a82-4037-ab00-72ba24fa50bf',
    country: 'Thailand',
    postalCode: '10120',
    city: 'Bangkok',
    district: 'Sathorn',
    subDistrict: 'ThungWatDon',
    area: '17 Chan road',
    latitude: 13.705368,
    longitude: 100.5331527
  },
  workStartTime: '09:30:00',
  workEndTime: '17:30:00',
  workDay: 'mon,tue,wed,thu,fri',
  workType: 'HYBRID',
  openPositionList: [
    {
      openPositionId: '24526070-68cf-48ff-8d02-29e9d05aeda2',
      openPositionTitle: 'Frontend Developer',
      openPositionNum: 4,
      openPositionDesc: 'Working on Frontend mainly, using React',
      positionTag: {
        positionId: '04a6ab2d-c1fc-44e2-b46c-b5193fb20bf7',
        positionName: 'Front-end developer'
      },
      workMonth: 6,
      salary: 300
    },
    {
      openPositionId: '72d02945-9f1b-401a-9809-b10aff9406cc',
      openPositionTitle: 'Backend developer',
      openPositionNum: 2,
      openPositionDesc: 'Open position - for Java or Kotlin',
      positionTag: {
        positionId: 'a27c36fd-9ed4-4de7-ad8e-f5334953944d',
        positionName: 'Backend-end developer'
      },
      workMonth: 4,
      salary: 250
    }
  ]
}

// -- แสดงค่า min - max ของระยะเวลาการฝึกงาน/ค่าตอบเทน --
// const rangeData = ref({
//   workMonth: {
//     all: [],
//     min: 0,
//     max: 0
//   },
//   salary: {
//     all: [],
//     min: 0,
//     max: 0
//   }
// })

// const getMinMax = () => {
//   let rangeWorkMonth = rangeData.value.workMonth
//   let rangeSalary = rangeData.value.salary

//   data.openPositionList.forEach((num) => {
//     rangeWorkMonth.all.push(num.workMonth)
//     rangeSalary.all.push(num.salary)
//   })
//   if (rangeWorkMonth.all.length > 1) {
//     rangeWorkMonth.min = Math.min.apply(Math, rangeWorkMonth.all)
//     rangeWorkMonth.max = Math.max.apply(Math, rangeWorkMonth.all)
//   }

//   if (rangeSalary.all.length > 1) {
//     rangeSalary.min = Math.min.apply(Math, rangeSalary.all)
//     rangeSalary.max = Math.max.apply(Math, rangeSalary.all)
//   }
// }
// getMinMax()
</script>

<style lang="scss" scoped></style>
