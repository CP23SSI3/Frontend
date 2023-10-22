<template>
  <Form @submit="submitForm" v-slot="{ meta }" :validation-schema="schema">
    <BaseInput
      label="Name"
      id="name"
      type="text"
      required
      v-model="user.name"
    ></BaseInput>
    <BaseInput
      label="Email"
      id="email"
      type="email"
      required
      v-model="user.email"
    ></BaseInput>
    <BaseInput
      label="Password"
      id="password"
      type="password"
      required
      v-model="user.password"
    ></BaseInput>

    <BaseButton type="submit" :disabled="!meta.dirty || !meta.valid"
      >Submit</BaseButton
    >
    {{ user }}
  </Form>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const user = ref({
  name: '',
  email: '',
  password: ''
})

const submitForm = () => {}

const schema = yup.object({
  name: yup.string().trim().required(),
  email: yup.string().email().trim().required(),
  password: yup.string().trim().required()
})
</script>

<style lang="scss" scoped></style>
