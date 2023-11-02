<template>
  <div>{{ route.params.postId }}</div>
  <NuxtLink
    :to="{
      path: `/internship`
      // --- เอาไว้ย้อนกลับหน้า page เดิม ---
      // query: { page: route.query.page }
    }"
  >
    <BaseItem :icon="ChevronLeftIcon" class="cursor-pointer">back</BaseItem>
  </NuxtLink>
</template>

<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
const route = useRoute()
</script>

<style lang="scss" scoped></style>
