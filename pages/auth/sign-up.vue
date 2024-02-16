<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <NuxtLink to="/">
      <nuxt-img
        class="w-auto h-12 mx-auto"
        src="../public/InternHub-logo-light.svg"
        alt="InternHub"
    /></NuxtLink>
    <h2
      class="mt-4 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900"
    >
      Sign up
    </h2>
  </div>

  <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
    <!-- <Form @submit="submitForm" :validation-schema="schema"> -->
    <!-- Page 1 :  Personal Information-->
    <div class="space-y-5">
      <Form
        @submit="next"
        :validation-schema="schema1"
        class="space-y-4"
        v-if="currentPage == 1"
      >
        <div class="flex gap-3">
          <BaseInputField
            label="ชื่อจริง"
            id="firstname"
            required
            v-model="user.firstname"
          />
          <BaseInputField
            label="นามสกุล"
            id="lastname"
            required
            v-model="user.lastname"
          />
        </div>
        <BaseInputField
          label="Email Address"
          id="email"
          required
          v-model="user.email"
        />
        <BaseInputField
          label="Phone Number"
          id="phoneNumber"
          required
          v-model="user.phoneNumber"
        />
        <div>
          <BaseButton
            class="mt-4"
            type="submit"
            secondary
            full
            :trailing-icon="ChevronRightIcon"
            >Next</BaseButton
          >
        </div>
      </Form>
      <Form
        @submit="next(2)"
        :validation-schema="schema2"
        class="space-y-4"
        v-else-if="currentPage == 2"
      >
        <BaseInputField label="ที่อยู่" id="area" v-model="user.address.area" />
        <BaseDropdown
          class="relative z-40"
          :option-lists="provinceList"
          label="จังหวัด"
          v-model="myAddress.province"
          required
          @click="getAmphure(myAddress.province.id)"
        >
        </BaseDropdown>
        <BaseDropdown
          class="relative z-30"
          :option-lists="amphureList"
          label="เขต"
          v-model="myAddress.amphure"
          :disabled="!(amphureList.length > 0)"
          required
          @click="getTambon(myAddress.province.id, myAddress.amphure.id)"
        >
        </BaseDropdown>
        <BaseDropdown
          class="relative z-20"
          :option-lists="tambonList"
          label="แขวง"
          v-model="myAddress.tambon"
          :disabled="!(tambonList.length > 0)"
          required
        >
        </BaseDropdown>
        <BaseInput
          class="sm:col-span-2"
          label="รหัสไปรณีย์"
          id="postalCode"
          v-model="myAddress.tambon.zip_code"
          disabled
        ></BaseInput>
        <div>
          <div class="flex gap-3 mt-6">
            <BaseButton
              type="button"
              outline
              full
              :leading-icon="ChevronLeftIcon"
              @click="currentPage--"
              >Back</BaseButton
            >
            <BaseButton
              type="submit"
              secondary
              full
              :trailing-icon="ChevronRightIcon"
              >Next</BaseButton
            >
          </div>
        </div>
      </Form>
      <Form
        @submit="submitForm"
        :validation-schema="schema3"
        class="space-y-4"
        v-else-if="currentPage == 3"
      >
        <BaseInputField
          label="Username / ชื่อผู้ใช้"
          id="username"
          v-model="user.username"
        />
        <BaseInputField
          label="Password"
          id="rawPassword"
          type="password"
          v-model="user.rawPassword"
        />
        <BaseInputField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          v-model="user.confirmPassword"
        />
        <div>
          <div class="flex gap-3 mt-6">
            <BaseButton
              type="button"
              outline
              full
              :leading-icon="ChevronLeftIcon"
              @click="currentPage--"
              >Back</BaseButton
            >
            <BaseButton type="submit" full> Sign up </BaseButton>
          </div>
        </div>
      </Form>

      <div class="flex gap-3">
        <!-- <BaseButton
          type="button"
          outline
          full
          :leading-icon="ChevronLeftIcon"
          v-if="currentPage > 1"
          @click="currentPage--"
          >Back</BaseButton
        > -->
        <!-- <BaseButton
          type="button"
          secondary
          full
          :trailing-icon="ChevronRightIcon"
          v-if="currentPage < steps.length"
          @click="currentPage++"
          >Next</BaseButton
        > -->
        <!-- <BaseButton type="submit" full v-if="currentPage == steps.length">
          Sign up
        </BaseButton> -->
      </div>
      <!-- Steps (Pagination) -->
      <nav class="flex items-center justify-center" aria-label="Progress">
        <p class="text-sm font-medium">
          Step
          {{ steps.findIndex((step) => step.step === currentPage) + 1 }} of
          {{ steps.length }}
        </p>
        <div role="list" class="flex items-center ml-8 space-x-5">
          <div v-for="step in steps" :key="step.name">
            <div
              :class="[
                step.step < currentPage
                  ? 'block bg-blue-600 hover:bg-blue-900 cursor-pointer'
                  : step.step === currentPage
                  ? 'relative flex items-center justify-center cursor-pointer'
                  : 'block bg-gray-300 hover:bg-gray-400',
                'h-2.5 w-2.5 rounded-full'
              ]"
            >
              <span
                class="absolute flex w-5 h-5 p-px"
                aria-hidden="true"
                v-show="step.step === currentPage"
              >
                <span class="w-full h-full bg-blue-200 rounded-full" />
              </span>
              <span
                v-show="step.step === currentPage"
                class="relative block h-2.5 w-2.5 rounded-full bg-blue-600"
                aria-hidden="true"
              />
              <span class="sr-only">{{ step.name }}</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <!-- </Form> -->

    <p class="mt-6 text-sm text-center text-gray-500">
      Already have an account?
      {{ ' ' }}
      <NuxtLink
        to="/auth/login"
        class="font-semibold leading-6 text-blue-600 hover:text-blue-500"
        >Log in</NuxtLink
      >
    </p>
  </div>
  {{ user }} <br />
  {{ myAddress }}
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { Field, ErrorMessage, Form } from 'vee-validate'
import yup from '@/assets/yup-error.js'
import Swal from 'sweetalert2'
definePageMeta({
  layout: 'register',
  middleware: ['logger']
})

const router = useRouter()

const user = ref({
  address: {
    // myAddress --> function setAddress() inner getGeoLication()
    area: '',
    city: '',
    country: 'ประเทศไทย',
    district: '',
    latitude: null, // function getGeoLication()
    longitude: null,
    postalCode: '',
    subDistrict: ''
  },
  email: '',
  firstname: '',
  lastname: '',
  phoneNumber: '',
  rawPassword: '',
  confirmPassword: '',
  username: '',
  role: 'USER'
})

// const schema = yup.object({
//   username: yup.string().required('กรุณากรอก ชื่อผู้ใช้'),
//   firstname: yup.string().required('กรุณากรอก ชื่อจริง'),
//   lastname: yup.string().required('กรุณากรอก นามสกุล'),
//   email: yup.string().email().required('กรุณากรอก อีเมล').max(320),
//   rawPassword: yup
//     .string()
//     .required('กรุณาตั้งรหัสผ่าน')
//     .min(8, 'อย่างน้อย 8 ตัวอักษร'),
//   confirmPassword: yup
//     .string()
//     .required('กรุณายืนยันรหัสผ่านอีกครั้ง')
//     .oneOf([yup.ref('rawPassword'), null], 'รหัสผ่านไม่ตรงกัน')
// })

// --- check validate : yup ---
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema1 = yup.object({
  firstname: yup.string().required('กรุณากรอก ชื่อจริง'),
  lastname: yup.string().required('กรุณากรอก นามสกุล'),
  email: yup.string().email().required('กรุณากรอก อีเมล').max(320),
  phoneNumber: yup
    .string()
    .trim()
    .required('โปรดระบุ เบอร์โทร')
    .matches(phoneRegExp, 'เบอร์โทรไม่ถูกต้อง')
    .max(10)
})

const schema2 = yup.object({
  area: yup.string().required('โปรดระบุ ที่อยู่').max(100)
})

const schema3 = yup.object({
  username: yup.string().required('กรุณากรอก ชื่อผู้ใช้'),
  rawPassword: yup
    .string()
    .required('กรุณาตั้งรหัสผ่าน')
    .min(8, 'อย่างน้อย 8 ตัวอักษร'),
  confirmPassword: yup
    .string()
    .required('กรุณายืนยันรหัสผ่านอีกครั้ง')
    .oneOf([yup.ref('rawPassword'), null], 'รหัสผ่านไม่ตรงกัน')
})

const next = async (numPage) => {
  currentPage.value++
  if (numPage == 2) {
    await getGeoLication()
  }
}

const submitForm = async () => {
  await register()
}

const register = async () => {
  try {
    const res = await useRegister(user.value)
    if (res.value) {
      router.push('/')
    }
  } catch (error) {
    console.log(error)
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

const steps = [
  { name: 'Step 1', step: 1 },
  { name: 'Step 2', step: 2 },
  { name: 'Step 3', step: 3 }
]
const currentPage = ref(1)

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
  let address = user.value.address
  ;(address.city = myAddress.value.province.text),
    (address.district = myAddress.value.amphure.text),
    (address.subDistrict = myAddress.value.tambon.text),
    (address.postalCode = myAddress.value.tambon.zip_code)
}

// --- location: get latitude / longtitude ---
const getGeoLication = async () => {
  setAddress()
  let address = user.value.address
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
</script>

<style lang="scss" scoped></style>
