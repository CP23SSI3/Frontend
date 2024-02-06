<template>
  <!-- <div class="grid items-start gap-6 lg:grid-cols-12"> -->
  <div class="flex flex-col gap-3">
    <!-- <BaseSidebar
      class="lg:col-span-3"
      :route-path="route.path"
      :items="navigation"
    ></BaseSidebar> -->
    <BaseTitle>My Account</BaseTitle>
    <BaseTabs :route-path="route.path" :tabs="tabs"></BaseTabs>

    <div>
      <NuxtPage />
    </div>
    <!-- </div> -->
  </div>
</template>

<script setup>
import {
  UserIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/solid'

const route = useRoute()

const tabs = [
  {
    name: 'Profile',
    href: '/account/admin/profile',
    icon: UserIcon
  },
  {
    name: 'Manage Users',
    href: '/account/admin/users',
    icon: UserGroupIcon
  },
  {
    name: 'Manage Company',
    href: '/account/admin/companies',
    icon: BuildingOfficeIcon
  },
  {
    name: 'Manage Posts',
    href: '/account/admin/posts',
    icon: PencilSquareIcon
  }
]
</script>

<style lang="scss" scoped></style>
