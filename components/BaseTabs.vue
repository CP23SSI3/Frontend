<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select
        id="tabs"
        name="tabs"
        class="block w-full border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
        @change="navigate($event.target.value)"
      >
        <option
          v-for="tab in tabs"
          :key="tab.name"
          :value="tab.href"
          :selected="route.path == tab.href"
        >
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="flex -mb-px space-x-8" aria-label="Tabs">
          <NuxtLink
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.href"
            :class="[
              route.path == tab.href
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
              'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium'
            ]"
            :aria-current="route.path == tab.href ? 'page' : undefined"
          >
            <component
              :is="tab.icon"
              :class="[
                route.path == tab.href
                  ? 'text-blue-500'
                  : 'text-gray-400 group-hover:text-gray-500',
                '-ml-0.5 mr-2 h-5 w-5'
              ]"
              aria-hidden="true"
            />
            <span>{{ tab.name }}</span>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  routePath: {
    type: String,
    required: true
  }
})

const router = useRouter()

const navigate = (href) => {
  router.push(href)
}
</script>

<style lang="scss" scoped></style>
