<template>
  <!--     :initial-values="initialValues" -->
  <Form
    @submit="submitForm"
    v-slot="{ meta, values, errors }"
    :validation-schema="schema"
  >
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
            <BaseLabel id="positions" required>
              ตำแหน่งงานที่เปิดรับ
            </BaseLabel>
            <!-- List Position -->
            <div v-for="(position, index) in positionList">
              <div
                :class="
                  !statusEditPosition
                    ? 'flex'
                    : positionEditing.id != index
                    ? 'flex'
                    : 'hidden'
                "
                class="flex-col items-end justify-between gap-2 px-5 py-2 mt-2 bg-white border-0 rounded-md lg:items-center ring-inset ring-1 ring-gray-200 lg:flex-row"
              >
                <BaseText
                  :label="position.openPositionTitle"
                  class="w-full lg:max-w-sm"
                >
                  {{ position.openPositionDesc }}
                </BaseText>
                <div class="flex items-center gap-4">
                  <BaseItem :icon="BriefcaseIcon" class="min-w-fit">
                    {{ position.workMonth ? position.workMonth : 'ไม่ระบุ' }}
                  </BaseItem>
                  <BaseItem :icon="CurrencyDollarIcon" class="min-w-fit">
                    {{ position.salary ? position.salary : 'ไม่ระบุ' }}
                  </BaseItem>
                  <BaseItem :icon="UsersIcon" class="min-w-fit">{{
                    position.openPositionNum
                      ? position.openPositionNum
                      : 'ไม่ระบุ'
                  }}</BaseItem>
                  <Menu as="div" class="relative inline-block -ml-2 text-left">
                    <div>
                      <MenuButton
                        class="flex items-center text-gray-400 rounded-full hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                      >
                        <span class="sr-only">Open options</span>
                        <EllipsisVerticalIcon
                          class="w-7 h-7"
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
                              >แก้ไข</BaseItem
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
                              >ลบ</BaseItem
                            >
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
              </div>
              <!-- Sub form for edit positionList -->
              <FormPosition
                v-if="statusEditPosition && positionEditing.id == index"
                :position="positionEditing"
                @submit="savePosition()"
                @cancel="hideEditPosition()"
                editmode
                :statusButton="
                  !(
                    positionEditing.openPositionTitle &&
                    positionEditing.openPositionDesc
                  ) ||
                  errors.openPositionTitle ||
                  errors.openPositionDesc ||
                  errors.salary ||
                  errors.workMonth ||
                  errors.openPositionNum
                "
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
              :disabled="statusEditPosition"
              >เพิ่มตำแหน่งงาน
            </BaseButton>

            <!-- Sub form add position -->
            <FormPosition
              v-else-if="statusAddPosition"
              :position="position"
              @submit="addPosition()"
              @cancel="hideAddPosition()"
              :statusButton="
                !(position.openPositionTitle && position.openPositionDesc) ||
                errors.openPositionTitle ||
                errors.openPositionDesc ||
                errors.salary ||
                errors.workMonth ||
                errors.openPositionNum
              "
            />
          </div>
          <div class="sm:col-span-5">
            <BaseLabel id="postTag" :icon="TagIcon" required>Tags</BaseLabel>
            <Field v-slot="{ field, errors }" name="postTagList">
              <Multiselect
                v-bind="field"
                v-model="form.postTagList"
                mode="tags"
                name="postTag"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
                :options="listPositionTag"
                class="multiselect-blue"
              />
              <div class="pl-2 text-xs text-red-500">{{ errors[0] }}</div>
            </Field>
          </div>
        </ContainerField>
      </ContainerForm>
      <ContainerForm>
        <BaseTitleForm> ข้อมูลการฝึกงาน </BaseTitleForm>
        <ContainerField>
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
            <!-- Error Message : workDay -->
            <div
              class="pl-2 text-xs text-red-500"
              v-show="form.workDay.length == 0"
            >
              โปรดเลือก วันทำงานอย่างน้อย 1 วัน
            </div>
          </div>
          <Field v-slot="{ field, errors }" name="workTime">
            <BaseTimePicker
              class="sm:col-span-3"
              label="เวลาทำงาน"
              id="time-only"
              placeholder="Select Time"
              v-bind="field"
              v-model="workTime"
              required
            >
              <template v-slot:error-message> {{ errors[0] }}</template>
            </BaseTimePicker>
          </Field>

          <div class="sm:col-start-1 sm:col-span-3">
            <BaseLabel id="workType" required> รูปแบบการฝึกงาน </BaseLabel>
            <fieldset class="mt-2">
              <div
                class="space-y-4 md:flex md:items-center md:space-x-10 md:space-y-0"
              >
                <div
                  v-for="choice in workTypes"
                  :key="choice.value"
                  class="flex items-center"
                >
                  <input
                    :id="choice.value"
                    :name="choice.value"
                    type="radio"
                    :value="choice.value"
                    v-model="form.workType"
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
            <BaseLabel id="postDesc" required
              >รายละเอียดงานที่จะให้ทำ</BaseLabel
            >
            <div class="mt-1">
              <ClientOnly>
                <quill-editor
                  content-type="html"
                  theme="snow"
                  :toolbar="quillToolbar"
                  class="h-full"
                  v-model:content="form.postDesc"
                  style="
                    height: 150px;
                    border-bottom-right-radius: 0.375rem;
                    border-bottom-left-radius: 0.375rem;
                  "
                />
              </ClientOnly>
              <div class="pl-2 text-xs text-red-500">
                {{ checkTextOnly(form.postDesc, 'รายละเอียดงานที่จะให้ทำ') }}
              </div>
            </div>
          </div>
          <div class="col-span-full">
            <BaseLabel id="postWelfare" required>สวัสดิการอื่นๆ</BaseLabel>
            <div class="mt-1">
              <ClientOnly>
                <quill-editor
                  content-type="html"
                  theme="snow"
                  :toolbar="quillToolbar"
                  class="h-full"
                  v-model:content="form.postWelfare"
                  style="
                    height: 100px;
                    border-bottom-right-radius: 0.375rem;
                    border-bottom-left-radius: 0.375rem;
                  "
                />
              </ClientOnly>
              <div class="pl-2 text-xs text-red-500">
                {{ checkTextOnly(form.postWelfare, 'สวัสดิการ') }}
              </div>
            </div>
          </div>
        </ContainerField>
      </ContainerForm>
      <ContainerForm>
        <BaseTitleForm>การสมัคร</BaseTitleForm>
        <ContainerField>
          <div class="col-span-full">
            <BaseLabel id="enrolling" required>วิธีการสมัคร</BaseLabel>
            <div class="mt-1">
              <ClientOnly>
                <quill-editor
                  content-type="html"
                  theme="snow"
                  :toolbar="quillToolbar"
                  class="h-full"
                  v-model:content="form.enrolling"
                  style="
                    height: 100px;
                    border-bottom-right-radius: 0.375rem;
                    border-bottom-left-radius: 0.375rem;
                  "
                />
              </ClientOnly>
              <div class="pl-2 text-xs text-red-500">
                {{ checkTextOnly(form.enrolling, 'วิธีการสมัคร') }}
              </div>
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
            :min-date="new Date()"
            fixed-start
            required
          >
            <template v-slot:error-message>
              {{
                closingDate == null
                  ? 'โปรดเลือก วันที่ปิดรับสมัคร'
                  : closingDate <= new Date()
                  ? 'ควรเปิดรับสมัครมากกว่า 1 วัน'
                  : ''
              }}
            </template>
          </BaseDatePicker>
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
                    :id="choice.value"
                    :name="choice.value"
                    type="radio"
                    :value="choice.value"
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
          <BaseDropdown
            class="z-40 sm:col-span-2"
            :option-lists="provinceList"
            label="จังหวัด"
            v-model="myAddress.province"
            required
            @click="getAmphure(myAddress.province.id)"
          >
          </BaseDropdown>
          <BaseDropdown
            class="z-30 sm:col-span-2"
            :option-lists="amphureList"
            label="เขต"
            v-model="myAddress.amphure"
            :disabled="!(amphureList.length > 0)"
            required
            @click="getTambon(myAddress.province.id, myAddress.amphure.id)"
          >
          </BaseDropdown>
          <!--       :disabled="!(amphureList.length > 0)" -->
          <BaseDropdown
            class="z-20 sm:col-span-2"
            :option-lists="tambonList"
            label="แขวง"
            v-model="myAddress.tambon"
            :disabled="!(tambonList.length > 0)"
            required
          >
          </BaseDropdown>
          <BaseInputField
            class="sm:col-span-4"
            label="ที่อยู่"
            id="area"
            v-model="form.address.area"
            required
          >
          </BaseInputField>
          <BaseInput
            class="sm:col-span-2"
            label="รหัสไปรณีย์"
            id="postalCode"
            v-model="myAddress.tambon.zip_code"
            disabled
          ></BaseInput>
        </ContainerField>
      </ContainerForm>

      <ContainerForm>
        <BaseTitleForm>ช่องทางการติดต่อ</BaseTitleForm>
        <ContainerField>
          <BaseInputField
            class="sm:col-span-3"
            label="ชื่อผู้ประสานงาน"
            id="coordinatorName"
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
            v-model="form.postUrl"
          ></BaseInputField>
        </ContainerField>
      </ContainerForm>
      <div class="flex justify-between gap-2">
        <BaseButton
          :leadingIcon="TrashIcon"
          type="button"
          negative
          @click="gotoBack()"
          >Cancel</BaseButton
        >
        <BaseButton
          :trailingIcon="ChevronRightIcon"
          type="submit"
          :disabled="
            statusAddPosition ||
            statusEditPosition ||
            !(form.workDay.length > 0) ||
            checkTextOnly(form.postDesc, 'รายละเอียดงานที่จะให้ทำ') != '' ||
            checkTextOnly(form.postWelfare, 'สวัสดิการ') != '' ||
            checkTextOnly(form.enrolling, 'วิธีการสมัคร') != '' ||
            (statusClosingDate && closingDate == null) ||
            (statusClosingDate && closingDate <= new Date())
            // ||
            // !meta.valid
          "
          >Save</BaseButton
        >
      </div>
    </BaseSectionContent>
  </Form>
</template>

<script setup>
import {
  PlusIcon,
  ChevronRightIcon,
  PencilIcon,
  EllipsisVerticalIcon,
  TrashIcon as TrashIconSolid
} from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
  TrashIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  UsersIcon,
  TagIcon
} from '@heroicons/vue/24/outline'
import FormPosition from '@/components/form/FormPosition.vue'
import ContainerForm from '@/components/form/ContainerForm.vue'
import ContainerField from '@/components/form/ContainerField.vue'
import { Field, ErrorMessage, Form } from 'vee-validate'
import yup from '@/assets/yup-error.js'
import moment from 'moment'
import Swal from 'sweetalert2'

definePageMeta({
  layout: 'form'
})

const route = useRoute()
const postId = route.params.postId
const router = useRouter()
const gotoBack = () => {
  Swal.fire({
    title: 'Cancel create this post',
    text: 'คุณแน่ใจจะยกเลิกการแก้ไข Post นี้?',
    icon: 'warning',
    confirmButtonText: 'Comfirm',
    confirmButtonColor: 'red',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: 'gray',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      router.back()
    }
  })
}

// --- GET : position-tag (postTag) ---
const listPositionTag = ref([])
const getListPositionTag = async () => {
  listPositionTag.value = []
  try {
    const res = await usePositionTag()
    if (res.value.status === 200) {
      console.log(res.value.message)
      res.value.data.forEach((item) => {
        listPositionTag.value.push(item.positionTagName)
      })
      // console.log(listPositionTag.value)
    }
  } catch (error) {
    // console.log(error)
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'Error',
      text: 'get /position-tag ใช้งานไม่ได้'
    })
  }
}
await getListPositionTag()

// --- input : เพิ่มตำแหน่งงาน ---
const statusAddPosition = ref(false)
const showAddPosition = () => (statusAddPosition.value = true)
const hideAddPosition = () => {
  statusAddPosition.value = false
  resetPosition()
}
const position = ref({
  openPositionDesc: '',
  openPositionTitle: '',
  openPositionNum: null,
  salary: null,
  workMonth: null
})
const checkNull = () => {
  console.log('check null')
  position.value.workMonth ? '' : (position.value.workMonth = null)
  position.value.salary ? '' : (position.value.salary = null)
  position.value.openPositionNum ? '' : (position.value.openPositionNum = null)
}
const resetPosition = () => {
  position.value = {
    openPositionDesc: '',
    openPositionTitle: '',
    openPositionNum: null,
    salary: null,
    workMonth: null
  }
}
const addPosition = () => {
  checkNull()
  positionList.value.push(position.value)
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
  if (!statusAddPosition.value && positionEditing.value == null) {
    positionEditing.value = { ...position, id: index }
  }
}
const savePosition = () => {
  const {
    id,
    openPositionDesc,
    openPositionNum,
    openPositionTitle,
    salary,
    workMonth
  } = positionEditing.value
  positionList.value[id] = {
    openPositionTitle,
    openPositionNum,
    workMonth,
    salary,
    openPositionDesc
  }
  hideEditPosition()
}

const deletePosition = (index) => {
  if (index > -1) {
    positionList.value.splice(index, 1)
  }
  hideEditPosition()
}

const positionList = ref([
  // {
  //   openPositionTitle: '[Test] Frontend Developer',
  //   openPositionDesc: 'ทำงานเกี่ยวกับการพัฒนาระบบหน้าบ้าน ออกแบบหน้าเว็บ',
  //   workMonth: 6,
  //   salary: 300,
  //   openPositionNum: 2
  // }
])

const setOpenPositionList = () => {
  form.value.openPositionList = []
  let openPositionList = form.value.openPositionList
  positionList.value.forEach((p, index) => {
    let position = {
      openPositionTitle: p.openPositionTitle,
      openPositionNum: p.openPositionNum,
      openPositionDesc: p.openPositionDesc,
      workMonth: p.workMonth,
      salary: p.salary ? p.salary : null
    }
    openPositionList.push(position)
  })
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
  { text: 'Transcript', value: 'transcript' }
]

// --- radio : รูปแบบการทำงาน ---
const workTypes = [
  { text: 'onsite', value: 'ONSITE' },
  { text: 'online', value: 'ONLINE' },
  { text: 'hybrid', value: 'HYBRID' }
]

// --- radio : สถานที่ฝึกงาน ---
const selectedLocation = ref('new')
const choicesLocation = [
  { text: 'เพิ่มที่อยู่ใหม่', value: 'new' },
  { text: 'ใช้ที่อยู่เดียวกันกับบริษัท', value: 'default' }
]

// --- radio : ระยะที่เปิดรับสมัคร ---
const choicesClosedDate = [
  { id: 'open', text: 'เปิดรับตลอดเวลา', value: false },
  { id: 'close', text: 'ปิดรับสมัคร', value: true }
]
const statusClosingDate = ref(false)
const closingDate = ref()
const setClosedDate = () => {
  if (statusClosingDate.value) {
    form.value.closedDate = moment(closingDate.value).format().substring(0, 19)
  } else {
    form.value.closedDate = null
  }
}
const setupClosedDate = () => {
  if (props?.post.closedDate !== null) {
    closingDate.value = new Date(props?.post.closedDate)
    statusClosingDate.value = true
  }
}

// --- time-picker : เวลาเริ่ม-เลิกงาน ---
const workTime = ref([
  // { hours: 9, minutes: 0, seconds: 0 },
  // { hours: 18, minutes: 0, seconds: 0 }
])
const setupWorkTime = () => {
  let startTime = props?.post.workStartTime
  let endTime = props?.post.workEndTime

  let arrStartTime = startTime.split(':')
  let arrEndTime = endTime.split(':')

  workTime.value = [
    {
      hours: Number(arrStartTime[0]),
      minutes: Number(arrStartTime[1]),
      seconds: Number(arrStartTime[2])
    },
    {
      hours: Number(arrEndTime[0]),
      minutes: Number(arrEndTime[1]),
      seconds: Number(arrEndTime[2])
    }
  ]
}

const setWorkTime = () => {
  if (workTime.value) {
    let startTime = workTime.value[0]
    let endTime = workTime.value[1]
    form.value.workStartTime = `${
      startTime.hours < 10 ? '0' + startTime.hours : startTime.hours
    }:${startTime.minutes < 10 ? '0' + startTime.minutes : startTime.minutes}`

    form.value.workEndTime = `${
      endTime.hours < 10 ? '0' + endTime.hours : endTime.hours
    }:${endTime.minutes < 10 ? '0' + endTime.minutes : endTime.minutes}`
  }
}

// --- location: province > amphure > tambon ---
const sortingThai = (a, b) => {
  return a.text.localeCompare(b.text, 'th')
}
const myAddress = ref({
  province: { id: 0, text: 'เลือก จังหวัด' },
  amphure: { id: 0, text: 'เลือก เขต' },
  tambon: { id: 0, text: 'เลือก แขวง', zip_code: null }
})
const { data } = await useFetch('/api/locations-thai')
// console.log(data.value)
const provinceList = ref([])
const getProvince = () => {
  let list = []
  let province
  data.value.forEach((city) => {
    province = {
      id: city.id,
      text: city.name_th
    }
    list.push(province)
  })
  list.sort(sortingThai)
  provinceList.value = list
}
getProvince()

const amphureList = ref([])
const getAmphure = (provinceId) => {
  amphureList.value = []
  myAddress.value.amphure = { id: 0, text: 'เลือก เขต' }
  tambonList.value = []
  myAddress.value.tambon = { id: 0, text: 'เลือก แขวง', zip_code: null }
  let list = []
  let result = data.value.find((city) => city.id === provinceId)
  let amphure
  result.amphure.forEach((district) => {
    amphure = {
      id: district.id,
      text: district.name_th
    }
    list.push(amphure)
  })
  list.sort(sortingThai)
  amphureList.value = list
}

const tambonList = ref([])
const getTambon = (provinceId, amphureId) => {
  tambonList.value = []
  myAddress.value.tambon = { id: 0, text: 'เลือก แขวง', zip_code: null }
  let province = data.value.find((city) => city.id === provinceId)
  let amphure = province.amphure.find((district) => district.id === amphureId)
  let list = []
  let tambon
  amphure.tambon.forEach((subDistrict) => {
    tambon = {
      id: subDistrict.id,
      text: subDistrict.name_th,
      zip_code: subDistrict.zip_code
    }
    list.push(tambon)
  })
  list.sort(sortingThai)
  tambonList.value = list
}

const setAddress = () => {
  let address = form.value.address
  ;(address.city = myAddress.value.province.text),
    (address.district = myAddress.value.amphure.text),
    (address.subDistrict = myAddress.value.tambon.text),
    (address.postalCode = myAddress.value.tambon.zip_code)
}

const setupMyAddress = () => {
  let address = form.value.address
  let province = data.value.find((p) => p.name_th === address.city)
  if (province) {
    myAddress.value.province.id = province.id
    myAddress.value.province.text = province.name_th
    getAmphure(myAddress.value.province.id)
  }
  let amphure = amphureList.value.find((a) => a.text == address.district)
  if (amphure) {
    myAddress.value.amphure.id = amphure.id
    myAddress.value.amphure.text = amphure.text
    getTambon(myAddress.value.province.id, myAddress.value.amphure.id)
  }
  let tambon = tambonList.value.find((t) => t.text == address.subDistrict)
  if (tambon) {
    myAddress.value.tambon.id = tambon.id
    myAddress.value.tambon.text = tambon.text
    myAddress.value.tambon.zip_code = tambon.zip_code
  }
}

// --- location: get latitude / longtitude ---
const getGeoLication = async () => {
  setAddress()
  let address = form.value.address
  let location = address.area.concat(
    ' ',
    address.subDistrict,
    ' ',
    address.district,
    ' ',
    address.city,
    ' ',
    address.country,
    ' ',
    address.postalCode
  )
  try {
    const res = await useGoogleMap(location)
    let response = res.value
    if (response.status == 'OK') {
      address.latitude = response.results[0].geometry.location.lat
      address.longitude = response.results[0].geometry.location.lng
      console.log(address.latitude + ',' + address.longitude)
    } else {
      // console.log('Unable to locate this location.')
      Swal.fire({
        showConfirmButton: true,
        timerProgressBar: true,
        confirmButtonColor: 'blue',
        icon: 'error',
        title: 'ที่อยู่ไม่ถูกต้อง',
        text: 'กรุณากรอกที่อยู่ใหม่อีกครั้ง'
      })
    }
  } catch (error) {
    console.error('Error fetching location:', error)
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'ที่อยู่ไม่ถูกต้อง',
      text: 'กรุณากรอกที่อยู่ใหม่อีกครั้ง'
    })
  }
}

const form = ref({
  title: '',
  closedDate: null, // function setClosedDate()
  coordinatorName: '',
  postDesc: '',
  postWelfare: '',
  enrolling: '',
  documents: [],
  tel: '',
  email: '',
  address: {
    country: '',
    postalCode: '',
    city: '',
    district: '',
    subDistrict: '',
    area: '',
    latitude: null, // function getGeoLication()
    longitude: null
  },
  //function setWorkTime()
  workStartTime: '',
  workEndTime: '',
  workDay: ['mon', 'tue', 'wed', 'thu', 'fri'], //ส่ง array หรือ string ? *check value choices
  workType: 'HYBRID',
  comp: {
    compId: '8e20782f-2807-4f13-a11e-0fb9ff955488'
  },
  openPositionList: [], //function setOpenPositionList()
  postUrl: '',
  postTagList: [] //function setPostTag()
})

const props = defineProps({
  post: {
    type: Object
  }
})

form.value = props?.post
// const initialValues = ref(form.value)
positionList.value = props?.post.openPositionList
setupWorkTime() // workStartTime, workEndTime ---> workTime
setupClosedDate() // closeedDate ---> closingDate, statusClosingDate
setupMyAddress() // address ---> myAddress

console.log('props')
console.log(props.post)
console.log('form')
console.log(form.value)
// console.log('initialValues')
// console.log(initialValues.value)

// -- quill editor ---
const quillToolbar = [
  { size: ['small', false, 'large'] },
  'bold',
  'italic',
  'underline',
  'strike',
  { list: 'ordered' },
  { list: 'bullet' }
]

// --- check validate : length quill-editor ---
function checkTextOnly(value, error_message) {
  if (value.length == 0) {
    return ''
  } else if (!value.replace(/<[^>]*>/g, '').trim()) {
    return 'โปรดระบุ ' + error_message
  } else if (value.replace(/<[^>]*>/g, '').length > 750) {
    return 'ไม่เกิน 750 ตัวอักษร'
  } else {
    return ''
  }
}

// --- check validate : yup ---
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
  title: yup.string().trim().required('โปรดระบุ หัวข้อตำแหน่งงาน').max(100),

  //positionList: positionList.legnth > 0
  openPositionTitle: yup.string().max(50),
  openPositionDesc: yup.string().max(300),
  workMonth: yup.number().typeError().nullable().positive(),
  salary: yup.number().typeError().nullable().positive(),
  openPositionNum: yup.number().typeError().nullable().positive().integer(),
  postTagList: yup
    .array()
    .min(1, 'โปรดระบุ อย่างน้อย 1 tag')
    .max(10, 'ไม่เกิน 10 tag'),
  // workDay: form.workDay.length != 0
  workTime: yup.array().nonNullable('โปรดเลือก เวลาทำงาน'),
  // postDesc: checkTextOnly()
  // postWelfare: checkTextOnly()
  // enrolling: checkTextOnly()
  // documents : null
  // closingDate: null | date
  //address : myAddress.value.tambon.zip_code != null
  area: yup.string().required('โปรดระบุ ที่อยู่').max(100),
  coordinatorName: yup
    .string()
    .trim()
    .required('โปรดระบุ ชื่อผู้ประสานงาน')
    .max(100),
  tel: yup
    .string()
    .trim()
    .required('โปรดระบุ เบอร์โทร')
    .matches(phoneRegExp, 'เบอร์โทรไม่ถูกต้อง')
    .max(10),
  email: yup.string().email().required('โปรดระบุ อีเมล').max(320),
  postUrl: yup.string().url('url ไม่ถูกต้อง').nullable().max(300)
})

const checkValidate = () => {
  let error_message = ''
  if (form.value.openPositionList.length === 0) {
    error_message = 'กรุณา เพิ่มตำแหน่งงาน'
  } else if (myAddress.value.tambon.zip_code == null) {
    error_message = 'กรุณา เลือกจังหวัด/เขต/แขวง'
  } else if (
    form.value.address.latitude == null &&
    form.value.address.longitude == null
  ) {
    error_message = 'ที่อยู่ไม่ถูกต้อง'
  } else {
    error_message = null
  }
  return error_message
}

const submitForm = async () => {
  setClosedDate()
  setWorkTime()
  setOpenPositionList()
  await getGeoLication()
  console.log('edit')
  console.log(form.value)
  let error_message = checkValidate()
  if (error_message != null) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'เกิดข้อพลาดผิดพลาด',
      text: error_message
    })
  } else {
    await savePost()
  }
}

const savePost = async () => {
  console.log(form.value)
  try {
    const res = await updatePost(postId, form.value)
    if (res.value) {
      Swal.fire({
        title: 'Update Post',
        confirmButtonColor: 'blue',
        text: 'บันทึกการแก้ไข post สำเร็จ',
        icon: 'success'
      }).then((result) => {
        if (result.value || result.dismiss) {
          router.push({ path: `/internship/${postId}` })
        }
      })
    }
  } catch (error) {
    console.log(error)
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'Error',
      text: 'ไม่สามารถแก้ไข post นี้ได้'
    })
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
