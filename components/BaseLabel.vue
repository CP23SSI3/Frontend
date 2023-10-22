<template>
  <!-- Label -->
  <label :for="id" class="block text-sm font-medium leading-6 text-gray-900">
    <div class="flex items-center gap-1">
      <component
        :is="icon"
        class="flex-shrink-0 w-5 h-5 text-gray-400"
        aria-hidden="true"
      />
      <slot></slot>
      <span v-show="required" class="text-sm text-red-500">*</span>
    </div>
  </label>
</template>

<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Function
  }
})
</script>

<style lang="scss" scoped></style>
