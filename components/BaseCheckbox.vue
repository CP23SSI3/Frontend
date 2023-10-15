<template>
  <div class="space-y-3">
    <div
      class="relative flex items-start"
      v-for="(item, index) in items"
      :key="index"
    >
      <div class="flex items-center h-6">
        <input
          :id="item.value"
          :name="item.value"
          :value="item.value"
          type="checkbox"
          @change="$emit('update:modelValue', $event.target.checked)"
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
        />
      </div>
      <div class="ml-3 text-sm leading-6">
        <label :for="item.value" class="font-medium text-gray-900">
          {{ item.text }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: []
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: null,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
