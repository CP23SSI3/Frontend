<template>
  <div class="">
    <!-- Label -->
    <BaseLabel :id="id" :icon="icon" :required="required">
      {{ label }}
    </BaseLabel>

    <div class="relative mt-1">
      <!-- Icon Leading in Input -->
      <div
        v-if="iconInput"
        class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
      >
        <component
          :is="iconInput"
          class="w-5 h-5 text-gray-400"
          aria-hidden="true"
        />
      </div>

      <!-- Input -->
      <Field
        :id="id"
        :name="id"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:bg-gray-100 disabled:boder-gray-200 disabled:text-gray-500"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        :class="styleInputPadding"
        :type="type"
        :value="modelValue"
        v-bind="$attrs"
        aria-describedby="price-currency"
      />

      <!-- Unit in Input  -->
      <div
        v-if="unit"
        class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
      >
        <span class="text-gray-500 sm:text-sm" id="price-currency">
          {{ unit }}
        </span>
      </div>
    </div>
    <!-- Error Message -->
    <div class="pl-2 text-xs text-red-500"><ErrorMessage :name="id" /></div>

    <!-- slot -->
    <div class="pl-2 text-xs"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage } from 'vee-validate'
import { string } from 'yup'
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Function
  },
  iconInput: {
    type: Function
  },
  type: {
    type: String,
    default: 'text'
  },
  modelValue: {
    type: null,
    required: true
  },
  unit: {
    type: String,
    default: null
  }

  // icon: {
  //   type: Object,
  //   default: null,
  // },
  // imgIcon: {
  //   type: String,
  //   default: null,
  // },
  // placeholder: {
  //   type: String,
  //   default: '',
  // },
  // type: {
  //   type: String,
  //   default: 'text',
  // },
  // disabled: {
  //   type: Boolean,
  //   default: false,
  // },
})
defineEmits(['update:modelValue'])

// const styleInput = computed(() => {
//   if (props.disabled) {
//     return 'bg-gray-100 !boder-gray-200 !text-gray-400'
//   }
// })

const styleInputPadding = computed(() => {
  if (props.iconInput) {
    return 'pl-10'
  } else if (props.unit) {
    return 'pr-16'
    // } else if (props.imgIcon != null) {
    //   //ถ้าเป็น duo-coin
    //   return 'pl-16'
  } else {
    return ''
  }
  // else if (props.imgIcon != null) {
  //   return 'pl-14'
  // }
})
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
