<template>
  <div class="space-y-3">
    <div
      class="relative flex items-start"
      v-for="(item, index) in listCheckbox"
      :key="index"
    >
      <div class="flex items-center h-6">
        <input
          :id="item.value"
          :name="item.value"
          type="checkbox"
          :value="item.value"
          v-model="checkedNames"
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
  {{ checkedNames }}
</template>

<script setup>
const label = ref('checkbox1')

const listCheckbox = [
  { text: 'Check box 1', value: 'checkbox1' },
  { text: 'Check box 2', value: 'checkbox2' },
  { text: 'Check box 3', value: 'checkbox3' }
]
const checkedNames = ref([])
</script>

<style lang="scss" scoped></style>
