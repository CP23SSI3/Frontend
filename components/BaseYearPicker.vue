<template>
  <div>
    <!-- Label -->
    <BaseLabel :id="id" :required="required">
      {{ label }}
    </BaseLabel>

    <div class="mt-1">
      <VueDatePicker
        :id="id"
        :name="id"
        v-model="date"
        v-bind="$attrs"
        @update:modelValue="$emit('update:modelValue', $event)"
        class="shadow-sm custom-button-height"
        year-picker
      />
      <!-- Error Message -->
      <div class="pl-2 text-xs text-red-500">
        <slot name="error-message"></slot>
      </div>

      <!-- Error Message -->
      <div class="pl-2 text-xs text-gray-500">
        <slot name="sub-description"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: Number
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])

const date = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    return value
  }
})
</script>

<style scoped>
.custom-button-height {
  --dp-action-button-height: auto;
  --dp-action-buttons-padding: 6px;
  --dp-font-size: 0.95rem;
}
</style>
