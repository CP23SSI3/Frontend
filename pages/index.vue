<template>
  <div class="relative -my-20">
    <div class="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <div
        class="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6"
      >
        <div class="max-w-2xl mx-auto lg:mx-0">
          <img class="h-10" src="/InternHub-logo-light.svg" alt="InternHub" />
          <!-- <div class="hidden sm:mt-32 sm:flex lg:mt-16">
            <div
              class="relative px-3 py-1 text-sm leading-6 text-gray-500 rounded-full ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              Anim aute id magna aliqua ad ad non deserunt sunt.
              <a
                href="#"
                class="font-semibold text-blue-600 whitespace-nowrap"
                ><span class="absolute inset-0" aria-hidden="true" />Read more
                <span aria-hidden="true">&rarr;</span></a
              >
            </div>
          </div> -->
          <h1
            class="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl"
          >
            Find the Internship program that suited you the best
          </h1>
          <!-- <p class="mt-6 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
            lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
            fugiat aliqua.
          </p> -->
          <div class="flex items-center mt-10 gap-x-6">
            <NuxtLink
              to="/internship"
              class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >Get started</NuxtLink
            >
            <!-- <a href="#" class="text-sm font-semibold leading-6 text-gray-900"
              >Learn more <span aria-hidden="true">→</span></a
            > -->
          </div>
        </div>
      </div>
      <div
        class="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0"
      >
        <img
          class="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          src="/landing-2.png"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
</script>

<style lang="scss" scoped></style>
