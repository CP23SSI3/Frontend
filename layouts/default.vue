<template>
  <div class="font-thai">
    <div class="sticky top-0 z-50">
      <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <NuxtLink href="/">
                  <nuxt-img
                    class="w-auto h-11"
                    src="../public/InternHub-logo.svg"
                    alt="InternHub"
                /></NuxtLink>
              </div>
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                  <NuxtLink
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                      route.path == item.href
                        ? 'text-white bg-gray-900'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white ',
                      'block px-3 py-2 text-base rounded-md font-medium'
                    ]"
                    >{{ item.name }}</NuxtLink
                  >
                </div>
              </div>
            </div>
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex items-center">
                <button
                  type="button"
                  class="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">View notifications</span>
                  <BellIcon class="w-6 h-6" aria-hidden="true" />
                </button>

                <!-- Profile dropdown -->
                <Menu as="div" class="relative ml-3">
                  <div>
                    <MenuButton
                      class="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span class="absolute -inset-1.5" />
                      <span class="sr-only">Open user menu</span>
                      <UserCircleIcon
                        class="w-8 h-8 text-gray-300 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem v-slot="{ active }">
                        <a
                          href="#"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          ]"
                          >Your Profile</a
                        >
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a
                          href="#"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          ]"
                          >Settings</a
                        >
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a
                          href="#"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          ]"
                          >Sign out</a
                        >
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <div class="flex -mr-2 sm:hidden">
              <!-- Mobile menu button -->
              <DisclosureButton
                class="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span class="absolute -inset-0.5" />
                <span class="sr-only">Open main menu</span>
                <Bars3Icon
                  v-if="!open"
                  class="block w-6 h-6"
                  aria-hidden="true"
                />
                <XMarkIcon v-else class="block w-6 h-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel class="sm:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
            >
              <DisclosureButton
                as="a"
                :class="[
                  route.path.includes(item.href)
                    ? 'text-white bg-gray-900'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white ',
                  'block px-3 py-2 text-base rounded-md font-medium'
                ]"
              >
                {{ item.name }}
              </DisclosureButton></NuxtLink
            >
          </div>
          <div class="pt-4 pb-3 border-t border-gray-700">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <UserCircleIcon class="w-10 h-10 text-gray-300 rounded-full" />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-white">Tom Cook</div>
                <div class="text-sm font-medium text-gray-400">
                  tom@example.com
                </div>
              </div>
              <button
                type="button"
                class="relative flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">View notifications</span>
                <BellIcon class="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div class="px-2 mt-3 space-y-1">
              <DisclosureButton
                as="a"
                href="#"
                class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
                >Your Profile</DisclosureButton
              >
              <DisclosureButton
                as="a"
                href="#"
                class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
                >Settings</DisclosureButton
              >
              <DisclosureButton
                as="a"
                href="#"
                class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
                >Sign out</DisclosureButton
              >
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <!-- <div
        class="flex items-center justify-center w-full h-20 bg-gray-900"
        v-if="
          route.fullPath.includes('/form') || route.fullPath.includes('/edit')
        "
      >
        <h2
          class="text-xl font-bold leading-7 text-center text-white sm:truncate sm:text-2xl sm:tracking-tight"
        >
          {{
            route.fullPath.includes('/edit')
              ? 'แก้ไขโพสต์ประกาศฝึกงาน'
              : 'แบบฟอร์มสร้างประกาศรับสมัครฝึกงาน'
          }}
        </h2>
      </div> -->
    </div>
    <div class="relative h-auto py-5">
      <!-- <header>
        <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1
            class="text-3xl font-bold leading-tight tracking-tight text-gray-900"
          >
            Dashboard
          </h1>
        </div>
      </header> -->
      <main>
        <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <!-- Your content -->
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserCircleIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const navigation = ref([
  {
    name: 'Internship',
    href: '/internship'
  }
  // {
  //   name: 'Component',
  //   href: '/components'
  // }
  // {
  //   name: 'Test',
  //   href: '/test'
  // }
])
</script>

<style lang="scss" scoped></style>
