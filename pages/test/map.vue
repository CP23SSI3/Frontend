<template>
  <GoogleMap
    api-key="AIzaSyD6ZM0YIEty5m93gpjqkwV6wc7s9rzh7fM"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
  <input type="text" v-model="address" />
  {{ address }}
  <BaseButton @click="getLocation()">Get Lat,Long</BaseButton>
  {{ location }}
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'

export default defineComponent({
  data() {
    return {
      // center: { lat: 13.705368, lng: 100.5331527 },
      address: '',
      location: { lat: 0, long: 0 },
      api: 'AIzaSyD6ZM0YIEty5m93gpjqkwV6wc7s9rzh7fM'
    }
  },
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 13.705368, lng: 100.5331527 }
    return { center }
  },
  methods: {
    getLocation() {
      this.fetchGeoLocation(this.address)
    },
    async fetchGeoLocation(address) {
      console.log(address)
      await $fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${this.api}`
      )
        .then((response) => {
          console.log(response.results[0].geometry.location)
          this.location = response.results[0].geometry.location
        })
        .catch((error) => {
          console.error('Error fetching location:', error)
        })
    }
  }
})

// const address = ref()
// const location = ref({ lat: 0, long: 0 })
// const api = 'AIzaSyD6ZM0YIEty5m93gpjqkwV6wc7s9rzh7fM'

const getLocation = () => {
  if (address.value) {
    fetchGeoLocation(address.value)
  }
}

const fetchGeoLocation = async (address) => {
  console.log(address)
  await $fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${api}`
  )
    .then((response) => {
      console.log(response.results[0].geometry.location)
      location.value = response.results[0].geometry.location
    })
    .catch((error) => {
      console.error('Error fetching location:', error)
    })
}
</script>

<style lang="scss" scoped></style>
