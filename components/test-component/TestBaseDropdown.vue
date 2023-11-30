<template>
  <div class="grid grid-cols-4">
    <BaseDropdown
      :option-lists="categoryLists"
      label="หมวดหมู่งาน"
      v-model="data.category"
    >
      {{ data.category }}
    </BaseDropdown>
    <BaseDropdown
      :option-lists="categoryLists"
      label="หมวดหมู่งาน"
      disabled
      v-model="data.category"
    >
      {{ data.category }}
    </BaseDropdown>
  </div>
</template>

<script setup>
const myAddress = ref({
  province: { id: 0, name_th: 'เลือก จังหวัด' }
})

const provinceList = ref([
  { id: 1, name_th: 'กรุงเทพมหานคร' },
  { id: 2, name_th: 'สมุทรปราการ' },
  { id: 3, name_th: 'นนทบุรี' },
  { id: 4, name_th: 'ปทุมธานี' },
  { id: 5, name_th: 'พระนครศรีอยุธยา' }
])

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
