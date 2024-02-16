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
          <BaseProfile
            size="XL"
            :fname="adminUser.firstname"
            :lname="adminUser.lastname"
          />

          <!-- <BaseButton outline>Change</BaseButton> -->
          <BaseBadge color="blue">{{ adminUser.role }}</BaseBadge>
          <div class="flex gap-6 sm:flex-col">
            <BaseDescription label="Created Date" class="">
              {{
                moment(new Date(adminUser.createdDate)).format(
                  'D MMM YYYY, hh:mm a'
                )
              }}
            </BaseDescription>
            <BaseDescription label="Last Update" class="">
              {{
                moment(new Date(adminUser.lastUpdate)).format(
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
            v-model="adminUser.username"
          ></BaseInputField>
          <BaseInputField
            class="sm:col-span-2"
            label="User ID"
            id="userId"
            v-model="adminUser.userId"
            disabled
          ></BaseInputField>
          <BaseInputField
            class="sm:col-start-1"
            label="First Name"
            id="firstname"
            v-model="adminUser.firstname"
          ></BaseInputField>
          <BaseInputField
            label="Last Name"
            id="lastname"
            v-model="adminUser.lastname"
          ></BaseInputField>

          <BaseInputField
            class="sm:col-start-1"
            label="Email Address"
            id="email"
            v-model="adminUser.email"
          ></BaseInputField>
          <BaseInputField
            label="Phone Number"
            id="phoneNumbes"
            v-model="adminUser.phoneNumber"
          ></BaseInputField>

          <BaseDescription
            label="Home Address"
            class="sm:col-start-1 sm:col-span-2"
          >
            {{
              `${adminUser.address.area} แขวง${adminUser.address.subDistrict} เขต${adminUser.address.district}, ${adminUser.address.city}  ${adminUser.address.postalCode}`
            }}
          </BaseDescription>

          <!-- <BaseInputField
            label="Home Address"
            id="address"
            v-model="adminUser"
          ></BaseInputField> -->
        </div>
      </div>
      <BaseLine />
      <div class="flex items-center justify-end px-4 py-5 sm:px-10">
        <BaseButton>Save</BaseButton>
      </div>
    </div>
  </BaseSectionContent>

  <!-- {{ adminUser }} -->
</template>

<script setup>
// import { PencilIcon } from '@heroicons/vue/20/solid'
import { PencilIcon } from '@heroicons/vue/24/outline'
import Swal from 'sweetalert2'
import moment from 'moment'

const userId = '9c2e4bd8-a897-4bce-9a63-5267283d6e30'

// --- GET : User by id ---
const adminUser = ref()
const getadminUser = async () => {
  try {
    const res = await getUserById(userId)
    if (res.value.status == 200) {
      console.log(res.value.message)
      adminUser.value = res.value.data
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

await getadminUser()

// const user = await getUserById(userId)
</script>

<style lang="scss" scoped></style>
