<template>
  <div>My profile</div>
  {{ user }}
</template>

<script setup>
const userId = '9c2e4bd8-a897-4bce-9a63-5267283d6e30'
const user = await getUserById(userId)
</script>

<style lang="scss" scoped></style>
