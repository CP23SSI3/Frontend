<script setup lang="ts">
const { data } = await useFetch('/api/locations-thai')
console.log(data.value)

const getAmphure = (provinceId: Number) => {
  console.log(provinceId)
  let result = data.value?.find((item) => item.id === provinceId)
  console.log(result)
  return result?.amphure
}

const listBangkok = getAmphure(1)
</script>

<template>
  <ol>
    <li v-for="item in data">{{ item.name_th }}</li>
  </ol>

  <ol>
    <li v-for="item in listBangkok">{{ item.name_th }}</li>
  </ol>
</template>
