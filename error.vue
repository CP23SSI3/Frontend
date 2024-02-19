<template>
  <NuxtLayout>
    <div class="container flex items-center min-h-full px-6 py-12 mx-auto">
      <div>
        <div v-if="error">
          <p class="text-sm font-medium text-blue-500">
            {{ error.statusCode }} error
          </p>
          <h1 class="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            {{ error.statusMessage ? error.statusMessage : 'Not found page' }}
          </h1>
          <p class="mt-4 text-gray-500">
            {{
              error.message
                ? error.message
                : 'Sorry, the page you are looking for could not be found.'
            }}
          </p>

          <div class="flex items-center mt-6 gap-x-3">
            <BaseButton
              outline
              :leading-icon="ArrowLongLeftIcon"
              @click="gotoBack()"
            >
              <span>Go back</span>
            </BaseButton>

            <BaseButton @click="handleError()"> Take me home </BaseButton>
          </div>
          <!-- {{ error }} -->
        </div>
        <!-- <div v-else>{{ error }}</div> -->
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const error = useError()

import { ArrowLongLeftIcon } from '@heroicons/vue/24/solid'
const router = useRouter()
const gotoBack = () => router.go(-1)

const handleError = () => {
  clearError({
    redirect: '/'
  })
}
</script>
