<template>
  <div class="flex flex-col gap-3">
    <BaseTitle
      >Admin {{ auth.user ? ': ' + auth.user.username : '' }}</BaseTitle
    >
    <BaseTabs :route-path="route.path" :tabs="tabs"></BaseTabs>

    <div>
      <NuxtPage :myUser="myUser?.data" />
    </div>
  </div>
</template>

<script setup>
import {
  UserIcon,
  UserGroupIcon,
  BuildingOfficeIcon
} from '@heroicons/vue/24/solid'

const route = useRoute()
const auth = useAuth()
const userId = auth.user.userId

const myUser = await getUserById(userId)

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
  }
]
</script>

<style lang="scss" scoped></style>
