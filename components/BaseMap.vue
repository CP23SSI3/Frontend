<template>
  <GoogleMap
    api-key="AIzaSyD6ZM0YIEty5m93gpjqkwV6wc7s9rzh7fM"
    style="width: 100%; height: 240px"
    :center="center"
    :zoom="12"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const props = defineProps({
  lat: {
    type: Number,
    required: true
  },
  lng: { type: Number, required: true }
})

const center = computed(() => {
  return { lat: props.lat, lng: props.lng }
})
</script>

<style lang="scss" scoped></style>
