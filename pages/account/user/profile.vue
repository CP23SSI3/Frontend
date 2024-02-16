<template>
  <BaseSectionContent class="w-full overflow-hidden">
    <div>
      <div class="flex items-center justify-between px-4 py-5 sm:px-10">
        <BaseTitleForm>Profile Detail</BaseTitleForm>
        <!-- <BaseButton outline :leading-icon="PencilIcon">Edit</BaseButton> -->
      </div>
      <BaseLine />

      <div class="grid gap-6 px-4 py-5 sm:grid-cols-3 sm:px-10">
        <div
          class="flex flex-col items-center justify-start gap-4 sm:py-4 sm:col-span-1"
        >
          <nuxt-img
            class="inline-block w-24 h-24 rounded-md"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <!-- <BaseButton outline>Change</BaseButton> -->
          <BaseBadge color="blue">{{ myUser.role }}</BaseBadge>
          <div class="flex gap-6 sm:flex-col">
            <BaseDescription label="Created Date" class="">
              {{
                moment(new Date(myUser.createdDate)).format(
                  'D MMM YYYY, hh:mm a'
                )
              }}
            </BaseDescription>
            <BaseDescription label="Last Update" class="">
              {{
                moment(new Date(myUser.lastUpdate)).format(
                  'D MMM YYYY, hh:mm a'
                )
              }}
            </BaseDescription>
          </div>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:col-span-2">
          <BaseInputField
            label="Display Name"
            id="username"
            v-model="myUser.username"
          ></BaseInputField>
          <BaseInputField
            class="sm:col-span-2"
            label="User ID"
            id="userId"
            v-model="myUser.userId"
            disabled
          ></BaseInputField>
          <BaseInputField
            class="sm:col-start-1"
            label="First Name"
            id="firstname"
            v-model="myUser.firstname"
          ></BaseInputField>
          <BaseInputField
            label="Last Name"
            id="lastname"
            v-model="myUser.lastname"
          ></BaseInputField>

          <BaseInputField
            class="sm:col-start-1"
            label="Email Address"
            id="email"
            v-model="myUser.email"
          ></BaseInputField>
          <BaseInputField
            label="Phone Number"
            id="phoneNumbes"
            v-model="myUser.phoneNumber"
          ></BaseInputField>

          <BaseDescription
            label="Home Address"
            class="sm:col-start-1 sm:col-span-2"
          >
            {{
              `${myUser.address.area} แขวง${myUser.address.subDistrict} เขต${myUser.address.district}, ${myUser.address.city}  ${myUser.address.postalCode}`
            }}
          </BaseDescription>

          <!-- <BaseInputField
            label="Home Address"
            id="address"
            v-model="myUser"
          ></BaseInputField> -->
        </div>
      </div>
      <BaseLine />
      <div class="flex items-center justify-between px-4 py-5 sm:px-10">
        <BaseButton
          :leadingIcon="ArrowRightOnRectangleIcon"
          type="button"
          negative
          @click="auth.logout()"
          >Log out</BaseButton
        >
        <BaseButton>Save</BaseButton>
      </div>
    </div>
  </BaseSectionContent>

  <!-- {{ myUser }} -->
</template>

<script setup>
// import { PencilIcon } from '@heroicons/vue/20/solid'
import {
  PencilIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'
import Swal from 'sweetalert2'
import moment from 'moment'

const auth = useAuth()
const userId = auth.user.userId

// --- GET : User by id ---
const myUser = ref()
const getUser = async () => {
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

await getUser()

// {
//     "address": {
//         "area": "ถนนประชาอุทิศ",
//         "city": "กรุงเทพ",
//         "country": "ประเทศไทย",
//         "district": "บางรัก",
//         "latitude": "13.7271846",
//         "longitude": "100.5141211",
//         "postalCode": "10500",
//         "subDistrict": "บางมด"
//     },
//     "email": "toon.pi4@gmail.com",
//     "firstname": "Piraya",
//     "lastname": "Sutthi",
//     "phoneNumber": "0993947744",
//     "rawPassword": "password",
//     "role": "USER",
//     "username": "username"
// }
</script>

<style lang="scss" scoped></style>
