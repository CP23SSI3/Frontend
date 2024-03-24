<template>
  <div>Resume</div>
  <button @click="print()">Print</button>
</template>

<script setup>
const print = () => {
  window.print()
}
</script>

<style lang="scss" scoped></style>
