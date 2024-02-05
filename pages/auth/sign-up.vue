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

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <Form @submit="submitForm" :validation-schema="schema" class="space-y-6">
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
        id="password"
        type="password"
        v-model="user.password"
      ></BaseInputField>
      <BaseInputField
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        v-model="user.confirmPassword"
      ></BaseInputField>

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
</template>

<script setup>
import yup from '@/assets/yup-error.js'
import { Field, ErrorMessage, Form } from 'vee-validate'
definePageMeta({
  layout: 'register'
})

const user = ref({
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const schema = yup.object({
  username: yup.string().required('กรุณากรอก ชื่อผู้ใช้'),
  firstname: yup.string().required('กรุณากรอก ชื่อจริง'),
  lastname: yup.string().required('กรุณากรอก นามสกุล'),
  email: yup.string().email().required('กรุณากรอก อีเมล').max(320),
  password: yup
    .string()
    .required('กรุณาตั้งรหัสผ่าน')
    .min(8, 'อย่างน้อย 8 ตัวอักษร'),
  confirmPassword: yup
    .string()
    .required('กรุณายืนยันรหัสผ่านอีกครั้ง')
    .oneOf([yup.ref('password'), null], 'รหัสผ่านไม่ตรงกัน')
})
</script>

<style lang="scss" scoped></style>
