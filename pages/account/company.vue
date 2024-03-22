<template>
  <div class="flex flex-col gap-3">
    <BaseTitle>{{ auth.user ? auth.user.username : 'My Account' }}</BaseTitle>
    <BaseTabs :route-path="route.path" :tabs="tabs"></BaseTabs>
    <div class="relative h-auto py-2">
      <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <NuxtPage :myUser="myUser?.data" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  UserIcon,
  BuildingOfficeIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const auth = useAuth()
const userId = auth.user.userId

const myUser = await getUserById(userId)

const tabs = [
  {
    name: 'Profile',
    href: '/account/company/profile',
    icon: UserIcon
  },
  {
    name: 'Company',
    href: '/account/company/about-company',
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
