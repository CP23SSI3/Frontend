<template>
  <div>
    <input
      type="text"
      v-model="imageUrl"
      placeholder="Enter image URL"
      @input="checkImage"
      class="w-full"
    />
    <img :src="imageUrl" v-if="imageVisible" alt="Image preview" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const imageUrl = ref('')
const imageVisible = ref(false)

const checkImage = () => {
  imageVisible.value = false // Initially hide the image
  const img = new Image()
  img.onload = () => {
    imageVisible.value = true // Show the image if it loads successfully
  }
  img.onerror = () => {
    imageVisible.value = false // Hide the image if loading fails
  }
  img.src = imageUrl.value // Attempt to load the image
}
</script>

<style>
/* Add styles here */
</style>
