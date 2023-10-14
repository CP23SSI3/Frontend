<template>
  <span
    class="inline-flex items-center gap-x-1.5 rounded-full px-1.5 py-0.5 text-xs font-medium"
    :class="[styleColor]"
  >
    <svg
      class="h-1.5 w-1.5"
      :class="[styleFillColor]"
      viewBox="0 0 6 6"
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
    <slot></slot>
  </span>
</template>
<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: 'gray'
  }
})

const styleColor = computed(() => {
  if (props.color === 'green') {
    return 'bg-green-100 text-green-700'
  } else if (props.color === 'yellow') {
    return 'bg-yellow-100 text-yellow-600'
  } else if (props.color === 'red') {
    return 'bg-red-100 text-red-600'
  } else {
    return 'bg-gray-100 text-gray-600'
  }
})

const styleFillColor = computed(() => {
  if (props.color === 'green') {
    return 'fill-green-500'
  } else if (props.color === 'yellow') {
    return 'fill-yellow-500'
  } else if (props.color === 'red') {
    return 'fill-red-500'
  } else {
    return 'fill-gray-400'
  }
})
</script>
