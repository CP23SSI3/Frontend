<template>
  <div class="grid items-start gap-6 lg:grid-cols-12">
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

const navigation = [
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
  },
  {
    name: 'BaseLine'
  },
  {
    name: 'Logout',
    href: '/auth/logout',
    icon: ArrowRightOnRectangleIcon
  }
]
</script>

<style lang="scss" scoped></style>
