<template>
  <div class="space-y-6">
    <BaseTitle>{{ user.firstname + ' ' + user.lastname }}</BaseTitle>
    <BaseLine></BaseLine>
    <div class="flex gap-7">
      <div class="flex flex-col w-full gap-6">
        <BaseDescription label="Profile">
          {{ user.userDesc }}
        </BaseDescription>
        <BaseDescription label="Experience">
          {{ user.experiences }}
        </BaseDescription>
      </div>
      <div class="w-full">
        <BaseDescription label="Contact">
          <div class="flex flex-col gap-1">
            <BaseItem :icon="EnvelopeIcon" class="text-gray-900">
              {{ user.email }}
            </BaseItem>
            <BaseItem :icon="PhoneIcon" class="text-gray-900">
              {{ user.phoneNumber }}
            </BaseItem>
            <BaseItem :icon="MapPinIcon" class="text-gray-900">
              {{
                `${user.address.area} แขวง${user.address.subDistrict} เขต${user.address.district}, ${user.address.city}  ${user.address.postalCode}`
              }}
            </BaseItem>
          </div>
        </BaseDescription>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'register'
})
const route = useRoute()
const userId = route.params.userId

const myUser = await getUserById(userId)
const user = myUser.value.data
const print = () => {
  console.log(user)
  window.print()
}
setTimeout(() => {
  print()
}, 200)
</script>

<style scoped></style>
