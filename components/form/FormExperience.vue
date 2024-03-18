<template>
  <Form
    @submit="$emit('submit')"
    v-slot="{ meta, values, errors }"
    :validation-schema="schemaExperience"
  >
    <div
      class="grid items-start grid-cols-1 px-6 py-4 mt-1 rounded-md gap-x-3 gap-y-4 sm:grid-cols-4 bg-blue-50"
    >
      <BaseTitleForm class="text-center col-span-full">
        {{ editmode ? 'Edit Experiences' : 'Add Experiences' }}
      </BaseTitleForm>
      <BaseInputField
        class="sm:col-span-4"
        label="Title"
        id="experienceName"
        v-model="experience.experienceName"
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
        id="compName"
        v-model="experience.compName"
        required
      ></BaseInputField>
      <Field
        v-slot="{ field, errors }"
        name="startedYear"
        class="sm:col-span-2 lg:col-span-1"
      >
        <BaseYearPicker
          label="Start year"
          id="startedYear"
          required
          v-model="experience.startedYear"
          v-bind="field"
          placeholder="Select start year"
          :year-range="[
            new Date().getFullYear() - 50,
            new Date().getFullYear()
          ]"
        >
          <template v-slot:error-message v-if="errors"
            >{{ errors[0] }}
          </template>
        </BaseYearPicker>
      </Field>
      <Field v-slot="{ field, errors }" name="endedYear" class="sm:col-span-1">
        <BaseYearPicker
          label="End year"
          id="endedYear"
          required
          v-model="experience.endedYear"
          v-bind="field"
          placeholder="Select end year"
          :disable="!experience.startedYear"
          :year-range="[
            experience.startedYear
              ? experience.startedYear
              : new Date().getFullYear() - 50,
            new Date().getFullYear()
          ]"
        >
          <template v-slot:error-message v-if="errors"
            >{{ errors[0] }}
          </template>
        </BaseYearPicker>
      </Field>
      <BaseTextarea
        label="Description"
        id="experienceDesc"
        nametag="experienceDesc"
        required
        :rows="10"
        v-model="experience.experienceDesc"
      ></BaseTextarea>
      <div class="flex flex-row-reverse gap-3 sm:col-span-full">
        <BaseButton :leadingIcon="CheckIcon" type="submit">
          {{ editmode ? 'Save' : 'Add' }}
        </BaseButton>
        <BaseButton negative @click="$emit('cancel')" type="button">
          Cancel
        </BaseButton>
      </div>
    </div>
  </Form>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'
import { Field, ErrorMessage, Form } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps({
  experience: {
    type: Object,
    required: true
  },
  editmode: {
    type: Boolean,
    default: false
  }
})
defineEmits(['submit', 'cancel'])

const schemaExperience = yup.object({
  experienceName: yup.string().required().max(100),
  experienceDesc: yup.string().required().max(1500),
  position: yup.string().required().max(100),
  startedYear: yup.number().required("Please 'select' the working year"),
  endedYear: yup.number().required("Please 'select' the working year"),
  compName: yup.string().required().max(200)
})
</script>

<style lang="scss" scoped>
.searchselect-blue {
  --ms-option-bg-selected: #2563eb;
  --ms-option-bg-selected-pointed: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
  --ms-spinner-color: #60a5fa;
}
</style>
