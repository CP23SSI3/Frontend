<template>
  <div>
    <div class="text-sm font-medium text-gray-900 capitalize">
      {{ text }}
    </div>
    <div class="text-sm text-gray-500 lowercase" v-if="desc != ''">
      {{ desc }}
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
})
</script>
