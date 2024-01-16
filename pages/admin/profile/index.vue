<template>
  <BaseSectionContent class="flex flex-col gap-3 p-6 lg:p-10">
    <div class="flex items-center gap-6">
      <h1 class="text-2xl font-bold leading-8 text-black">Profile</h1>
    </div>
    <div class="grid grid-cols-6 py-4 gap-x-6">
      <!-- column 1 -->
      <div class="col-span-2 space-y-4">
        <div class="flex-none">
          <nuxt-img
            class="inline-block w-20 h-20 rounded-md"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <h2 class="mt-3 font-semibold text-gray-900">
            {{ myUser.firstname + ' ' + myUser.lastname }}
          </h2>
          <p class="text-gray-700">{{ myUser.role }}</p>
        </div>
        <div class="space-y-3">
          <BaseDescription label="Username" class="">
            {{ myUser.username }}
          </BaseDescription>
          <BaseDescription label="User ID" class="">
            {{ myUser.userId }}
          </BaseDescription>
          <BaseDescription label="Email Address" class="">
            {{ myUser.email }}
          </BaseDescription>
          <BaseDescription label="Home Address" class="">
            {{
              `${myUser.address.area} แขวง${myUser.address.subDistrict} เขต${myUser.address.district}, ${myUser.address.city}  ${myUser.address.postalCode}`
            }}
          </BaseDescription>
          <BaseDescription label="Phone Number" class="">
            {{ myUser.phoneNumber }}
          </BaseDescription>
        </div>
      </div>
      <!-- column 2 -->
      <div class="col-span-4 pl-4 border-l-2 border-gray-400">
        <BaseTitleForm>General information</BaseTitleForm>
      </div>
    </div>

    {{ myUser }}
  </BaseSectionContent>
</template>

<script setup>
import { EnvelopeIcon, PhoneIcon } from '@heroicons/vue/20/solid'
import { Bars3BottomLeftIcon } from '@heroicons/vue/24/outline'
import Swal from 'sweetalert2'

const userId = '9c2e4bd8-a897-4bce-9a63-5267283d6e30'

// --- GET : User by id ---
const myUser = ref()
const getMyUser = async () => {
  try {
    const res = await getUserById(userId)
    if (res.value.status == 200) {
      console.log(res.value.message)
      myUser.value = res.value.data
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'Error',
      text: 'ไม่สามารถเรียกข้อมูลของ User นี้ได้'
    })
  }
}

await getMyUser()

// const user = await getUserById(userId)
</script>

<style lang="scss" scoped></style>
