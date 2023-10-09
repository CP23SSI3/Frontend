<template>
  <div class="flex flex-col gap-2">
    <div>
      <BaseButton>Default</BaseButton>
    </div>
    <BaseButton full>full</BaseButton>
    <div class="flex gap-2">
      <BaseButton disabled>disabled</BaseButton>
      <BaseButton secondary>secondary</BaseButton>
      <BaseButton outline>outline</BaseButton>
      <BaseButton negative>negative</BaseButton>
      <BaseButton :leadingIcon="EnvelopeIcon">leadingIcon</BaseButton>
      <BaseButton :trailingIcon="UserIcon">trailingIcon</BaseButton>
      <BaseButton :leadingIcon="TrashIcon" negative>Delete</BaseButton>
      <BaseButton :trailingIcon="PencilIcon" secondary>Edit</BaseButton>
    </div>
  </div>
</template>

<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { UserIcon, EnvelopeIcon } from '@heroicons/vue/24/solid'
</script>

<style lang="scss" scoped></style>
