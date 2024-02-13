<template>
  <BaseSectionContent class="w-full" v-if="myUser != null">
    <div>
      <div class="flex items-center justify-between px-4 py-5 sm:px-10">
        <BaseTitleForm>Profile Detail</BaseTitleForm>
        <!-- <BaseButton outline :leading-icon="PencilIcon">Edit</BaseButton> -->
      </div>
      <BaseLine />

      <div class="grid gap-6 px-4 py-8 sm:grid-cols-3 sm:px-10">
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
            disabled
          ></BaseInputField>
          <BaseInputField
            label="Phone Number"
            id="phoneNumbes"
            v-model="myUser.phoneNumber"
          ></BaseInputField>

          <!-- <BaseDescription
            label="Home Address"
            class="sm:col-start-1 sm:col-span-2"
          >
            {{
              `${myUser.address.area} แขวง${myUser.address.subDistrict} เขต${myUser.address.district}, ${myUser.address.city}  ${myUser.address.postalCode}`
            }}
          </BaseDescription> -->
          <BaseLineTopic class="sm:col-start-1 sm:col-span-full"
            >Address</BaseLineTopic
          >
          <BaseInputField
            label="ที่อยู่ปัจจุบัน"
            id="area"
            class="sm:col-start-1 sm:col-span-2"
            v-model="myUser.address.area"
          ></BaseInputField>
          <BaseInput
            label="รหัสไปรณีย์"
            id="postalCode"
            v-model="myAddress.tambon.zip_code"
            disabled
          ></BaseInput>
          <BaseDropdown
            class="relative z-40 sm:col-start-1"
            :option-lists="provinceList"
            label="จังหวัด"
            v-model="myAddress.province"
            @click="getAmphure(myAddress.province.id)"
          />
          <BaseDropdown
            class="relative z-30"
            :option-lists="amphureList"
            label="เขต"
            v-model="myAddress.amphure"
            :disabled="!(amphureList.length > 0)"
            @click="getTambon(myAddress.province.id, myAddress.amphure.id)"
          />
          <BaseDropdown
            class="relative z-20"
            :option-lists="tambonList"
            label="แขวง"
            v-model="myAddress.tambon"
            :disabled="!(tambonList.length > 0)"
          />
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
      myUser.value = res.value.data
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'Error',
      text: error.message
    })
  }
}

await getUser()

// --- location: province > amphure > tambon ---
const sortingThai = (a, b) => {
  return a.text.localeCompare(b.text, 'th')
}
const myAddress = ref({
  province: { id: 0, text: 'เลือก จังหวัด' },
  amphure: { id: 0, text: 'เลือก เขต' },
  tambon: { id: 0, text: 'เลือก แขวง', zip_code: null }
})
const { data } = await useFetch('/api/locations-thai')
// console.log(data.value)
const provinceList = ref([])
const getProvince = () => {
  let list = []
  let province
  data.value.forEach((city) => {
    province = {
      id: city.id,
      text: city.name_th
    }
    list.push(province)
  })
  list.sort(sortingThai)
  provinceList.value = list
}
getProvince()

const amphureList = ref([])
const getAmphure = (provinceId) => {
  amphureList.value = []
  myAddress.value.amphure = { id: 0, text: 'เลือก เขต' }
  tambonList.value = []
  myAddress.value.tambon = { id: 0, text: 'เลือก แขวง', zip_code: null }
  let list = []
  let result = data.value.find((city) => city.id === provinceId)
  let amphure
  result.amphure.forEach((district) => {
    amphure = {
      id: district.id,
      text: district.name_th
    }
    list.push(amphure)
  })
  list.sort(sortingThai)
  amphureList.value = list
}

const tambonList = ref([])
const getTambon = (provinceId, amphureId) => {
  tambonList.value = []
  myAddress.value.tambon = { id: 0, text: 'เลือก แขวง', zip_code: null }
  let province = data.value.find((city) => city.id === provinceId)
  let amphure = province.amphure.find((district) => district.id === amphureId)
  let list = []
  let tambon
  amphure.tambon.forEach((subDistrict) => {
    tambon = {
      id: subDistrict.id,
      text: subDistrict.name_th,
      zip_code: subDistrict.zip_code
    }
    list.push(tambon)
  })
  list.sort(sortingThai)
  tambonList.value = list
}

const setAddress = () => {
  let address = myUser.value.address
  ;(address.city = myAddress.value.province.text),
    (address.district = myAddress.value.amphure.text),
    (address.subDistrict = myAddress.value.tambon.text),
    (address.postalCode = myAddress.value.tambon.zip_code)
}

const setupMyAddress = () => {
  let address = myUser.value.address
  let province = data.value.find((p) => p.name_th.includes(address.city))
  if (province) {
    myAddress.value.province.id = province.id
    myAddress.value.province.text = province.name_th
    getAmphure(myAddress.value.province.id)
  }
  let amphure = amphureList.value.find((a) => a.text.includes(address.district))
  if (amphure) {
    myAddress.value.amphure.id = amphure.id
    myAddress.value.amphure.text = amphure.text
    getTambon(myAddress.value.province.id, myAddress.value.amphure.id)
  }
  let tambon = tambonList.value.find((t) =>
    t.text.includes(address.subDistrict)
  )
  if (tambon) {
    myAddress.value.tambon.id = tambon.id
    myAddress.value.tambon.text = tambon.text
    myAddress.value.tambon.zip_code = tambon.zip_code
  } else {
    myAddress.value.tambon.zip_code = address.postalCode
  }
}

setupMyAddress()

// --- location: get latitude / longtitude ---
const getGeoLication = async () => {
  setAddress()
  let address = form.value.address
  let location = address.area.concat(
    ' ',
    address.subDistrict,
    ' ',
    address.district,
    ' ',
    address.city,
    ' ',
    address.country,
    ' ',
    address.postalCode
  )
  try {
    const res = await useGoogleMap(location)
    let response = res.value
    if (response.status == 'OK') {
      address.latitude = response.results[0].geometry.location.lat
        .toString()
        .substring(0, 11)
      address.longitude = response.results[0].geometry.location.lng
        .toString()
        .substring(0, 11)
      // console.log(address.latitude + ',' + address.longitude)
    } else {
      // console.log('Unable to locate this location.')
      Swal.fire({
        showConfirmButton: true,
        timerProgressBar: true,
        confirmButtonColor: 'blue',
        icon: 'error',
        title: 'ที่อยู่ไม่ถูกต้อง',
        text: 'กรุณากรอกที่อยู่ใหม่อีกครั้ง'
      })
    }
  } catch (error) {
    console.error('Error fetching location:', error)
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'ที่อยู่ไม่ถูกต้อง',
      text: 'กรุณากรอกที่อยู่ใหม่อีกครั้ง'
    })
  }
}

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
