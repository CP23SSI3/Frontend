<template>
  <div
    class="grid items-start grid-cols-1 px-6 py-4 mt-1 rounded-md gap-x-3 gap-y-4 sm:grid-cols-4 bg-blue-50"
  >
    <BaseTitleForm class="text-center col-span-full">
      {{ editmode ? 'Edit Experiences' : 'Add Experiences' }}
    </BaseTitleForm>
    <BaseInputField
      class="sm:col-span-3"
      label="Title"
      id="title"
      v-model="experience.title"
      required
    ></BaseInputField>

    <BaseInputField
      class="sm:col-span-2"
      label="Position"
      id="position"
      v-model="experience.position"
      required
    ></BaseInputField>
    <BaseInputField
      class="sm:col-span-2"
      label="Workplace"
      id="workplace"
      v-model="experience.workplace"
      required
    ></BaseInputField>
    <BaseYearPicker
      class="sm:col-span-1"
      label="Start year"
      id="startedYear"
      v-model="experience.startedYear"
      placeholder="Select start year"
      :year-range="[new Date().getFullYear() - 50, new Date().getFullYear()]"
    >
    </BaseYearPicker>
    <BaseYearPicker
      class="sm:col-span-1"
      label="End year"
      id="endedYear"
      v-model="experience.endedYear"
      placeholder="Select end year"
      :year-range="[
        experience.startedYear
          ? experience.startedYear
          : new Date().getFullYear() - 50,
        new Date().getFullYear()
      ]"
    >
    </BaseYearPicker>

    <!-- <Field v-slot="{ field, errors }" name="userDesc"> -->
    <div class="col-span-full">
      <BaseLabel id="description">Description</BaseLabel>
      <div class="mt-1 sm:col-span-full">
        <textarea
          id="description"
          name="description"
          rows="4"
          v-model="experience.description"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        />
      </div>
      <!-- <p class="text-sm leading-6 text-gray-600" v-if="!errors[0]">
              Write a few sentences about yourself.
            </p>
            <span class="pl-2 text-xs text-red-500" v-else>{{
              errors[0]
            }}</span> -->
    </div>
    <!-- </Field> -->
    <div class="flex flex-row-reverse gap-3 sm:col-span-full">
      <BaseButton :leadingIcon="CheckIcon" @click="$emit('submit')">
        {{ editmode ? 'Save' : 'Add' }}
      </BaseButton>
      <BaseButton negative @click="$emit('cancel', experience)">
        ยกเลิก</BaseButton
      >
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'
const props = defineProps({
  experience: {
    type: Object,
    required: true
  },
  editmode: {
    type: Boolean,
    default: false
  },
  statusButton: {
    type: Boolean,
    default: false
  }
})
defineEmits(['submit', 'cancel'])
</script>

<style lang="scss" scoped>
.searchselect-blue {
  --ms-option-bg-selected: #2563eb;
  --ms-option-bg-selected-pointed: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
  --ms-spinner-color: #60a5fa;
}
</style>
