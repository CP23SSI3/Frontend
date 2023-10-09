<template>
  <!-- <button
    v-bind="$attrs"
    :disabled="disabled"
    class="rounded-md px-6 py-2.5 text-sm shadow-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="[styleButton, { 'w-full': full }]"
  >
    <component :is="icon" class="w-6 h-6 shrink-0" aria-hidden="true" />
    <slot></slot>
  </button> -->

  <button
    v-bind="$attrs"
    :disabled="disabled"
    class="px-3 py-2 text-sm font-semibold rounded-md shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    :class="[
      styleButton,
      { 'w-full': full },
      leadingIcon || trailingIcon ? 'inline-flex items-center gap-x-1.5' : ''
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
  disabled: {
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
  if (props.disabled) {
    return 'text-white bg-gray-300 hover:bg-gray-300'
  } else if (props.secondary) {
    return 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-300 hover:bg-blue-100'
  } else if (props.outline) {
    return 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100'
  } else if (props.negative) {
    return 'bg-red-50 hover:bg-red-100 text-red-700 ring-1 ring-inset ring-red-300'
  } else {
    return 'text-white bg-blue-600 hover:bg-blue-500  focus-visible:outline-blue-600'
  }
})
</script>

<style lang="scss" scoped></style>
