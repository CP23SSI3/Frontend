<template>
  <div class="flex flex-col xl:flex-row xl:space-x-6">
    <BaseItem :icon="BriefcaseIcon">Fulltime</BaseItem>
    <BaseItem :icon="BriefcaseIcon">Fulltime</BaseItem>
    <BaseItem :icon="BriefcaseIcon">Fulltime</BaseItem>
  </div>
</template>

<script setup>
import { BriefcaseIcon } from '@heroicons/vue/20/solid'
</script>

<style lang="scss" scoped></style>
