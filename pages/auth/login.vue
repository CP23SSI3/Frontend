<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <NuxtLink href="/">
      <nuxt-img
        class="w-auto h-12 mx-auto"
        src="../public/InternHub-logo-light.svg"
        alt="InternHub"
    /></NuxtLink>
    <h2
      class="mt-6 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900"
    >
      Sign in to your account
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <Form @submit="submitForm" :validation-schema="schema" class="space-y-6">
      <BaseInputField
        label="Email Address"
        id="email"
        v-model="user.email"
        placeholder="Enter your email"
      >
      </BaseInputField>

      <div>
        <div class="flex justify-between">
          <BaseLabel id="password">Password</BaseLabel>
          <div class="text-sm">
            <a href="#" class="font-semibold text-blue-600 hover:text-blue-500"
              >Forgot password?</a
            >
          </div>
        </div>
        <BaseInputField
          id="password"
          type="password"
          v-model="user.password"
          placeholder="Enter your password"
        ></BaseInputField>
      </div>

      <BaseButton type="submit" full> Sign in </BaseButton>
    </Form>

    <p class="mt-10 text-sm text-center text-gray-500">
      Don't have an account?
      {{ ' ' }}
      <NuxtLink
        href="/sign-up"
        class="font-semibold leading-6 text-blue-600 hover:text-blue-500"
        >Sign Up</NuxtLink
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

const user = ref({ email: '', password: '' })
const schema = yup.object({
  email: yup.string().email().required('โปรดระบุ อีเมล').max(320),
  password: yup.string().required('กรุณาใส่รหัสผ่านให้ถูกต้อง')
})
</script>

<style lang="scss" scoped></style>
