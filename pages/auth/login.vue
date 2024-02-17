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
        label="Email or Username"
        id="username"
        v-model="user.username"
        placeholder="Enter your email or username"
      >
      </BaseInputField>

      <div>
        <div class="flex justify-between">
          <BaseLabel id="password">Password</BaseLabel>
          <!-- <div class="text-sm">
            <a href="#" class="font-semibold text-blue-600 hover:text-blue-500"
              >Forgot password?</a
            >
          </div> -->
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
        to="/auth/sign-up"
        class="font-semibold leading-6 text-blue-600 hover:text-blue-500"
        >Sign Up</NuxtLink
      >
    </p>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import yup from '@/assets/yup-error.js'
import { Field, ErrorMessage, Form } from 'vee-validate'
import { useAuth } from '~/stores/auth'

const auth = useAuth()

definePageMeta({
  layout: 'register',
  middleware: ['logger']
})

const user = ref({ username: '', password: '' })
const schema = yup.object({
  username: yup.string(),
  password: yup.string().min(8, 'อย่างน้อย 8 ตัวอักษร')
})

const submitForm = async () => {
  await login()
}

const login = async () => {
  try {
    const res = await useLogin(user.value)
    auth.login(res.value)
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
</script>

<style lang="scss" scoped></style>
