<template>
  <div>
    Edit
    {{ post }}
  </div>
</template>

<script setup>
const post = ref([])
const props = defineProps({
  post: {
    type: Object
  }
})

post.value = props?.post
</script>

<style lang="scss" scoped></style>
