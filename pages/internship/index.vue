<template>
  <div>
    <BaseSectionContent class="px-5 py-5">
      <div class="flex items-start gap-2 mb-3 md:gap-6">
        <nuxt-img
          class="w-12 h-12 rounded-sm shadow-md bg-gray-50"
          src="/logo-test.png"
          alt="Your Company"
        />

        <!-- <div class="flex flex-col w-full gap-2"> -->
        <div class="flex flex-col-reverse md:flex-col">
          <div class="text-sm md:text-lg">
            ประชาสัมพันธ์ บริษัทรับนักศึกษาฝึกงานค่ะ ตามรายละเอียดด้านล่างค่ะ
          </div>

          <div class="flex gap-2">
            <div class="text-xs font-semibold leading-6 md:text-sm">
              แอทโมสฟ์ ดิจิทัล โซลูชั่นส์ almosph.com
            </div>
            <BaseBadge color="green" class="hidden sm:flex"
              >เปิดรับตลอด</BaseBadge
            >
          </div>
        </div>

        <!-- </div> -->
      </div>

      <div class="flex flex-col gap-2 md:ml-[70px]">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="(item, index) in listPosition"
            class="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md md:px-3 md:text-sm"
            >{{ item }}</span
          >
        </div>

        <div
          class="flex flex-col gap-2 md:items-center md:justify-between md:flex-row"
        >
          <div class="flex flex-col md:flex-row md:flex-wrap md:space-x-6">
            <BaseItem :icon="BriefcaseIcon">4-6 เดือน</BaseItem>
            <BaseItem :icon="CurrencyDollarIcon">100-120 บาท/วัน</BaseItem>
            <BaseItem :icon="MapPinIcon">สีลม เขตบางรัก กรุงเทพมหานคร</BaseItem>
          </div>

          <BaseButton :trailingIcon="Bars3BottomLeftIcon" outline>
            ดูรายละเอียด
          </BaseButton>
        </div>
      </div>
    </BaseSectionContent>
  </div>
</template>

<script setup>
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  Bars3BottomLeftIcon
} from '@heroicons/vue/20/solid'

const listPosition = ['Frontend', 'Backend', 'Developer', 'Infrastructure']
</script>

<style lang="scss" scoped></style>
