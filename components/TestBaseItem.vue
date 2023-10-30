<template>
  <div class="flex flex-col mt-1 sm:mt-0 sm:flex-row sm:flex-wrap">
    <BaseItem :icon="BriefcaseIcon">Fulltime</BaseItem>
    <BaseItem :icon="BriefcaseIcon">Fulltime</BaseItem>
    <BaseItem :icon="BriefcaseIcon">Fulltime</BaseItem>
    <BaseItem :icon="BriefcaseIcon">Fulltime</BaseItem>
    <BaseItem :icon="BriefcaseIcon">Fulltime</BaseItem>
    <BaseItem :icon="BriefcaseIcon">Fulltime</BaseItem>
  </div>
</template>

<script setup>
import { BriefcaseIcon } from '@heroicons/vue/20/solid'
</script>

<style lang="scss" scoped></style>
