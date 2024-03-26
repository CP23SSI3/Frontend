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
      {{
        currentPage == 0
          ? 'Create your account'
          : `Create your account as ${user.role.toLowerCase()}`
      }}
    </h2>
    <p class="mt-2 text-sm leading-6 text-center text-gray-500">
      {{
        currentPage == 0 ? 'Select your role' : 'Enter your details to register'
      }}
    </p>
  </div>
  <div v-if="currentPage == 0">
    <div class="py-6">
      <div
        class="grid max-w-md grid-cols-1 gap-8 mx-auto isolate md:max-w-xl md:grid-cols-2 lg:max-w-4xl"
      >
        <div
          v-for="role in roles"
          :key="role.id"
          :class="[
            user.role == role.value
              ? 'ring-2 ring-blue-600'
              : 'ring-1 ring-gray-200',
            'rounded-3xl p-8 bg-white'
          ]"
          @click="selectRole(role.value)"
        >
          <component
            :is="role.icon"
            class="w-20 h-20 mx-auto my-10 text-gray-400"
            aria-hidden="true"
          />
          <p class="flex items-baseline justify-center mt-6 gap-x-1">
            <span
              :class="[
                user.role == role.value ? 'text-blue-600' : 'text-gray-900',
                'text-4xl font-bold tracking-tight'
              ]"
              >{{ role.title }}
            </span>
            <span class="text-sm font-semibold leading-6 text-gray-600">{{
              role.description
            }}</span>
          </p>
          <BaseButton
            :aria-describedby="role.id"
            full
            class="block px-3 py-2 mt-6"
            :secondary="user.role != role.value"
            @click="applyThisRole(role.value)"
          >
            Apply
          </BaseButton>
          <ul
            role="list"
            class="mt-8 space-y-3 text-sm leading-6 text-gray-600"
          >
            <li
              v-for="feature in role.features"
              :key="feature"
              class="flex gap-x-3"
            >
              <CheckIcon
                class="flex-none w-5 h-6 text-blue-600"
                aria-hidden="true"
              />
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="space-y-5">
      <!-- Page 1 :  Account -->
      <Form
        @submit="next1"
        :validation-schema="schema1"
        class="space-y-4"
        v-if="currentPage == 1"
      >
        <BaseInputField
          label="Username"
          id="username"
          v-model="user.username"
          @focus="resetErrorMessageCheckUsernameEmail('username')"
        /><span
          :class="[
            errorMessageCheckUsername ? '' : 'hidden',
            'pl-2 text-xs text-red-500'
          ]"
          >{{ errorMessageCheckUsername }}</span
        >
        <BaseInputField
          label="Email Address"
          id="email"
          v-model="user.email"
          @focus="resetErrorMessageCheckUsernameEmail('email')"
        /><span
          :class="[
            errorMessageCheckEmail ? '' : 'hidden',
            'pl-2 text-xs text-red-500'
          ]"
          >{{ errorMessageCheckEmail }}</span
        >
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
          <div class="flex gap-3 mt-8">
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
      <!-- Page 2 :  Personal Information -->
      <Form
        @submit="submitForm"
        :validation-schema="schema2"
        v-slot="{ meta, errors }"
        class="space-y-4"
        v-else-if="currentPage == 2"
      >
        <div class="flex justify-center gap-3 full">
          <BaseInputField
            label="First name"
            id="firstname"
            v-model="user.firstname"
          />
          <BaseInputField
            label="Last name"
            id="lastname"
            v-model="user.lastname"
          />
        </div>
        <Field v-slot="{ field, errors }" name="dateOfBirth">
          <BaseDatePicker
            label="Date of birth"
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
          <BaseLabel id="gender">Gender</BaseLabel>

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
                  :id="choice.text"
                  :name="choice.text"
                  type="radio"
                  :value="choice.value"
                  v-model="user.gender"
                  class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-600"
                />
                <BaseLabel :id="choice.text" class="ml-3" :for="choice.text">
                  {{ choice.text }}
                </BaseLabel>
              </div>
            </div>
          </fieldset>
        </div>
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
              v-if="user.role == 'COMPANY'"
              >Next</BaseButton
            >
            <BaseButton type="submit" full v-else> Sign up </BaseButton>
          </div>
        </div>
      </Form>
      <!-- Page 3 :  Company Information -->
      <Form
        @submit="submitForm"
        :validation-schema="schema3"
        class="space-y-4"
        v-if="currentPage == 3"
      >
        <BaseInputField
          label="Your company name"
          id="compName"
          v-model="user.company.compName"
        />

        <!-- <BaseInputField
          label="Company logo link"
          id="compLogoKey"
          v-model="user.company.compLogoKey"
          @input="checkImage()"
          placeholder="Paste copy image address"
        />

        <div v-if="imageVisible">
          <BaseLabel id="preview-logo">Preview Logo</BaseLabel>
          <div
            class="flex justify-center p-2 mt-2 border border-dashed rounded-lg border-gray-900/25"
          >
            <img
              :src="user.compLogoKey"
              alt="Image preview"
              class="w-20 h-20 mx-auto rounded-md shadow-md lg:w-40 lg:h-40 lg:rounded-xl bg-gray-50"
            />
          </div>
        </div>

        <div v-else>
          <BaseLabel id="preview-logo">Preview Logo</BaseLabel>
          <div
            class="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25"
          >
            <div class="text-center">
              <PhotoIcon
                class="w-12 h-12 mx-auto text-gray-300"
                aria-hidden="true"
              />
              <div class="flex mt-4 text-sm leading-6 text-gray-600">
                <p class="pl-1">Your image link is not available</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">
                Please enter the image link again.
              </p>
            </div>
          </div>
        </div> -->

        <div>
          <div class="flex gap-3 mt-8">
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
</template>

<script setup>
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
  UserIcon,
  BuildingOffice2Icon,
  PhotoIcon
} from '@heroicons/vue/20/solid'

import { Field, ErrorMessage, Form } from 'vee-validate'
import moment from 'moment'
import Swal from 'sweetalert2'
import yup from '@/assets/yup-error.js'

definePageMeta({
  layout: 'register',
  middleware: ['logger']
})

const router = useRouter()

const user = ref({
  // (1/3)
  username: '',
  email: '',
  rawPassword: '',
  confirmPassword: '',
  // (2/3)
  firstname: '',
  lastname: '',
  dateOfBirth: '', //birthDay --> 2002-02-20
  phoneNumber: '',
  gender: null,
  role: 'USER',
  address: null,
  // (3/3) for company only
  company: {
    compName: '',
    compLogoKey: '/logo-image.jpg'
  }
  // company: null
})

// --- Pagination (Multiform) ---
// const steps = [
//   { name: 'Step 1', step: 1 },
//   { name: 'Step 2', step: 2 },
//   { name: 'Step 3', step: 3 }
// ]

const currentPage = ref(0)

// --- Select role ---
const roles = [
  {
    title: 'User',
    id: 'role-user',
    icon: UserIcon,
    value: 'USER',
    price: { monthly: '$30', annually: '$288' },
    description: 'For student',
    features: ['Find internship program', 'Compare position', 'Create resume']
  },
  {
    title: 'Company',
    id: 'role-company',
    icon: BuildingOffice2Icon,
    value: 'COMPANY',
    subTitle: 'For student',
    description: '',
    features: [
      'Create internship post',
      'Better reach',
      "Visit student's profile"
    ]
  }
]

const selectRole = (role) => {
  user.value.role = role
}
const applyThisRole = (selectedRole) => {
  user.value.role = selectedRole
  currentPage.value++
}

// ------ Multi-Form (1/2) ------
const next1 = () => {
  checkUser()
}

const errorMessageCheckUsername = ref()
const errorMessageCheckEmail = ref()

const resetErrorMessageCheckUsernameEmail = (fieldname) => {
  if (fieldname == 'username') {
    errorMessageCheckUsername.value = ''
  } else if (fieldname == 'email') {
    errorMessageCheckEmail.value = ''
  }
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
    const sentences = error.message.match(/[^.!?]+[.!?]+/g)
    if (sentences) {
      if (sentences.length > 1) {
        errorMessageCheckUsername.value = sentences[0]
        errorMessageCheckEmail.value = sentences[1]
      } else if (sentences.length == 1) {
        if (sentences[0].includes('email')) {
          errorMessageCheckEmail.value = sentences[0]
        } else if (sentences[0].includes('username')) {
          errorMessageCheckUsername.value = sentences[0]
        }
      }
    }
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

// ------ Multi-Form (2/3) ------
// -- datepicker : dateOfBirth --
const birthDay = ref()

// -- radio : gender --
const genders = [
  { text: 'Male', value: 'M' },
  { text: 'Female', value: 'F' },
  { text: 'Other', value: null }
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
})

// ------ Multi-Form (3/3) for company ------
const schema3 = yup.object({
  compName: yup.string().required('กรุณากรอก ชื่อบริษัทของคุณ').max(50)
  // compLogoKey: yup.string().required('Please, Paste image address').max(5000)
})

const submitForm = async () => {
  if (birthDay.value) {
    user.value.dateOfBirth = moment(birthDay.value).format().substring(0, 10)
  }
  if (currentPage.value == 2 && user.value.role == 'COMPANY') {
    currentPage.value++
  } else {
    if (user.value.role == 'USER') {
      user.value.company = null
    }
    // console.log('register')
    await register()
  }
}

const imageVisible = ref(false)

const checkImage = () => {
  imageVisible.value = false // Initially hide the image
  const img = new Image()
  img.onload = () => {
    imageVisible.value = true // Show the image if it loads successfully
  }
  img.onerror = () => {
    imageVisible.value = false // Hide the image if loading fails
  }
  img.src = user.value.compLogoKey // Attempt to load the image
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
          router.push({ path: '/auth/login' })
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
