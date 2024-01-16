<template>
  <div class="grid items-start gap-6 lg:grid-cols-12">
    <BaseSectionContent
      class="hidden col-span-3 gap-2 px-5 py-5 min-h-fit lg:flex lg:flex-col"
    >
      <div class="flex flex-col items-center my-6">
        <nuxt-img
          src="https://randomuser.me/api/portraits/men/94.jpg"
          class="w-32 h-32 mb-4 bg-gray-300 rounded-full shrink-0"
        />

        <h1 class="text-xl font-bold">John Doe</h1>
        <p class="text-gray-700">Software Developer</p>
        <div class="flex flex-wrap justify-center gap-4 mt-4">
          <BaseButton>Contact</BaseButton>
          <BaseButton outline>Resume</BaseButton>
        </div>
      </div>
      <div role="list" class="-mx-2 space-y-1">
        <div v-for="item in navigation" :key="item.name">
          <NuxtLink
            :href="item.href"
            :class="[
              route.path == item.href
                ? 'bg-gray-50 text-blue-600'
                : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50',
              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
            ]"
          >
            <component
              :is="item.icon"
              :class="[
                route.path == item.href
                  ? 'text-blue-600'
                  : 'text-gray-400 group-hover:text-blue-600',
                'h-6 w-6 shrink-0'
              ]"
              aria-hidden="true"
            />
            {{ item.name }}
          </NuxtLink>
        </div>
      </div>
    </BaseSectionContent>

    <div
      class="flex flex-col w-full col-span-1 gap-4 px-1 lg:col-span-9 sm:px-0"
    >
      <div
        class="flex flex-col justify-between gap-2 sm:items-center sm:flex-row"
      >
        <div class="flex items-center gap-4">
          <h1 class="text-2xl font-bold leading-8 text-black">All users</h1>
          <!-- total element -->
          <span class="text-sm text-gray-400">{{ totalItems }} accounts </span>
          <!-- <button
            type="button"z
            class="p-2 -m-2 text-gray-400 hover:text-gray-500 lg:hidden"
            @click="openFilter()"
          >
            <span class="sr-only">Filters</span>

            <FunnelIcon class="w-5 h-5" aria-hidden="true" />
          </button> -->
        </div>
        <!-- <NuxtLink :to="{ path: '/internship/form' }">
          <BaseButton :leadingIcon="PlusCircleIcon" class="w-full md:w-auto"
            >Add Post</BaseButton
          >
        </NuxtLink> -->
      </div>
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import {
  UserIcon,
  UsersIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()

const navigation = [
  {
    name: 'My Profile',
    href: '/admin/profile',
    icon: UserIcon
  },
  {
    name: 'User List',
    href: '/admin/profile/users',
    icon: UsersIcon,
    current: false
  }
]
const totalItems = ref(0)
</script>

<style lang="scss" scoped></style>
