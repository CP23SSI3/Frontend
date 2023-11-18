<template>
  <div class="border-gray-100 sm:col-span-1 sm:px-0">
    <dt class="text-sm font-medium leading-5 text-gray-500">{{ label }}</dt>
    <dd class="mt-0.5 text-sm font-normal text-gray-900">
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
