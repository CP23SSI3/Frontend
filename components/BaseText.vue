<template>
  <div class="border-gray-100 sm:col-span-1 sm:px-0 max-w-auto">
    <dt class="text-sm font-bold leading-5 text-gray-900">
      {{ label }}
    </dt>
    <dd class="mt-0.5 text-xs sm:text-sm font-normal text-gray-500">
      <slot></slot>
    </dd>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: ''
  }
})
</script>
