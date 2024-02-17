<template>
  <BaseSectionContent class="flex gap-2 px-5 py-5 min-h-fit lg:flex-col">
    <div role="list" class="w-full -mx-2 space-y-1 lg:w-auto">
      <div v-for="item in items" :key="item.name">
        <BaseLine v-if="item.name == 'BaseLine'" />
        <NuxtLink
          v-else
          :to="item.href"
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
</template>

<script setup>
const route = useRoute()
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  routePath: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
