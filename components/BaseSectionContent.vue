<template>
  <!--  -->
  <div class="bg-white rounded-lg shadow" :class="[styleSectionContent]">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  hPadding: {
    type: Number
  },
  vPadding: {
    type: Number
  }
})

const styleSectionContent = computed(() => {
  let padding = ''
  if (props.hPadding) {
    padding = 'px-' + props.hPadding
  } else {
    padding = 'px-' + 6
  }

  if (props.vPadding) {
    padding = padding + ' py-' + props.vPadding
  } else {
    padding = 'py-' + 6
  }
  return padding
})
</script>
