<template>
  <BaseSectionContent class="sm:w-4xl md:w-5xl">
    <div>
      <div class="flex items-center justify-between px-4 py-5 sm:px-10">
        <BaseTitleForm>{{ topic }}</BaseTitleForm>
      </div>
      <BaseLine />
      <div class="flex flex-col gap-2 px-4 pt-4 pb-8 sm:px-10">
        <slot></slot>
      </div>
    </div>
  </BaseSectionContent>
</template>

<script setup>
const props = defineProps({
  topic: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
