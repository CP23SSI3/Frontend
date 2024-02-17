<template>
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
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
  FolderIcon,
  DocumentTextIcon,
  DocumentChartBarIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const auth = useAuth()

const tabs = [
  {
    name: 'Profile',
    href: '/account/user/profile',
    icon: UserIcon
  },
  {
    name: 'Experience',
    href: '/account/user/experience',
    icon: BriefcaseIcon
  },
  {
    name: 'Education',
    href: '/account/user/education',
    icon: AcademicCapIcon
  },
  {
    name: 'Favorite Post',
    href: '/account/user/favorite-posts',
    icon: StarIcon
  },
  // {
  //   name: 'Portfolio',
  //   href: '/account/user/documents/portfolio',
  //   icon: FolderIcon
  // },
  {
    name: 'Resume',
    href: '/account/user/documents/resume',
    icon: DocumentTextIcon
  }
  // {
  //   name: 'CV',
  //   href: '/account/user/documents/cv',
  //   icon: DocumentChartBarIcon
  // }
]
</script>

<style lang="scss" scoped></style>
