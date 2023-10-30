<template>
  <div class="flex items-center mt-2 text-xs text-gray-500 md:text-sm">
    <component
      :is="icon"
      class="mr-1.5 w-4 h-4 md:h-5 md:w-5 flex-shrink-0 text-gray-400"
    />
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: Function,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
