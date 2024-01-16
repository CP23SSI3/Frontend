<template>
  <div class="font-thai">
    <div class="sticky top-0 z-50">
      <Navbar />
    </div>
    <div class="relative h-auto py-5">
      <!-- <header>
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1
            class="text-3xl font-bold leading-tight tracking-tight text-gray-900"
          >
            Dashboard
          </h1>
        </div>
      </header> -->
      <main>
        <div class="max-w-full px-2 mx-auto sm:px-8 lg:px-12">
          <!-- Your content -->
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/layout-component/navbar.vue'
</script>

<style lang="scss" scoped></style>
