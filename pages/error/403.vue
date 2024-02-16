<template>
  <div>
    <!-- <section class="bg-white dark:bg-gray-900"> -->
    <div class="container flex items-center min-h-full px-6 py-12 mx-auto">
      <div>
        <p class="text-sm font-medium text-blue-500">403 error</p>
        <h1 class="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
          Access deined
        </h1>
        <p class="mt-4 text-gray-500">
          Sorry, the page you are looking for could not be fround
        </p>

        <div class="flex items-center mt-6 gap-x-3">
          <BaseButton
            outline
            :leading-icon="ArrowLongLeftIcon"
            @click="gotoBack()"
          >
            <span>Go back</span>
          </BaseButton>

          <BaseButton @click="gotoHome()"> Take me home </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'
const router = useRouter()
const gotoBack = () => router.go(-1)
const gotoHome = () => router.push({ path: '/' })
</script>

<style lang="scss" scoped></style>
