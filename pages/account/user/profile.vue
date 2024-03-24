<template>
  <FormUserProfile :myUser="myUser" @getUser="$emit('getUser')" />
</template>

<script setup>
import FormUserProfile from '~/components/form/FormUserProfile.vue'

const props = defineProps({
  myUser: {
    type: Object,
    required: true
  }
})
defineEmits(['getUser'])
</script>

<style lang="scss" scoped></style>
