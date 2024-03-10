<template>
  <Field v-slot="{ field, errors }" :name="id">
    <div class="col-span-full">
      <BaseLabel v-if="label" :id="name" :required="required" :name="name">{{
        label
      }}</BaseLabel>
      <div class="mt-1 sm:col-span-full">
        <textarea
          :id="name"
          :name="name"
          rows="4"
          :value="value"
          @input="$emit('update:value', $event)"
          v-bind="field"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        ></textarea>
      </div>
      <!-- Error Message -->
      <div class="pl-2 text-xs text-red-500"><ErrorMessage :name="id" /></div>
    </div>
  </Field>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { string } from 'yup'
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  value: {
    type: null
  },
  rows: {
    type: Number,
    default: 4
  }
})
defineEmits(['update:value'])

// const styleInput = computed(() => {
//   if (props.disabled) {
//     return 'bg-gray-100 !boder-gray-200 !text-gray-400'
//   }
// })
</script>

<style scoped></style>
