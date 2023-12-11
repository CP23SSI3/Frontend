<template>
  <div class="relative">
    <div class="absolute inset-0 flex items-center" aria-hidden="true">
      <div class="w-full border-t border-gray-300" />
    </div>
    <div class="relative flex justify-start">
      <span
        class="pr-3 text-base font-semibold leading-6 text-gray-900 bg-white"
        ><slot></slot
      ></span>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
