<template>
  <button
    v-bind="$attrs"
    class="px-3 py-2 text-sm font-medium rounded-md shadow-sm ring-1 ring-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:text-white disabled:ring-0 disabled:bg-gray-300"
    :class="[
      styleButton,
      { 'w-full': full },
      leadingIcon || trailingIcon
        ? 'inline-flex items-center justify-center gap-x-1.5'
        : ''
    ]"
  >
    <component :is="leadingIcon" class="-ml-0.5 h-5 w-5" aria-hidden="true" />
    <slot></slot>
    <component :is="trailingIcon" class="-mr-0.5 h-5 w-5" aria-hidden="true" />
  </button>
</template>

<script setup>
const props = defineProps({
  full: {
    type: Boolean,
    default: false
  },
  secondary: {
    type: Boolean,
    default: false
  },
  outline: {
    type: Boolean,
    default: false
  },
  negative: {
    type: Boolean,
    default: false
  },
  leadingIcon: {
    type: Function
  },
  trailingIcon: {
    type: Function
  }
})
const styleButton = computed(() => {
  if (props.secondary) {
    return 'bg-blue-50 hover:bg-blue-100 text-blue-700 ring-blue-300 '
  } else if (props.outline) {
    return 'bg-white hover:bg-gray-50 text-gray-700 ring-gray-300 '
  } else if (props.negative) {
    return 'bg-red-50 hover:bg-red-100 text-red-700 ring-red-300'
  } else {
    return 'text-white bg-blue-600 hover:bg-blue-500 focus-visible:outline-blue-600'
  }
})
</script>

<style lang="scss" scoped></style>
