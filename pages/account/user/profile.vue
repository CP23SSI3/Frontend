<template>
  <FormUserProfile :myUser="myUser" />
</template>

<script setup>
import FormUserProfile from '~/components/form/FormUserProfile.vue'

const props = defineProps({
  myUser: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
