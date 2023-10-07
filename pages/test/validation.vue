<template>
  <div>
    <Form class="flex flex-col gap-2 p-4 border-2 border-black rounded-lg">
      <label for="name">Name</label>
      <Field name="name" :rules="isRequired" />
      <ErrorMessage name="name" />

      <label for="email">Email</label>
      <Field name="email" :rules="emailRules" />
      <ErrorMessage name="email" />

      <label for="password">Password</label>
      <Field name="password" type="password" :rules="passwordRules" />
      <ErrorMessage name="password" />
    </Form>
  </div>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

function isRequired(value) {
  if (value && value.trim()) {
    return true
  }
  return 'This is required'
}

const emailRules = yup.string().required().email()
const passwordRules = yup.string().required().min(8).max(14)
</script>

<style></style>
