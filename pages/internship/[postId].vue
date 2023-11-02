<template>
  <NuxtLink
    :to="{
      path: `/internship`
      // --- เอาไว้ย้อนกลับหน้า page เดิม ---
      // query: { page: route.query.page }
    }"
  >
    <BaseItem :icon="ChevronLeftIcon" class="mb-5 cursor-pointer"
      >back</BaseItem
    >
  </NuxtLink>

  <BaseSectionContent class="flex flex-col gap-3 px-6 py-6">
    <div class="flex items-center justify-between w-full">
      <div class="flex items-start gap-2 mb-3 lg:gap-6">
        <nuxt-img
          class="w-12 h-12 rounded-sm shadow-md bg-gray-50"
          src="/logo-test.png"
          alt="Your Company"
        />

        <div class="flex flex-col-reverse lg:flex-col">
          <h2 class="text-sm lg:text-lg">
            ประชาสัมพันธ์ บริษัทรับนักศึกษาฝึกงานค่ะ ตามรายละเอียดด้านล่างค่ะ
          </h2>

          <div class="flex gap-2">
            <div class="text-xs font-semibold leading-6 lg:text-sm">
              แอทโมสฟ์ ดิจิทัล โซลูชั่นส์ almosph.com
            </div>
            <BaseBadge color="green" class="hidden lg:flex"
              >เปิดรับตลอด</BaseBadge
            >
          </div>
        </div>
      </div>
      <div class="flex gap-2">
        <BaseButton :leadingIcon="StarIcon" outline>Favorite</BaseButton>
        <BaseButton :trailingIcon="ShareIcon">Share</BaseButton>
      </div>
    </div>
    <BaseLine />
  </BaseSectionContent>
</template>

<script setup>
import { ChevronLeftIcon, ShareIcon } from '@heroicons/vue/24/solid'
import { StarIcon } from '@heroicons/vue/24/outline'
const route = useRoute()
</script>

<style lang="scss" scoped></style>
