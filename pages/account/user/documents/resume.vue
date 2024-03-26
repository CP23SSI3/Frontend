<template>
  <!-- <a :href="`/account/template/${myUser.userId}`" target="_blank"> -->
  <div class="flex items-center justify-between mx-auto">
    <NuxtLink
      :to="{ path: `/account/template/${myUser.userId}` }"
      target="_blank"
      class="flex items-center justify-center w-40 mx-auto bg-white rounded-md h-60 hover:shadow-md"
    >
      Template 1
    </NuxtLink>
  </div>
  <!-- <button @click="print()">Print</button>/ -->
</template>

<script setup>
const props = defineProps({
  myUser: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
