<template>
  <NuxtPage :post="post?.data"></NuxtPage>
</template>

<script setup>
const route = useRoute()
const postId = route.params.postId
const post = await getPostById(postId)
console.log(post)
</script>

<style lang="scss" scoped></style>
