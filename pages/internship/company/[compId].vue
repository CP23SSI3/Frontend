<template>
  <div>
    <BaseItem
      :icon="ChevronLeftIcon"
      class="mb-4 cursor-pointer max-w-min hover:underline"
      @click="back()"
    >
      back
    </BaseItem>

    <div class="relative -z-10">
      <img
        src="@/public/background-company.jpg"
        class="object-cover w-full h-32 lg:h-48 rounded-2xl"
      />
      <div class="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
    </div>

    <div class="max-w-5xl px-4 mx-auto sm:px-2 lg:px-8">
      <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
        <div class="flex">
          <BaseProfile
            company
            size="XL"
            class="w-24 h-24 text-4xl sm:h-32 sm:w-32 ring-4 ring-white"
            :fname="wordForProfileCompany(company.data.compName, 0)"
            :lname="wordForProfileCompany(company.data.compName, 1)"
          />
        </div>
        <div
          class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
        >
          <div class="flex-1 min-w-0 mt-6 sm:hidden md:block">
            <h1 class="text-2xl font-bold text-gray-900 truncate">
              {{ company.data.compName }}
            </h1>
          </div>
          <div
            class="flex flex-col mt-6 space-y-3 justify-stretch sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <NuxtLink :to="company.data.compUrl" target="_blank">
              <BaseButton :leading-icon="LinkIcon" outline full
                >Website</BaseButton
              >
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex-1 hidden min-w-0 mt-6 sm:block md:hidden">
        <h1 class="text-2xl font-bold text-gray-900 truncate">
          {{ company.data.compName }}
        </h1>
      </div>
    </div>
    <BaseSectionContent
      class="max-w-6xl px-5 py-4 mx-auto my-6 space-y-6 md:px-10 md:py-8"
    >
      <BaseDescription label="About Company">
        {{ company.data.compDesc }}
      </BaseDescription>
      <BaseDescription label="Basic Welfare">
        <div v-html="company.data.defaultWelfare"></div>
      </BaseDescription>
      <BaseDescription label="Address">
        {{
          `${company.data.address.area} แขวง${company.data.address.subDistrict} เขต${company.data.address.district}, ${company.data.address.city}  ${company.data.address.postalCode}`
        }}
      </BaseDescription>
      <BaseMap
        :lat="company.data.address.latitude"
        :lng="company.data.address.longitude"
      />
    </BaseSectionContent>
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/solid'
import { LinkIcon } from '@heroicons/vue/20/solid'
const route = useRoute()
const compId = route.params.compId
const company = await getCompanyById(compId)

const router = useRouter()
const wordForProfileCompany = (compName, index) => {
  let words = compName.split(' ')
  return words[index]
}
const back = () => router.go(-1)
</script>

<style lang="scss" scoped></style>
