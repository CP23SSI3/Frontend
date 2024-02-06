<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <NuxtLink to="/">
      <nuxt-img
        class="w-auto h-12 mx-auto"
        src="../public/InternHub-logo-light.svg"
        alt="InternHub"
    /></NuxtLink>
    <h2
      class="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900"
    >
      Sign up
    </h2>
  </div>
  <nav class="flex items-center justify-center" aria-label="Progress">
    <p class="text-sm font-medium">
      Step {{ steps.findIndex((step) => step.step === currentPage) + 1 }} of
      {{ steps.length }}
    </p>
    <div role="list" class="flex items-center ml-8 space-x-5">
      <div v-for="step in steps" :key="step.name">
        <!-- <a
          v-if="step.status === 'complete'"
          :href="step.href"
          class="block h-2.5 w-2.5 rounded-full bg-blue-600 hover:bg-blue-900"
        >
          <span class="sr-only">{{ step.name }}</span>
        </a>
        <a
          v-else-if="step.status === 'current'"
          :href="step.href"
          class="relative flex items-center justify-center"
          aria-current="step"
        >
          <span class="absolute flex w-5 h-5 p-px" aria-hidden="true">
            <span class="w-full h-full bg-blue-200 rounded-full" />
          </span>
          <span
            class="relative block h-2.5 w-2.5 rounded-full bg-blue-600"
            aria-hidden="true"
          />
          <span class="sr-only">{{ step.name }}</span>
        </a>
        <a
          v-else
          :href="step.href"
          class="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
        >
          <span class="sr-only">{{ step.name }}</span>
        </a> -->

        <div
          @click="changeStep(step.step)"
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
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <Form @submit="submitForm" :validation-schema="schema">
      <!-- Page 1 :  Personal Information-->
      <div class="space-y-6">
        <div class="flex gap-3">
          <BaseInputField
            label="ชื่อจริง"
            id="firstname"
            v-model="user.firstname"
          >
          </BaseInputField>

          <BaseInputField label="นามสกุล" id="lastname" v-model="user.lastname">
          </BaseInputField>
        </div>

        <BaseInputField
          label="Username / ชื่อผู้ใช้"
          id="username"
          v-model="user.username"
        >
        </BaseInputField>
        <BaseInputField label="Email Address" id="email" v-model="user.email">
        </BaseInputField>

        <BaseInputField
          label="Password"
          id="rawPassword"
          type="password"
          v-model="user.rawPassword"
        ></BaseInputField>
        <BaseInputField
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          v-model="user.confirmPassword"
        ></BaseInputField>

        <BaseButton
          type="button"
          outline
          full
          @click="currentPage < 4 ? currentPage++ : ''"
          >Next</BaseButton
        >
      </div>

      <BaseButton type="submit" full> Sign up </BaseButton>
    </Form>

    <p class="mt-10 text-sm text-center text-gray-500">
      Already have an account?
      {{ ' ' }}
      <NuxtLink
        to="/auth/login"
        class="font-semibold leading-6 text-blue-600 hover:text-blue-500"
        >Log in</NuxtLink
      >
    </p>
  </div>
  {{ user }}
</template>

<script setup>
import yup from '@/assets/yup-error.js'
import { Field, ErrorMessage, Form } from 'vee-validate'
definePageMeta({
  layout: 'register'
})

const user = ref({
  address: {
    area: 'ถนนประชาอุทิศ',
    city: 'กรุงเทพ',
    country: 'ประเทศไทย',
    district: 'บางรัก',
    latitude: '13.7271846',
    longitude: '100.5141211',
    postalCode: '10500',
    subDistrict: 'บางมด'
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

const schema = yup.object({
  username: yup.string().required('กรุณากรอก ชื่อผู้ใช้'),
  firstname: yup.string().required('กรุณากรอก ชื่อจริง'),
  lastname: yup.string().required('กรุณากรอก นามสกุล'),
  email: yup.string().email().required('กรุณากรอก อีเมล').max(320),
  rawPassword: yup
    .string()
    .required('กรุณาตั้งรหัสผ่าน')
    .min(8, 'อย่างน้อย 8 ตัวอักษร'),
  confirmPassword: yup
    .string()
    .required('กรุณายืนยันรหัสผ่านอีกครั้ง')
    .oneOf([yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน')
})

const submitForm = () => {}

const changeStep = (stepNum) => {
  currentPage.value = stepNum
}

const steps = [
  { name: 'Step 1', step: 1 },
  { name: 'Step 2', step: 2 },
  { name: 'Step 3', step: 3 },
  { name: 'Step 4', step: 4 }
]
const currentPage = ref(1)
</script>

<style lang="scss" scoped></style>
