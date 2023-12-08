<template>
  <Listbox as="div" @update:modelValue="$emit('update:modelValue', $event)">
    <!-- <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
      >{{ label
      }}<span class="ml-1 text-base text-red-600" v-if="required"
        >*</span
      ></ListboxLabel
    > -->

    <!-- Label -->
    <BaseLabel :id="label" :required="required">
      {{ label }}
    </BaseLabel>

    <div class="relative z-20 mt-1">
      <ListboxButton
        :disabled="disabled"
        :class="
          disabled
            ? 'bg-gray-100 boder-gray-200 text-gray-400 min-h-[36px]'
            : modelValue.id == 0
            ? 'bg-white text-gray-400'
            : 'bg-white text-gray-900'
        "
        class="relative w-full cursor-default rounded-md py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
      >
        <span class="flex items-center">
          <!-- <nuxt-img
            :src="modelValue.img"
            alt=""
            class="flex-shrink-0 w-5 h-5 mr-3 rounded-full"
            v-if="modelValue.img"
          /> -->
          <span class="block truncate">{{ modelValue.text }}</span>
        </span>

        <span
          class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
        >
          <ChevronDownIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 w-full py-1 mt-1 ml-0 overflow-auto text-base bg-white rounded-md shadow-lg max-h-52 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="option in optionLists"
            :key="option.id"
            :value="option"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'bg-blue-600 text-white' : 'text-gray-900',
                'relative  select-none py-2 pl-3 pr-6 cursor-pointer'
              ]"
            >
              <div class="flex items-center">
                <!-- <nuxt-img
                  :src="option.img"
                  alt=""
                  class="flex-shrink-0 w-5 h-5 mr-3 rounded-full"
                  v-if="option.img"
                /> -->
                <span
                  :class="[
                    selected && modelValue.value != '' && option.id != 0
                      ? 'font-semibold'
                      : 'font-normal',
                    'block truncate',
                    option.id == 0 ? 'text-gray-400' : ''
                  ]"
                  >{{ option.text }}</span
                >
              </div>

              <span
                v-if="selected && modelValue.value != '' && option.id != 0"
                :class="[
                  active ? 'text-white' : 'text-blue-600',
                  'absolute inset-y-0 right-0 flex items-center pr-5'
                ]"
              >
                <CheckIcon class="w-5 h-5 -mr-4" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
    <slot></slot>
  </Listbox>
</template>
<script lang="ts" setup>
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from '@headlessui/vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'

defineProps({
  optionLists: {
    type: Array as any,
    default: []
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Object,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue', 'reset'])
</script>
