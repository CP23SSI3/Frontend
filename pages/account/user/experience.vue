<template>
  <div class="space-y-6">
    <BaseSectionCard topic="Experiences">
      <!-- List All Experience -->
      <div
        v-for="(experience, index) in experiencesList"
        v-if="experiencesList"
      >
        <div
          :class="
            !statusEditExper
              ? 'flex'
              : editingExper?.id != index
              ? 'flex'
              : 'hidden'
          "
          class="flex flex-col items-start justify-between gap-2 px-5 py-4 bg-white border-0 rounded-md lg:gap-8 lg:items-center ring-inset ring-1 ring-gray-200 lg:flex-row"
        >
          <div
            class="rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200 min-w-max lg:w-64 lg:text-center"
          >
            {{ experience.position }}
          </div>

          <BaseText
            :label="experience.experienceName"
            class="w-full lg:max-w-lg"
          >
            {{ experience.experienceDesc }}
          </BaseText>
          <div class="w-full text-end">
            <div class="flex items-center justify-end gap-6">
              <BaseItem :icon="BriefcaseIcon" class="min-w-max">
                {{
                  experience.startedYear == experience.endedYear
                    ? experience.endedYear
                    : experience.startedYear + ' - ' + experience.endedYear
                }}
              </BaseItem>
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
                          @click="editExper(experience, index)"
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
                          @click="removeExper(experience, index)"
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
          v-if="statusEditExper && editingExper?.id == index"
          :experience="editingExper"
          @submit="saveExper()"
          @cancel="hideEditExperMode()"
          editmode
        />
      </div>

      <!-- Button add new exper. -->
      <BaseLineTopic center v-if="!statusAddExper && !statusEditExper">
        <BaseButton
          class="mt-1"
          type="button"
          :leadingIcon="PlusIcon"
          full
          secondary
          @click="showAddExperMode()"
          :disabled="statusEditExper"
          >Add Experience
        </BaseButton>
      </BaseLineTopic>

      <!-- Sub-Form Add Experience -->
      <FormExperience
        v-else-if="statusAddExper"
        :experience="experience"
        @submit="addNewExper()"
        @cancel="hideAddExperMode()"
      />
    </BaseSectionCard>
    <BaseSectionCard topic="Skill">
      <!-- List All Skill -->
      <div v-for="(skill, index) in skillsList" v-if="skillsList">
        <div
          :class="
            !statusEditSkill
              ? 'flex'
              : editingSkill?.id != index
              ? 'flex'
              : 'hidden'
          "
          class="flex flex-col items-start justify-between gap-2 px-5 py-4 bg-white border-0 rounded-md lg:gap-8 lg:items-center ring-inset ring-1 ring-gray-200 lg:flex-row"
        >
          <BaseText :label="skill.skillName" class="w-full lg:max-w-lg">
            {{ skill.skillDesc }}
          </BaseText>
          <div class="w-full text-end">
            <div class="flex items-center justify-end gap-2">
              <BaseItem
                class="block px-4 py-2 text-sm text-gray-900 cursor-pointer hover:underline"
                :icon="PencilIcon"
                @click="editSkill(skill, index)"
                >Edit</BaseItem
              >
              <BaseItem
                class="block px-4 py-2 text-sm text-gray-900 cursor-pointer hover:underline"
                :icon="TrashIconSolid"
                @click="removeSkill(skill, index)"
                >Delete</BaseItem
              >
            </div>
          </div>
        </div>

        <!-- Sub-Form Edit Skill -->
        <FormSkill
          v-if="statusEditSkill && editingSkill?.id == index"
          :skill="editingSkill"
          @submit="saveSkill()"
          @cancel="hideEditSkillMode()"
          editmode
        />
      </div>

      <!-- Button add new skill -->
      <BaseLineTopic center v-if="!statusAddSkill && !statusEditSkill">
        <BaseButton
          class="mt-1"
          type="button"
          :leadingIcon="PlusIcon"
          full
          secondary
          @click="showAddSkillMode()"
          :disabled="statusEditSkill"
          >Add Skill
        </BaseButton>
      </BaseLineTopic>

      <!-- Sub-Form Add Skill -->
      <FormSkill
        v-else-if="statusAddSkill"
        :skill="skill"
        @submit="addNewSkill()"
        @cancel="hideAddSkillMode()"
      />
    </BaseSectionCard>

    <BaseSectionCard topic="Languages">
      <!-- List All Languages -->
      <div v-for="(lang, index) in languagesList" v-if="languagesList">
        <div
          :class="
            !statusEditLanguage
              ? 'flex'
              : editingLanguage?.id != index
              ? 'flex'
              : 'hidden'
          "
          class="flex items-start justify-between gap-2 px-5 py-4 bg-white border-0 rounded-md lg:gap-8 lg:items-center ring-inset ring-1 ring-gray-200"
        >
          <BaseText :label="lang.languageName" class="w-full lg:max-w-lg">
          </BaseText>
          <div class="w-full text-end">
            <div class="flex items-center justify-end gap-2">
              <BaseItem
                class="block px-4 py-2 text-sm text-gray-900 cursor-pointer hover:underline"
                :icon="PencilIcon"
                @click="editLanguage(lang, index)"
                >Edit</BaseItem
              >
              <BaseItem
                class="block px-4 py-2 text-sm text-gray-900 cursor-pointer hover:underline"
                :icon="TrashIconSolid"
                @click="removeLanguage(lang, index)"
                >Delete</BaseItem
              >
            </div>
          </div>
        </div>

        <!-- Sub-Form Edit Lang -->
        <FormLanguage
          v-if="statusEditLanguage && editingLanguage?.id == index"
          :lang="editingLanguage"
          @submit="saveLanguage()"
          @cancel="hideEditLanguageMode()"
          editmode
        />
      </div>

      <!-- Button add new lang -->
      <BaseLineTopic center v-if="!statusAddLanguage && !statusEditLanguage">
        <BaseButton
          class="mt-1"
          type="button"
          :leadingIcon="PlusIcon"
          full
          secondary
          @click="showAddLanguageMode()"
          :disabled="statusEditLanguage"
          >Add Language
        </BaseButton>
      </BaseLineTopic>

      <!-- Sub-Form Add Language -->
      <FormLanguage
        v-else-if="statusAddLanguage"
        :lang="language"
        @submit="addNewLanguage()"
        @cancel="hideAddLanguageMode()"
      />
    </BaseSectionCard>
  </div>
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

import { TrashIcon, BriefcaseIcon } from '@heroicons/vue/24/outline'
import { Field, ErrorMessage, Form } from 'vee-validate'
import yup from '@/assets/yup-error.js'
import moment from 'moment'
import Swal from 'sweetalert2'
import FormSkill from '~/components/form/FormSkill.vue'

const props = defineProps({
  myUser: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['getUser'])

// ---- Part: Experience ----
const experiencesList = ref([])
experiencesList.value = props.myUser.experiences
const statusAddExper = ref(false)
const experience = ref({
  experienceName: '',
  experienceDesc: '',
  position: '',
  startedYear: null,
  endedYear: null,
  compName: ''
})

const resetExperience = () => {
  experience.value = {
    experienceName: '',
    experienceDesc: '',
    position: '',
    startedYear: null,
    endedYear: null,
    compName: ''
  }
}
const showAddExperMode = () => (statusAddExper.value = true)
const hideAddExperMode = () => {
  statusAddExper.value = false
  resetExperience()
}
const addNewExper = async () => {
  await addExperience()
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
const saveExper = async () => {
  await updateExperience()
}
const removeExper = (experience, index) => {
  Swal.fire({
    title: 'Do you want to delete this experience?',
    icon: 'warning',
    confirmButtonText: 'Comfirm',
    confirmButtonColor: 'red',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: 'gray',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteExperience(experience.experienceId, index)
    }
  })
}

const addExperience = async () => {
  let newExperience = {
    ...experience.value,
    user: { userId: props.myUser.userId }
  }
  try {
    const res = await useCreateExperience(newExperience)

    if (res.value) {
      let exper = res.value.data
      console.log('Add New Experience Success')
      experiencesList.value.push({
        id: experiencesList.value.length,
        compName: exper.compName,
        endedYear: exper.endedYear,
        experienceId: exper.experienceId,
        experienceName: exper.experienceName,
        experienceDesc: exper.experienceDesc,
        position: exper.position,
        startedYear: exper.startedYear
      })
      hideAddExperMode()
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: "Can't add new experience"
    })
  }
}

const updateExperience = async () => {
  try {
    const {
      id,
      compName,
      endedYear,
      experienceId,
      experienceName,
      experienceDesc,
      position,
      startedYear
    } = editingExper.value
    const res = await useUpdateExperience(experienceId, {
      compName: compName,
      endedYear: endedYear,
      experienceName: experienceName,
      experienceDesc: experienceDesc,
      position: position,
      startedYear: startedYear
    })
    if (res.value) {
      console.log('Edit Experience Success')
      experiencesList.value[id] = res.value.data
      hideEditExperMode()
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: "Can't edit this experience"
    })
  }
}

const deleteExperience = async (experienceId, index) => {
  try {
    const res = await useDeleteExperience(experienceId)
    if (res.value.status == 200) {
      console.log('Delete Experience Success')
      if (index > -1) {
        experiencesList.value.splice(index, 1)
      }
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: "Can't delete this experience"
    })
  }
}

// ---- Part: Skill ----
const skillsList = ref([])
skillsList.value = props.myUser.skills

const statusAddSkill = ref(false)
const skill = ref({
  skillName: '',
  skillDesc: ''
})

const resetSkill = () => {
  skill.value = {
    skillName: '',
    skillDesc: ''
  }
}
const showAddSkillMode = () => (statusAddSkill.value = true)
const hideAddSkillMode = () => {
  statusAddSkill.value = false
  resetSkill()
}
const addNewSkill = async () => {
  await addSkill()
}
const editingSkill = ref(null)
const statusEditSkill = ref(false)
const showEditSkillMode = () => (statusEditSkill.value = true)
const hideEditSkillMode = () => {
  statusEditSkill.value = false
  editingSkill.value = null
}
const editSkill = (editSkill, index) => {
  if (!statusAddSkill.value && editingSkill.value == null) {
    editingSkill.value = { ...editSkill, id: index }
    showEditSkillMode()
  }
}
const saveSkill = async () => {
  await updateSkill()
}

const removeSkill = (skill, index) => {
  Swal.fire({
    title: 'Do you want to delete this skill?',
    icon: 'warning',
    confirmButtonText: 'Comfirm',
    confirmButtonColor: 'red',
    showCancelButton: true,
    cancelButtonText: 'Cancel',
    cancelButtonColor: 'gray',
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      await deleteSkill(skill.skillId, index)
    }
  })
}

const addSkill = async () => {
  let newSkill = { ...skill.value, user: { userId: props.myUser.userId } }
  try {
    const res = await useCreateSkill(newSkill)

    if (res.value) {
      console.log('Add New Skill Success')
      skillsList.value.push({
        id: skillsList.value.length,
        skillId: res.value.data.skillId,
        skillName: res.value.data.skillName,
        skillDesc: res.value.data.skillDesc
      })
      hideAddSkillMode()
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: "Can't add new skill"
    })
  }
}

const updateSkill = async () => {
  try {
    const { id, skillId, skillName, skillDesc } = editingSkill.value
    const res = await useUpdateSkill(skillId, {
      skillName,
      skillDesc
    })
    if (res.value) {
      console.log('Edit Skill Success')
      skillsList.value[id] = editingSkill.value
      hideEditSkillMode()
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: "Can't edit this skill"
    })
  }
}

const deleteSkill = async (skillId, index) => {
  try {
    const res = await useDeleteSkill(skillId)
    if (res.value.status == 200) {
      console.log('Delete Skill Success')
      if (index > -1) {
        skillsList.value.splice(index, 1)
      }
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: "Can't delete this langague"
    })
  }
}

// ---- Part: Languages ----
const languagesList = ref([])
languagesList.value = props.myUser.languages
const statusAddLanguage = ref(false)
const language = ref({
  languageName: ''
})

const resetLanguage = () => {
  language.value = {
    languageName: ''
  }
}
const showAddLanguageMode = () => (statusAddLanguage.value = true)
const hideAddLanguageMode = () => {
  statusAddLanguage.value = false
  resetLanguage()
}
const addNewLanguage = async () => {
  await addLanguage()
}

const editingLanguage = ref(null)
const statusEditLanguage = ref(false)
const showEditLanguageMode = () => (statusEditLanguage.value = true)
const hideEditLanguageMode = () => {
  statusEditLanguage.value = false
  editingLanguage.value = null
}
const editLanguage = (editLanguage, index) => {
  if (!statusAddLanguage.value && editingLanguage.value == null) {
    editingLanguage.value = { ...editLanguage, id: index }

    showEditLanguageMode()
  }
}
const saveLanguage = async () => {
  await updateLanguage()
}

const removeLanguage = async (lang, index) => {
  await deleteLanguage(lang.languageId, index)
}

const addLanguage = async () => {
  let newLang = { ...language.value, user: { userId: props.myUser.userId } }
  try {
    const res = await useCreateLang(newLang)

    if (res.value) {
      console.log('Add New Language Success')
      languagesList.value.push({
        id: languagesList.value.length,
        ...language.value,
        languageId: res.value.data.languageId
      })
      hideAddLanguageMode()
    }
  } catch (error) {
    console.log(error.message)
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: "Can't add new langague",
      text: error.message ? error.message : ''
    })
  }
}

const updateLanguage = async () => {
  try {
    const res = await useUpdateLang(editingLanguage.value.languageId, {
      languageName: editingLanguage.value.languageName
    })
    if (res.value) {
      console.log('Edit Language Success')
      const { id } = editingLanguage.value
      languagesList.value[id] = editingLanguage.value
      hideEditLanguageMode()
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: "Can't edit this langague",
      text: error.message ? error.message : ''
    })
  }
}

const deleteLanguage = async (langId, index) => {
  try {
    const res = await useDeleteLang(langId)
    if (res.value.status == 200) {
      console.log('Delete Language Success')
      if (index > -1) {
        languagesList.value.splice(index, 1)
      }
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: "Can't delete this langague"
    })
  }
}
</script>

<style lang="scss" scoped></style>
