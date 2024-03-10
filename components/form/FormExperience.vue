<template>
  <Form
    @submit="$emit('submit')"
    v-slot="{ meta, values, errors }"
    :validation-schema="schema"
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
      <Field v-slot="{ field, errors }" name="startedYear">
        <BaseYearPicker
          class="sm:col-span-1"
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
      <Field v-slot="{ field, errors }" name="endedYear">
        <BaseYearPicker
          class="sm:col-span-1"
          label="End year"
          id="endedYear"
          required
          v-model="experience.endedYear"
          v-bind="field"
          placeholder="Select end year"
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
        nametag="description"
        required
        :rows="10"
        v-model="experience.description"
      ></BaseTextarea>
      <div class="flex flex-row-reverse gap-3 sm:col-span-full">
        <BaseButton :leadingIcon="CheckIcon" type="submit">
          {{ editmode ? 'Save' : 'Add' }}
        </BaseButton>
        <BaseButton negative @click="$emit('cancel', experience)" type="button">
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
  },
  statusButton: {
    type: Boolean,
    default: false
  }
})
defineEmits(['submit', 'cancel'])
console.log(props.experience)

const submitForm = () => {
  console.log('Test Formexperience')
}

const schema = yup.object({
  title: yup.string().required().max(100),
  experienceDesc: yup.string().required().max(1500),
  position: yup.string().required().max(100),
  startedYear: yup.number().required("Please 'select' the working year"),
  endedYear: yup.number().required("Please 'select' the working year"),
  workplace: yup.string().required().max(200)
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
