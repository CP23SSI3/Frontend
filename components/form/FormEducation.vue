<template>
  <Form
    @submit="$emit('submit')"
    v-slot="{ meta, values, errors }"
    :validation-schema="schemaEducation"
    :initial-values="initialValues"
  >
    <div
      class="grid items-start grid-cols-1 px-6 py-4 mt-1 rounded-md gap-x-3 gap-y-4 sm:grid-cols-4 bg-blue-50"
    >
      <BaseTitleForm class="text-center col-span-full">
        {{ editmode ? 'Edit Education' : 'Add Education' }}
      </BaseTitleForm>
      <BaseInputField
        class="sm:col-span-4"
        label="Degree"
        id="degree"
        v-model="education.degree"
        required
      ></BaseInputField>

      <BaseInputField
        class="sm:col-span-2"
        label="Field"
        id="field"
        v-model="education.field"
      ></BaseInputField>
      <BaseInputField
        class="sm:col-span-2"
        label="School Name"
        id="schoolName"
        v-model="education.schoolName"
        required
      ></BaseInputField>
      <Field v-slot="{ field, errors }" name="startedYear">
        <BaseYearPicker
          label="Start year"
          id="startedYear"
          class="col-span-full sm:col-span-2 md:col-span-1"
          required
          v-model="education.startedYear"
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
      <Field v-slot="{ field, errors }" name="graduatedYear">
        <BaseYearPicker
          label="Graduated Year"
          class="col-span-full sm:col-span-2 md:col-span-1"
          id="graduatedYear"
          v-model="education.graduatedYear"
          v-bind="field"
          placeholder="Select graduated year"
          :disable="!education.startedYear"
          :year-range="[
            education.startedYear
              ? education.startedYear
              : new Date().getFullYear() - 50,
            new Date().getFullYear()
          ]"
        >
          <template v-if="errors" v-slot:error-message>
            {{ errors[0] }}
          </template>
          <template v-slot:sub-description v-else>
            Leave year blank for 'Present'.
          </template>
        </BaseYearPicker>
      </Field>
      <BaseInputField
        class="col-span-full sm:col-span-2 md:col-span-1"
        label="Grade"
        id="grade"
        v-model="education.grade"
      ></BaseInputField>
      <BaseTextarea
        label="Description"
        id="educationDesc"
        nametag="description"
        :rows="10"
        v-model="education.educationDesc"
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
  education: {
    type: Object,
    required: true
  },
  editmode: {
    type: Boolean,
    default: false
  }
})
const initialValues = { ...props.education }
defineEmits(['submit', 'cancel'])

const schemaEducation = yup.object({
  degree: yup.string().required().max(50),
  educationDesc: yup.string().max(1500),
  field: yup.string().nullable().max(100),
  grade: yup.string().nullable().max(5),
  startedYear: yup.number().required("Please 'select' the working year"),
  graduatedYear: yup.number().nullable(),
  schoolName: yup.string().required().max(100)
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
