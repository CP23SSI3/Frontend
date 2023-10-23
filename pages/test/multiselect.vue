<template>
  <div>
    {{ value }}
    <Multiselect
      v-model="value"
      mode="tags"
      :close-on-select="false"
      :searchable="true"
      :create-option="true"
      :options="options"
      class="multiselect-blue"
    />
  </div>
</template>

<script setup>
const value = ref([])
const options = [
  'Frontend',
  'Backend',
  'UX/UI',
  'Developer',
  'Dev',
  'Full stack'
]
</script>

<style scoped>
.multiselect-blue {
  --ms-tag-bg: #dbeafe;
  --ms-tag-color: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
}
</style>
