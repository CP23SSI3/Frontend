<template>
  <BaseSectionContent class="sm:w-4xl md:w-5xl">
    <div>
      <div class="flex items-center justify-between px-4 py-5 sm:px-10">
        <BaseTitleForm>Experiences</BaseTitleForm>
      </div>
      <BaseLine />
      <div class="flex flex-col gap-2 px-4 py-4 sm:px-10">
        <!-- List All Experience -->
        <div
          v-for="(experiences, index) in experiencesList"
          v-if="experiencesList"
        >
          <div
            :class="
              !statusEditExper
                ? 'flex'
                : editingExper.id != index
                ? 'flex'
                : 'hidden'
            "
            class="flex flex-col items-start justify-between gap-2 px-5 py-4 bg-white border-0 rounded-md lg:gap-8 lg:items-center ring-inset ring-1 ring-gray-200 lg:flex-row"
          >
            <div
              class="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200 min-w-max lg:w-64 lg:text-center"
            >
              {{ experiences.position }}
            </div>

            <BaseText :label="experiences.title" class="w-full lg:max-w-lg">
              {{ experiences.description }}
            </BaseText>
            <div class="w-full text-end">
              <div class="flex items-center justify-end gap-6">
                <BaseItem :icon="BriefcaseIcon" class="min-w-max">
                  {{ experiences.startedYear }} - {{ experiences.endedYear }}
                </BaseItem>
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
                            @click="editExper(experiences, index)"
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
                            @click="deleteExper(index)"
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
          <!-- Sub-Form Edit Experience -->
          <FormExperience
            v-if="statusEditExper && editingExper.id == index"
            :experience="editingExper"
            @submit="saveExper()"
            @cancel="hideEditExperMode()"
            editmode
          />
        </div>

        <!-- Button add new exper. -->
        <BaseLineTopic v-if="!statusAddExper && !statusEditExper"
          ><BaseButton
            class="mt-1"
            type="button"
            :leadingIcon="PlusIcon"
            full
            secondary
            @click="showAddExperMode()"
            :disabled="statusEditExper"
            >Add new data
          </BaseButton>
        </BaseLineTopic>

        <!-- Sub-Form Add Experience -->
        <FormExperience
          v-else-if="statusAddExper"
          :experience="experience"
          @submit="addNewExper()"
          @cancel="hideAddExperMode()"
        />
      </div>
    </div>
    <BaseLine />
  </BaseSectionContent>
  {{ experiencesList }} / {{ editingExper }}
</template>

<script setup>
import {
  PlusIcon,
  ChevronRightIcon,
  PencilIcon,
  EllipsisVerticalIcon,
  TrashIcon as TrashIconSolid,
  CheckIcon
} from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

import {
  TrashIcon,
  BriefcaseIcon,
  CurrencyDollarIcon,
  UsersIcon,
  TagIcon
} from '@heroicons/vue/24/outline'
const loading = ref(false)
const experiencesList = ref([
  // {
  //   id: 1,
  //   title: 'ทำงานพิเศษ',
  //   description:
  //     'ทำงาน Part-time หารายได้เสริมระหว่างเรียน ตอนxu 1-2  deadadwd dwaddw',
  //   position: 'พนักงานขาย',
  //   startedYear: 2020,
  //   endedYear: 2020,
  //   workplace: 'Big C พระราม2'
  // },
  // {
  //   id: 2,
  //   title: 'งาน Commisssion',
  //   description: 'รับจ้างวาดภาพในเพจเฟสบุ๊ค',
  //   position: 'ฟรีแลนซ์',
  //   startedYear: 2022,
  //   endedYear: 2024,
  //   workplace: 'anywhere'
  // }
])

// const experience = ref({
//   title: 'New experience',
//   description: 'New experience description',
//   position: 'New position',
//   startedYear: 2024,
//   endedYear: 2024,
//   workplace: 'anywhere'
// })

const statusAddExper = ref(false)
const experience = ref({
  // title: '',
  // description: '',
  // position: '',
  // startedYear: null,
  // endedYear: null,
  // workplace: ''
  //----
  title: 'New experience',
  description: 'New experience description',
  position: 'New position',
  startedYear: 2024,
  endedYear: 2024,
  workplace: 'anywhere'
})

const resetExperience = () => {
  experience.value = {
    title: '',
    description: '',
    position: '',
    startedYear: null,
    endedYear: null,
    workplace: ''
  }
}
const showAddExperMode = () => (statusAddExper.value = true)
const hideAddExperMode = () => {
  statusAddExper.value = false
  resetExperience()
}
const addNewExper = () => {
  experiencesList.value.push({
    id: experiencesList.value.length,
    ...experience.value
  })
  hideAddExperMode()
}

const editingExper = ref(null)
const statusEditExper = ref(false)
const showEditExperMode = () => (statusEditExper.value = true)
const hideEditExperMode = () => {
  statusEditExper.value = false
  editingExper.value = null
}
const editExper = (editExper, index) => {
  if (!statusAddExper.value && editingExper.value == null) {
    editingExper.value = { ...editExper, id: index }
    showEditExperMode()
  }
}
const saveExper = () => {
  const { id } = editingExper.value
  experiencesList.value[id] = editingExper.value
  hideEditExperMode()
}
const deleteExper = (index) => {
  if (index > -1) {
    experiencesList.value.splice(index, 1)
  }
  hideEditExperMode()
}
</script>

<style lang="scss" scoped></style>
