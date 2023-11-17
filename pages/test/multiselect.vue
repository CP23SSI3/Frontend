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
    {{ value2 }}
    <Multiselect
      v-model="value2"
      placeholder="Choose position"
      noOptionsText="..."
      :filter-results="false"
      :min-chars="1"
      :resolve-on-load="false"
      :delay="1"
      :searchable="true"
      :create-option="true"
      class="searchselect-blue"
      :options="
        (query) => fetchLanguages(query) // check JS block for implementation
      "
    />
  </div>
</template>

<script setup>
const value = ref(['Frontend'])
const nameWithLang = (name) => {
  return 'devdd'
}

const value2 = ref('')
const options = [
  'Frontend',
  'Backend',
  'UX/UI',
  'Developer',
  'Dev',
  'Full stack'
]
onMounted(() => {
  // Set default value after the component is mounted
  value2.value = 'Database'
})
const fetchLanguages = async (query) => {
  console.log(query)
  let result = options.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  )
  return result
}
</script>

<style scoped>
.multiselect-blue {
  --ms-tag-bg: #dbeafe;
  --ms-tag-color: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
}

.searchselect-blue {
  --ms-option-bg-selected: #2563eb;
  --ms-option-bg-selected-pointed: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
  --ms-spinner-color: #60a5fa;
}
</style>
