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
    <!-- Page 1 :  Personal Information-->
    <div class="space-y-5">
      <Form
        @submit="next1"
        :validation-schema="schema1"
        class="space-y-4"
        v-if="currentPage == 1"
      >
        <BaseInputField
          label="Username / ชื่อผู้ใช้"
          id="username"
          v-model="user.username"
        />
        <BaseInputField label="Email Address" id="email" v-model="user.email" />
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
          autocomplete="off"
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
        @submit="submitForm"
        :validation-schema="schema2"
        v-slot="{ meta, errors }"
        class="space-y-4"
        v-else-if="currentPage == 2"
      >
        <div class="flex justify-center gap-3 full">
          <BaseInputField
            label="ชื่อจริง"
            id="firstname"
            v-model="user.firstname"
          />
          <BaseInputField
            label="นามสกุล"
            id="lastname"
            v-model="user.lastname"
          />
        </div>
        <Field v-slot="{ field, errors }" name="dateOfBirth">
          <BaseDatePicker
            label="วันเกิด"
            id="dateOfBirth"
            placeholder="DD/MM/YYYY"
            :enable-time-picker="false"
            v-bind="field"
            v-model="birthDay"
            :format="(date) => (date ? moment(date).format('DD/MM/YYYY') : '')"
            :max-date="new Date()"
          >
            <template v-slot:error-message>{{ errors[0] }}</template>
          </BaseDatePicker>
        </Field>
        <BaseInputField
          label="Phone Number"
          id="phoneNumber"
          type="tel"
          v-model="user.phoneNumber"
        />
        <!-- radio: gender -->
        <div class="sm:col-start-1 sm:col-span-3">
          <BaseLabel id="gender">เพศ</BaseLabel>

          <fieldset class="mt-2">
            <div
              class="space-y-4 md:flex md:items-center md:space-x-10 md:space-y-0"
            >
              <div
                v-for="choice in genders"
                :key="choice.value"
                class="flex items-center"
              >
                <input
                  :id="choice.value"
                  :name="choice.value"
                  type="radio"
                  :value="choice.value"
                  v-model="user.gender"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-600"
                />
                <BaseLabel :id="choice.text" class="ml-3">
                  {{ choice.text }}
                </BaseLabel>
              </div>
            </div>
          </fieldset>
        </div>
        <!-- radio: role -->
        <div class="sm:col-start-1 sm:col-span-3">
          <BaseLabel id="role"> สถานะ </BaseLabel>
          <fieldset class="mt-2">
            <div
              class="space-y-4 md:flex md:items-center md:space-x-10 md:space-y-0"
            >
              <div
                v-for="choice in roles"
                :key="choice.value"
                class="flex items-center"
              >
                <input
                  :id="choice.value"
                  :name="choice.value"
                  type="radio"
                  :value="choice.value"
                  v-model="user.role"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-600"
                />
                <BaseLabel :id="choice.value" class="ml-3">
                  {{ choice.text }}
                </BaseLabel>
              </div>
            </div>
          </fieldset>
        </div>
        <!-- 
        <BaseInputField
          v-if="user.role == 'COMPANY'"
          label="ชื่อบริษัท"
          id="compName"
          v-model="user.company"
        /> -->

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
      <!-- Steps (Pagination) -->
      <!-- <nav class="flex items-center justify-center" aria-label="Progress">
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
                  ? 'block bg-blue-600 hover:bg-blue-900'
                  : step.step === currentPage
                  ? 'relative flex items-center justify-center'
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
      </nav> -->
    </div>
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
  <!-- {{ user }} -->
</template>

<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { Field, ErrorMessage, Form } from 'vee-validate'
import moment from 'moment'
import Swal from 'sweetalert2'
import yup from '@/assets/yup-error.js'

definePageMeta({
  layout: 'register',
  middleware: ['logger']
})

const user = ref({
  // (1/2)
  username: '',
  email: '',
  rawPassword: '',
  confirmPassword: '',
  // (2/2)
  firstname: '',
  lastname: '',
  dateOfBirth: '', //birthDay
  phoneNumber: '',
  gender: null,
  role: 'USER',
  address: null
})

// --- Pagination (Multiform) ---
// const steps = [
//   { name: 'Step 1', step: 1 },
//   { name: 'Step 2', step: 2 },
//   { name: 'Step 3', step: 3 }
// ]
const currentPage = ref(1)

// ------ Multi-Form (1/2) ------
const next1 = () => {
  checkUser()
}

const checkUser = async () => {
  try {
    const res = await useCheckUsernameEmail({
      username: user.value.username,
      email: user.value.email
    })
    if (res.value.status == 200) {
      currentPage.value = currentPage.value + 1
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

const schema1 = yup.object({
  username: yup.string().required('กรุณากรอก ชื่อผู้ใช้').max(50),
  email: yup.string().email().required('กรุณากรอก อีเมล').max(320),
  rawPassword: yup
    .string()
    .required('กรุณาตั้งรหัสผ่าน')
    .min(8, 'อย่างน้อย 8 ตัวอักษร'),
  confirmPassword: yup
    .string()
    .required('กรุณายืนยันรหัสผ่านอีกครั้ง')
    .oneOf([yup.ref('rawPassword'), null], 'รหัสผ่านไม่ตรงกัน')
})

// ------ Multi-Form (2/2) ------
// -- datepicker : dateOfBirth --
const birthDay = ref()

// -- radio : gender --
const genders = [
  { text: 'ชาย', value: 'M' },
  { text: 'หญิง', value: 'F' },
  { text: 'ไม่ระบุ', value: null }
]

// -- radio : role --
const roles = [
  { text: 'นักศึกษา / บุลคลทั่วไป', value: 'USER' },
  { text: 'ตัวแทนบริษัท', value: 'COMPANY' }
]

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema2 = yup.object({
  firstname: yup.string().required('กรุณากรอก ชื่อจริง').max(50),
  lastname: yup.string().required('กรุณากรอก นามสกุล').max(50),
  dateOfBirth: yup.string().nullable().required('โปรดเลือก วันเกิดของคุณ'),
  phoneNumber: yup
    .string()
    .trim()
    .required('โปรดระบุ เบอร์โทร')
    .matches(phoneRegExp, 'เบอร์โทรไม่ถูกต้อง')
    .max(10)
  // role:yup.string(),
  // compName: yup
  //   .string()
  //   .max(100)
  //   .test('check null', 'โปรดระบุ ชื่อบริษัท', function (value) {
  //     if (user.value.role == 'COMPANY') {
  //       return value != null
  //     } else {
  //       return value == null
  //     }
  //   })
  // .when('role', (role, schema2) => {
  //   if (role == 'COMPANY') {
  //     return schema2.required('โปรดระบุ ชื่อบริษัท')
  //   }
  //   return schema2
  // is: 'COMPANY',
  // then: yup.string().required('โปรดระบุ ชื่อบริษัท').max(100)
  // })
})

const submitForm = async () => {
  if (birthDay.value) {
    user.value.dateOfBirth = moment(birthDay.value).format().substring(0, 10)
  }
  await register()
}

const register = async () => {
  try {
    const res = await useRegister(user.value)
    if (res.value) {
      Swal.fire({
        icon: 'success',
        title: 'Register successfully',
        text: 'การลงทะเบียนสำเร็จ',
        confirmButtonColor: 'blue'
      }).then((result) => {
        if (result.isConfirmed) {
          reloadNuxtApp({
            path: '/auth/login',
            ttl: 1000
          })
        }
      })
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
</script>

<style lang="scss" scoped></style>
