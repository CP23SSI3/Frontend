<template>
  <div class="grid grid-cols-4">
    <BaseDropdown
      :option-lists="categoryLists"
      label="หมวดหมู่งาน"
      v-model="data.category"
    >
      {{ data.category }}
    </BaseDropdown>
  </div>
</template>

<script setup>
const data = ref({
  category: { id: 0, text: '--Select--', value: 'default' }
})

const categoryLists = [
  { id: 0, text: '--Select--', value: 'default' },
  { id: 1, text: 'ไอที', value: 'IT' },
  { id: 2, text: 'งานช่าง', value: 'Engineer' },
  { id: 3, text: 'บัญชี', value: 'Accountant' }
]
</script>

<style lang="scss" scoped></style>
