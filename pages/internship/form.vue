<template>
  {{ form }}
  <BaseSectionContent class="px-5 py-4 space-y-6 md:px-10 md:py-8">
    <ContainerForm>
      <BaseTitleForm> ประกาศฝึกงาน </BaseTitleForm>
      <ContainerField>
        <BaseInputField
          class="sm:col-span-4"
          label="หัวข้อประกาศ"
          id="title"
          v-model="form.title"
          required
        ></BaseInputField>
        <div class="col-span-full">
          <BaseLabel id="positions" required> ตำแหน่งงานที่เปิดรับ </BaseLabel>
          <!-- List Position -->
          <div v-for="(position, index) in form.positionList">
            <div
              :class="
                !statusEditPosition
                  ? 'flex'
                  : positionEditing.id != index
                  ? 'flex'
                  : 'hidden'
              "
              class="items-center justify-between gap-2 px-5 py-2 mt-2 bg-white border-0 rounded-md ring-inset ring-1 ring-gray-200"
            >
              <BaseText :label="position.title">{{ position.desc }}</BaseText>
              <div class="flex gap-6">
                <BaseItem :icon="BriefcaseIcon">{{
                  position.workMonth
                }}</BaseItem>
                <BaseItem :icon="CurrencyDollarIcon">
                  {{ position.salary }}
                </BaseItem>
                <BaseItem :icon="UsersIcon">{{ position.num }}</BaseItem>
                <Menu as="div" class="relative inline-block text-left">
                  <div>
                    <MenuButton
                      class="flex items-center text-gray-400 rounded-full hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                      <span class="sr-only">Open options</span>
                      <EllipsisVerticalIcon
                        class="w-8 h-8"
                        aria-hidden="true"
                      />
                    </MenuButton>
                  </div>

                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 w-auto mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div class="py-1">
                        <MenuItem v-slot="{ active }">
                          <BaseItem
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm cursor-pointer hover:underline'
                            ]"
                            :icon="PencilIcon"
                            @click="editPosition(position, index)"
                            >Edit</BaseItem
                          >
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <BaseItem
                            :class="[
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm cursor-pointer hover:underline'
                            ]"
                            :icon="TrashIconSolid"
                            @click="deletePosition(index)"
                            >Delete</BaseItem
                          >
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <FormPosition
              v-if="statusEditPosition && positionEditing.id == index"
              :position="positionEditing"
              @submit="savePosition()"
              @cancel="hideEditPosition()"
              editmode
            />
          </div>
          <!-- Button add Position -->
          <BaseButton
            v-if="!statusAddPosition && !statusEditPosition"
            class="mt-1"
            type="button"
            :leadingIcon="PlusIcon"
            full
            secondary
            @click="showAddPosition()"
            >เพิ่มตำแหน่งงาน
          </BaseButton>

          <!-- Sub form add position -->
          <FormPosition
            v-else-if="statusAddPosition"
            :position="position"
            @submit="addPosition()"
            @cancel="hideAddPosition()"
          />

          <!-- Sub form edit position -->
          <!-- <FormPosition
            v-else-if="statusEditPosition"
            :position="positionEditing"
            @submit="savePosition()"
            @cancel="deletePosition()"
            editmode
          /> -->
        </div>
      </ContainerField>
    </ContainerForm>
    <ContainerForm>
      <BaseTitleForm> ข้อมูลการฝึกงาน </BaseTitleForm>
      <ContainerField>
        <BaseTimePicker
          class="sm:col-span-3"
          label="เวลาทำงาน"
          id="time-only"
          placeholder="Select Time"
          v-model="form.workTime"
          required
        >
        </BaseTimePicker>
        <div class="sm:col-span-4">
          <BaseLabel id="workDays" required>วันทำงาน</BaseLabel>
          <div
            class="mt-1 space-y-2 sm:flex sm:items-center sm:space-x-5 sm:space-y-0"
          >
            <div
              class="relative flex items-start"
              v-for="(item, index) in listDays"
              :key="index"
            >
              <div class="flex items-center h-6">
                <input
                  :id="item.value"
                  :name="item.value"
                  type="checkbox"
                  :value="item.value"
                  v-model="form.workDay"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                />
              </div>
              <div class="ml-2 text-sm leading-6">
                <BaseLabel :id="item.value">{{ item.text }}</BaseLabel>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:col-span-3">
          <BaseLabel id="workType" required> รูปแบบการฝึกงาน </BaseLabel>
          <fieldset class="mt-2">
            <div
              class="space-y-4 md:flex md:items-center md:space-x-10 md:space-y-0"
            >
              <div
                v-for="choice in workTypes"
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
                <BaseLabel :id="choice.value" class="ml-3">
                  {{ choice.text }}
                </BaseLabel>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="col-span-full">
          <BaseLabel id="postDesc" required>รายละเอียดงานที่จะให้ทำ</BaseLabel>
          <div class="mt-1">
            <textarea
              id="about"
              name="about"
              rows="4"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="form.postDesc"
            />
          </div>
        </div>
        <div class="col-span-full">
          <BaseLabel id="postWelfare" required>สวัสดิการอื่นๆ</BaseLabel>
          <div class="mt-1">
            <textarea
              id="about"
              name="about"
              rows="3"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="form.postWelfare"
            />
          </div>
        </div>
      </ContainerField>
    </ContainerForm>
    <ContainerForm>
      <BaseTitleForm>สถานที่ฝึกงาน</BaseTitleForm>
      <ContainerField>
        <div class="col-span-full">
          <fieldset class="mt-2">
            <div
              class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0"
            >
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
                <BaseLabel :id="choice.value" class="ml-3">
                  {{ choice.text }}
                </BaseLabel>
              </div>
            </div>
          </fieldset>
        </div>
        <!-- <BaseInputField
            class="sm:col-span-4"
            label="ประเทศ"
            id="country"
            v-model="form.address.country"
            required
          ></BaseInputField> -->
        <div class="sm:col-span-4">
          <BaseLabel id="country" required>ประเทศ</BaseLabel>
          <div class="mt-1">
            <select
              id="country"
              name="country"
              autocomplete="country-name"
              v-model="form.address.country"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option>Thailand</option>
            </select>
          </div>
        </div>
        <BaseInputField
          class="sm:col-span-2"
          label="รหัสไปรณีย์"
          id="postalCode"
          v-model="form.address.postalCode"
          required
        ></BaseInputField>
        <BaseInputField
          class="sm:col-span-2"
          label="จังหวัด"
          id="city"
          v-model="form.address.city"
          required
        ></BaseInputField>
        <BaseInputField
          class="sm:col-span-2"
          label="เขต"
          id="district"
          v-model="form.address.district"
          required
        ></BaseInputField>
        <BaseInputField
          class="sm:col-span-2"
          label="แขวง"
          id="subDistrict"
          v-model="form.address.subDistrict"
          required
        ></BaseInputField>
        <BaseInputField
          class="col-span-full"
          label="ที่อยู่"
          id="area"
          v-model="form.address.area"
          required
        ></BaseInputField>
      </ContainerField>
    </ContainerForm>
    <ContainerForm>
      <BaseTitleForm>การสมัคร</BaseTitleForm>
      <ContainerField>
        <div class="col-span-full">
          <BaseLabel id="enrolling" required>วิธีการสมัคร</BaseLabel>
          <div class="mt-1">
            <textarea
              id="about"
              name="about"
              rows="3"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="form.enrolling"
            />
          </div>
        </div>
        <div class="sm:col-span-full">
          <BaseLabel id="docuemnts" required>เอกสารประกอบการสมัคร</BaseLabel>
          <div
            class="mt-1 space-y-2 sm:flex sm:items-center sm:space-x-5 sm:space-y-0"
          >
            <div
              class="relative flex items-start"
              v-for="(item, index) in listDocs"
              :key="index"
            >
              <div class="flex items-center h-6">
                <input
                  :id="item.value"
                  :name="item.value"
                  type="checkbox"
                  :value="item.value"
                  v-model="form.documents"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                />
              </div>
              <div class="ml-2 text-sm leading-6">
                <BaseLabel :id="item.value">{{ item.text }}</BaseLabel>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:col-span-3 sm:mb-3">
          <BaseLabel id="closedDate" required>
            ระยะเวลาที่เปิดรับสมัคร
          </BaseLabel>
          <fieldset class="mt-2">
            <div
              class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0"
            >
              <div
                v-for="choice in choicesClosedDate"
                :key="choice.id"
                class="flex items-center"
              >
                <input
                  :id="choice.id"
                  :name="choice.id"
                  type="radio"
                  :value="choice.value"
                  v-model="statusClosingDate"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-600"
                />
                <BaseLabel :id="choice.id" class="ml-3">
                  {{ choice.text }}
                </BaseLabel>
              </div>
            </div>
          </fieldset>
        </div>
        <BaseDatePicker
          v-if="statusClosingDate"
          class="sm:col-span-3"
          label="วันที่ปิดรับสมัคร"
          id="date-only"
          placeholder="Select Closing Date"
          :enable-time-picker="false"
          v-model="closingDate"
          :format="(date) => moment(date).format('DD/MM/YYYY')"
          required
        >
        </BaseDatePicker>
      </ContainerField>
    </ContainerForm>
    <ContainerForm>
      <BaseTitleForm>ช่องทางการติดต่อ</BaseTitleForm>
      <ContainerField>
        <BaseInputField
          class="sm:col-span-3"
          label="ชื่อผู้ประสานงาน"
          id="area"
          v-model="form.coordinatorName"
          required
        ></BaseInputField>
        <BaseInputField
          class="sm:col-span-2"
          label="เบอร์โทร"
          id="tel"
          type="tel"
          v-model="form.tel"
          required
        ></BaseInputField>
        <BaseInputField
          class="sm:col-span-4"
          label="อีเมล"
          id="email"
          type="email"
          v-model="form.email"
          required
        ></BaseInputField>
        <BaseInputField
          class="sm:col-span-4"
          label="เว็บไซต์บริษัท"
          id="website"
          v-model="form.url"
        ></BaseInputField>
      </ContainerField>
    </ContainerForm>
    <div class="flex flex-row-reverse gap-2">
      <BaseButton :trailingIcon="EyeIcon" @click="submitForm()"
        >Preview</BaseButton
      >
      <BaseButton :leadingIcon="TrashIcon" negative>Cancel</BaseButton>
    </div>
  </BaseSectionContent>
</template>

<script setup>
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  EllipsisVerticalIcon,
  TrashIcon as TrashIconSolid
} from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

import {
  TrashIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'
import { Field, ErrorMessage, Form } from 'vee-validate'
import moment from 'moment'
const route = useRoute()

// --- input : เพิ่มตำแหน่งงาน ---
const statusAddPosition = ref(false)
const showAddPosition = () => (statusAddPosition.value = true)
const hideAddPosition = () => {
  statusAddPosition.value = false
  resetPosition()
}
const position = ref({
  title: '',
  desc: '',
  workMonth: null,
  salary: null,
  num: null
})
const resetPosition = () => {
  position.value = {
    title: '',
    desc: '',
    workMonth: null,
    salary: null,
    num: null
  }
}
const addPosition = () => {
  form.value.positionList.push(position.value)
  hideAddPosition()
}
const statusEditPosition = computed(() =>
  positionEditing.value == null ? false : true
)
const positionEditing = ref(null)
const hideEditPosition = () => {
  positionEditing.value = null
}
const editPosition = (position, index) => {
  positionEditing.value = { ...position, id: index }
}
const savePosition = () => {
  const { id, title, num, workMonth, salary, desc } = positionEditing.value
  form.value.positionList[id] = { title, num, workMonth, salary, desc }
  hideEditPosition()
}

const deletePosition = (index) => {
  if (index > -1) {
    form.value.positionList.splice(index, 1)
  }
  hideEditPosition()
}

// --- checkbox : วันทำงาน ---
const listDays = [
  { text: 'อาทิตย์', value: 'sun' },
  { text: 'จันทร์', value: 'mon' },
  { text: 'อังคาร', value: 'tue' },
  { text: 'พุธ', value: 'wed' },
  { text: 'พฤหัส', value: 'thu' },
  { text: 'ศุกร์', value: 'fri' },
  { text: 'เสาร์', value: 'sat' }
]

// --- checkbox : เอกสารประกอบการสมัคร ---
const listDocs = [
  { text: 'Portfolio', value: 'portfolio' },
  { text: 'Resume', value: 'resume' },
  { text: 'CV', value: 'cv' },
  { text: 'Transcript', value: 'transcipt' }
]

// --- radio : รูปแบบการทำงาน ---
const selectedWorkDays = ref('style-1')
const workTypes = [
  { id: 'style-1', text: 'onsite', value: 'ONSITE' },
  { id: 'style-2', text: 'online', value: 'ONLINE' },
  { id: 'style-3', text: 'hybrid', value: 'HYBRID' }
]

// --- radio : สถานที่ฝึกงาน ---
const selectedLocation = ref('new')
const choicesLocation = [
  { id: 'new', text: 'เพิ่มที่อยู่ใหม่', value: 'new' },
  { id: 'default', text: 'ใช้ที่อยู่เดียวกันกับบริษัท', value: 'default' }
]

// --- radio : ระยะที่เปิดรับสมัคร ---
const choicesClosedDate = [
  { id: 'open', text: 'เปิดรับตลอดเวลา', value: false },
  { id: 'close', text: 'ปิดรับสมัคร', value: true }
]
const statusClosingDate = ref(false)
const closingDate = ref()

// --- time-picker : เวลาเริ่ม-เลิกงาน ---
const setWorkTime = () => {
  if (form.value.workTime) {
    let startTime = form.value.workTime[0]
    let endTime = form.value.workTime[1]
    console.log(startTime + ',' + endTime)
    form.value.workStartTime = `${
      startTime.hours < 10 ? '0' + startTime.hours : startTime.hours
    }:${
      startTime.minutes < 10 ? '0' + startTime.minutes : startTime.minutes
    }:00`

    form.value.workEndTime = `${
      endTime.hours < 10 ? '0' + endTime.hours : endTime.hours
    }:${endTime.minutes < 10 ? '0' + endTime.minutes : endTime.minutes}:00`

    console.log(form.value.workStartTime + ',' + form.value.workEndTime)
  }
}

const form = ref({
  title: '',
  positionList: [
    {
      title: 'Frontend Developer',
      desc: 'ทำงานเกี่ยวกับการพัฒนาระบบหน้าบ้าน ออกแบบหน้าเว็บ',
      workMonth: 6,
      salary: 300,
      num: 2
    },
    {
      title: 'Backend Developer',
      desc: 'ทำงานเกี่ยวกับการพัฒนาระบบหลังบ้าน ออกแบบ service และ datastructure',
      workMonth: 6,
      salary: 300,
      num: 2
    }
  ],
  workTime: [
    { hours: 9, minutes: 0, seconds: 0 },
    { hours: 18, minutes: 0, seconds: 0 }
  ],
  workStartTime: '',
  workEndTime: '',

  workDay: ['mon', 'tue', 'wed', 'thu', 'fri'],
  workType: 'HYBRID',
  postDesc: '',
  postWelfare: '',

  address: {
    country: '',
    postalCode: '',
    city: '',
    district: '',
    subDistrict: '',
    area: '',

    // *function get geolocation
    latitude: 13.705368,
    longitude: 100.5331527
  },

  enrolling: '',
  documents: [],

  // *function return null / Date (get stuatusClosedDate, closingDate)
  closedDate: '',

  coordinatorName: '',
  tel: '012-345-6789',
  email: 'nice.vct@mail.kmutt.ac.th'
})

const submitForm = () => {
  setWorkTime()
}
</script>

<style lang="scss" scoped></style>
