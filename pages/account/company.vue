<template>
  <!-- <div class="grid items-start gap-6 lg:grid-cols-12">
    <BaseSidebar
      class="lg:col-span-3"
      :route-path="route.path"
      :items="navigation"
    ></BaseSidebar>

    <div
      class="flex flex-col w-full col-span-1 gap-4 px-1 lg:col-span-9 sm:px-0"
    >
      <NuxtPage />
    </div>
  </div> -->
  <div class="flex flex-col gap-3">
    <BaseTitle>{{ auth.user ? auth.user.username : 'My Account' }}</BaseTitle>
    <BaseTabs :route-path="route.path" :tabs="tabs"></BaseTabs>

    <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import {
  UserIcon,
  BuildingOfficeIcon,
  PencilSquareIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const auth = useAuth()

const tabs = [
  {
    name: 'Profile',
    href: '/account/company/profile',
    icon: UserIcon
  },
  {
    name: 'Company',
    href: '/account/company/about-me',
    icon: BuildingOfficeIcon
  },
  {
    name: 'Manage Posts',
    href: '/account/company/posts',
    icon: PencilSquareIcon
  }
]
</script>

<style lang="scss" scoped></style>
