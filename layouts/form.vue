<template>
  <div class="font-thai">
    <div class="sticky top-0 z-50">
      <Navbar />
      <div
        class="flex items-center justify-center w-full h-20 bg-gray-900"
        v-if="
          route.fullPath.includes('/form') || route.fullPath.includes('/edit')
        "
      >
        <h2
          class="text-xl font-bold leading-7 text-center text-white sm:truncate sm:text-2xl sm:tracking-tight"
        >
          {{
            route.fullPath.includes('/edit')
              ? 'แก้ไขโพสต์ประกาศฝึกงาน'
              : 'แบบฟอร์มสร้างประกาศรับสมัครฝึกงาน'
          }}
        </h2>
      </div>
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
        <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <!-- Your content -->
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
import Navbar from '../components/layout-component/navbar.vue'
</script>

<style lang="scss" scoped></style>
