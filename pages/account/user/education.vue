<template>
  <BaseSectionCard topic="Education">
    <!-- List All Education -->
    <div v-for="(education, index) in educationList" v-if="educationList">
      <div
        :class="
          !statusEditEducation
            ? 'flex'
            : editingEducation?.id != index
            ? 'flex'
            : 'hidden'
        "
        class="flex flex-col items-start justify-between gap-2 px-5 py-4 bg-white border-0 rounded-md lg:gap-8 lg:items-center ring-inset ring-1 ring-gray-200 lg:flex-row"
      >
        <BaseText :label="education.degree" class="w-full lg:max-w-lg">
          {{
            education.schoolName +
            ' ' +
            (education.field ? education.field : '')
          }}
          <BaseLine class="py-2" v-if="education.educationDesc" />
          {{ education.educationDesc }}
        </BaseText>

        <div class="w-full text-end">
          <div class="flex items-center justify-end gap-6">
            <BaseItem :icon="AcademicCapIcon" class="min-w-max">
              {{ education.startedYear }} -
              {{
                education.graduatedYear ? education.graduatedYear : 'Present'
              }}
            </BaseItem>
            <div class="flex items-center text-xs text-gray-500 lg:text-sm">
              Grade : {{ education.grade ? education.grade : '-' }}
            </div>
            <Menu as="div" class="relative inline-block -ml-2 text-left">
              <div>
                <MenuButton
                  class="flex items-center text-gray-400 rounded-full hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  <span class="sr-only">Open options</span>
                  <EllipsisVerticalIcon class="w-7 h-7" aria-hidden="true" />
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
                        @click="editEducation(education, index)"
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
                        @click="deleteEducation(index)"
                        >Delete</BaseItem
                      >
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <!-- Sub-Form Edit Education -->
      <FormEducation
        v-if="statusEditEducation && editingEducation?.id == index"
        :education="editingEducation"
        @submit="saveEducation()"
        @cancel="hideEditEducationMode()"
        editmode
      />
    </div>

    <!-- Button add new education -->
    <BaseLineTopic center v-if="!statusAddEducation && !statusEditEducation">
      <BaseButton
        class="mt-1"
        type="button"
        :leadingIcon="PlusIcon"
        full
        secondary
        @click="showAddEducationMode()"
        :disabled="statusEditEducation"
        >Add Education
      </BaseButton>
    </BaseLineTopic>

    <!-- Sub-Form Add Education -->
    <FormEducation
      v-else-if="statusAddEducation"
      :education="education"
      @submit="addNewEducation()"
      @cancel="hideAddEducationMode()"
    />
  </BaseSectionCard>
</template>

<script setup>
import {
  PlusIcon,
  PencilIcon,
  EllipsisVerticalIcon,
  TrashIcon as TrashIconSolid,
  CheckIcon
} from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { AcademicCapIcon } from '@heroicons/vue/24/outline'
const props = defineProps({
  myUser: {
    type: Object,
    required: true
  }
})

// ---- Part: Education ----
const educationList = ref([
  // {
  //   degree: 'อนุบาล',
  //   educationDesc: '',
  //   field: null,
  //   grade: '3.97',
  //   startedYear: 2005,
  //   graduatedYear: 2013,
  //   schoolName: 'โรงเรียนศิรินุสรณ์วิทยา'
  // },
  // {
  //   degree: 'มัธยมศึกษาตอนต้น',
  //   educationDesc: 'เรียนห้องพิเศษ SMT',
  //   field: null,
  //   grade: '3.92',
  //   startedYear: 2013,
  //   graduatedYear: 2016,
  //   schoolName: 'โรงเรียนรัตนโกสินทร์สมโภชบางขุนเทียน'
  // },
  // {
  //   degree: 'มัธยมศึกษาตอนปลาย',
  //   educationDesc: 'เรียนร่วมกับโครงการห้องเรียนพิเศษ SMT',
  //   field: null,
  //   grade: '3.93',
  //   startedYear: 2017,
  //   graduatedYear: 2019,
  //   schoolName: 'โรงเรียนรัตนโกสินทร์สมโภชบางขุนเทียน'
  // },
  // {
  //   degree: 'ปริญญาตรี',
  //   educationDesc: '',
  //   field: 'คณะเทคโนโลยีสารสนเทศ สาขาเทคโนโลยีสารสนเทศ',
  //   grade: '3.93',
  //   startedYear: 2020,
  //   graduatedYear: 2024,
  //   schoolName: 'มหาวิทยาลัยเทคโนโลยีสารสนเทศพระจอมเกล้าธนบุรี'
  // }
])
educationList.value = props.myUser.educations
const statusAddEducation = ref(false)
const education = ref({
  degree: '',
  educationDesc: '',
  educationId: '',
  field: null,
  grade: null,
  graduatedYear: null,
  schoolName: '',
  startedYear: null
  //---- example data ---
  // degree: 'New Degree',
  // educationDesc: 'Description.... ',
  // field: 'field',
  // grade: 'A',
  // startedYear: 2020,
  // graduatedYear: 2024,
  // schoolName: 'New shcool name'
})

const resetEducation = () => {
  education.value = {
    degree: '',
    educationDesc: '',
    educationId: '',
    field: null,
    grade: null,
    graduatedYear: null,
    schoolName: '',
    startedYear: null
  }
}
const showAddEducationMode = () => (statusAddEducation.value = true)
const hideAddEducationMode = () => {
  statusAddEducation.value = false
  resetEducation()
}
const addNewEducation = () => {
  educationList.value.push({
    id: educationList.value.length,
    ...education.value
  })
  hideAddEducationMode()
}

const editingEducation = ref(null)
const statusEditEducation = ref(false)
const showEditEducationMode = () => (statusEditEducation.value = true)
const hideEditEducationMode = () => {
  statusEditEducation.value = false
  editingEducation.value = null
}
const editEducation = (editEducation, index) => {
  if (!statusAddEducation.value && editingEducation.value == null) {
    editingEducation.value = { ...editEducation, id: index }
    showEditEducationMode()
  }
}
const saveEducation = () => {
  const { id } = editingEducation.value
  educationList.value[id] = editingEducation.value
  hideEditEducationMode()
}
const deleteEducation = (index) => {
  if (index > -1) {
    educationList.value.splice(index, 1)
  }
  hideEditEducationMode()
}
</script>

<style lang="scss" scoped></style>
