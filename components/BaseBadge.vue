<template>
  <span
    class="inline-flex items-center gap-x-1.5 rounded-full px-[6px] py-[2px] sm:px-1.5 sm:py-0.5 text-[10px] sm:text-xs font-medium min-w-fit"
    :class="[styleColor]"
  >
    <svg
      class="h-1 w-1 sm:h-1.5 sm:w-1.5"
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
  } else if (props.color === 'blue') {
    return 'bg-blue-100 text-blue-600'
  } else if (props.color === 'pink') {
    return 'bg-pink-100 text-pink-600'
  } else if (props.color === 'purple') {
    return 'bg-purple-100 text-purple-600'
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
  } else if (props.color === 'blue') {
    return 'fill-blue-500'
  } else if (props.color === 'pink') {
    return 'fill-pink-500'
  } else if (props.color === 'purple') {
    return 'fill-purple-500'
  } else {
    return 'fill-gray-400'
  }
})
</script>
