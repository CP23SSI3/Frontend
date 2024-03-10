<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300" />
    </div>
    <div
      :class="['relative flex', center ? 'justify-center' : 'justify-start']"
    >
      <span
        :class="[
          'text-base font-semibold leading-6 text-gray-900 bg-white',
          center ? 'px-3' : 'pr-3'
        ]"
        ><slot></slot
      ></span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  center: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped></style>
