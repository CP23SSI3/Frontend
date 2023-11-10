<template>
  <BaseSectionContent class="px-10 py-8">
    <Form>
      <div class="space-y-12">
        <div
          class="grid grid-cols-1 pb-12 border-b gap-x-8 gap-y-10 border-gray-900/10 md:grid-cols-4"
        >
          <div>
            <BaseTitleForm>ประกาศฝึกงาน</BaseTitleForm>
          </div>

          <div
            class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-3"
          >
            <div class="sm:col-span-4">
              <BaseInputField
                label="หัวข้อประกาศ"
                id="title"
                v-model="form.title"
              ></BaseInputField>
            </div>

            <div class="col-span-full">
              <BaseLabel :id="positions" :required="required">
                ตำแหน่งงานที่เปิดรับ
              </BaseLabel>
              <div class="mt-2">
                <BaseButton type="button" :leadingIcon="PlusIcon" full secondary
                  >เพิ่มตำแหน่งงาน</BaseButton
                >
              </div>
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 pb-12 border-b gap-x-8 gap-y-10 border-gray-900/10 md:grid-cols-3"
        >
          <div>
            <BaseTitleForm>ข้อมูลการฝึกงาน</BaseTitleForm>
            <!-- <p class="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p> -->
          </div>

          <div
            class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2"
          >
            <div class="sm:col-span-3">
              <BaseTimePicker
                label="เวลาทำงาน"
                id="time-only"
                placeholder="Select Time"
                v-model="form.workTime"
                required
              >
              </BaseTimePicker>
            </div>

            <div class="col-span-1">
              <BaseLabel :id="positions" required>วันทำงาน</BaseLabel>
              <div class="mt-2">
                <div class="space-y-3">
                  <div
                    class="relative flex items-start"
                    v-for="(item, index) in listDay"
                    :key="index"
                  >
                    <div class="flex items-center h-6">
                      <input
                        :id="item.value"
                        :name="item.value"
                        type="checkbox"
                        :value="item.value"
                        v-model="checkedDays"
                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                      />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                      <label
                        :for="item.value"
                        class="font-medium text-gray-900"
                      >
                        {{ item.text }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <BaseLabel :id="radio" required> รูปแบบการฝึกงาน </BaseLabel>
              <fieldset class="mt-4">
                <div class="space-y-4">
                  <div
                    v-for="choice in workStyles"
                    :key="choice.id"
                    class="flex items-center"
                  >
                    <input
                      :id="choice.id"
                      :name="choice.id"
                      type="radio"
                      :value="choice.id"
                      v-model="selectedWorkDays"
                      class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-600"
                    />
                    <label
                      :for="choice.id"
                      class="block ml-3 text-sm font-medium leading-6 text-gray-900"
                      >{{ choice.text }}</label
                    >
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-span-full"></div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 pb-12 border-b gap-x-8 gap-y-10 border-gray-900/10 md:grid-cols-3"
        >
          <div>
            <BaseTitleForm>สถานที่ฝึกงาน</BaseTitleForm>
            <!-- <p class="mt-1 text-sm leading-6 text-gray-600">
              Use a permanent address where you can receive mail.
            </p> -->
          </div>

          <div
            class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2"
          >
            <div class="sm:col-span-3">
              <BaseLabel :id="radio" required> สถานที่ฝึกงาน </BaseLabel>
              <fieldset class="mt-4">
                <div class="space-y-4">
                  <div
                    v-for="choice in choicesLocation"
                    :key="choice.id"
                    class="flex items-center"
                  >
                    <input
                      :id="choice.id"
                      :name="choice.id"
                      type="radio"
                      :value="choice.id"
                      v-model="selectedLocation"
                      class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-600"
                    />
                    <label
                      :for="choice.id"
                      class="block ml-3 text-sm font-medium leading-6 text-gray-900"
                      >{{ choice.text }}</label
                    >
                  </div>
                </div>
              </fieldset>
            </div>

            <div class="sm:col-span-3">
              <label
                for="country"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Country</label
              >
              <div class="mt-2">
                <select
                  id="country"
                  name="country"
                  autocomplete="country-name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div class="col-span-full">
              <label
                for="street-address"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Street address</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="street-address"
                  id="street-address"
                  autocomplete="street-address"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2 sm:col-start-1">
              <label
                for="city"
                class="block text-sm font-medium leading-6 text-gray-900"
                >City</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autocomplete="address-level2"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="region"
                class="block text-sm font-medium leading-6 text-gray-900"
                >State / Province</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="region"
                  id="region"
                  autocomplete="address-level1"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <label
                for="postal-code"
                class="block text-sm font-medium leading-6 text-gray-900"
                >ZIP / Postal code</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autocomplete="postal-code"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 pb-12 border-b gap-x-8 gap-y-10 border-gray-900/10 md:grid-cols-3"
        >
          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>
          </div>

          <div class="max-w-2xl space-y-10 md:col-span-2">
            <fieldset>
              <legend class="text-sm font-semibold leading-6 text-gray-900">
                By Email
              </legend>
              <div class="mt-6 space-y-6">
                <div class="relative flex gap-x-3">
                  <div class="flex items-center h-6">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="comments" class="font-medium text-gray-900"
                      >Comments</label
                    >
                    <p class="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div class="relative flex gap-x-3">
                  <div class="flex items-center h-6">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="candidates" class="font-medium text-gray-900"
                      >Candidates</label
                    >
                    <p class="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div class="relative flex gap-x-3">
                  <div class="flex items-center h-6">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                    />
                  </div>
                  <div class="text-sm leading-6">
                    <label for="offers" class="font-medium text-gray-900"
                      >Offers</label
                    >
                    <p class="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend class="text-sm font-semibold leading-6 text-gray-900">
                Push Notifications
              </legend>
              <p class="mt-1 text-sm leading-6 text-gray-600">
                These are delivered via SMS to your mobile phone.
              </p>
              <div class="mt-6 space-y-6">
                <div class="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                  />
                  <label
                    for="push-everything"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Everything</label
                  >
                </div>
                <div class="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                  />
                  <label
                    for="push-email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >Same as email</label
                  >
                </div>
                <div class="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
                  />
                  <label
                    for="push-nothing"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >No push notifications</label
                  >
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-end mt-6 gap-x-6">
        <button
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </Form></BaseSectionContent
  >
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid'
import { Field, ErrorMessage, Form } from 'vee-validate'
const route = useRoute()

const form = ref({
  workTime: [
    { hours: 9, minutes: 30, seconds: 0 },
    { hours: 18, minutes: 30, seconds: 0 }
  ],
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
})

const label = ref('checkbox1')

const listDay = [
  { text: 'อาทิตย์', value: 'sun' },
  { text: 'จันทร์', value: 'mon' },
  { text: 'อังคาร', value: 'tue' },
  { text: 'พุธ', value: 'wed' },
  { text: 'พฤหัส', value: 'thu' },
  { text: 'ศุกร์', value: 'fri' },
  { text: 'เสาร์', value: 'sat' }
]
const checkedDays = ref(['mon', 'tue', 'wed', 'thu', 'fri'])

const selectedWorkDays = ref('style-1')
const workStyles = [
  { id: 'style-1', text: 'onsite', value: 'ONSITE' },
  { id: 'style-2', text: 'online', value: 'ONLINE' },
  { id: 'style-3', text: 'hybrid', value: 'HYBRID' }
]

const selectedLocation = ref('new')
const choicesLocation = [
  { id: 'new', text: 'เพิ่มที่อยู่ใหม่', value: 'new' },
  { id: 'default', text: 'ใช้ที่อยู่เดียวกันกับบริษัท', value: 'default' }
]
</script>

<style lang="scss" scoped></style>
