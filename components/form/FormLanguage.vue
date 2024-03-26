<template>
  <Form
    @submit="$emit('submit')"
    v-slot="{ meta, values, errors }"
    :validation-schema="schemaLang"
    :initial-values="initialValues"
  >
    <div
      class="grid items-start grid-cols-1 px-6 py-4 mt-1 rounded-md gap-x-3 gap-y-4 sm:grid-cols-4 bg-blue-50"
    >
      <BaseTitleForm class="text-center col-span-full">
        {{ editmode ? 'Edit Language' : 'Add Language' }}
      </BaseTitleForm>
      <BaseInputField
        class="sm:col-span-4"
        label="Language Name"
        id="languageName"
        v-model="lang.languageName"
        required
      ></BaseInputField>
      <div class="flex flex-row-reverse gap-3 sm:col-span-full">
        <BaseButton
          :leadingIcon="CheckIcon"
          type="submit"
          :disabled="!meta.dirty || !meta.valid"
        >
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
  lang: {
    type: Object,
    required: true
  },
  editmode: {
    type: Boolean,
    default: false
  }
})
const initialValues = { ...props.lang }
defineEmits(['submit', 'cancel'])

const schemaLang = yup.object({
  languageName: yup.string().required().max(50)
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
