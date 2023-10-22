<template>
  <div class="grid grid-cols-4 gap-2">
    <BaseTimePicker
      label="เวลาทำงาน"
      id="time-only"
      placeholder="Select Time"
      v-model="selectedTime"
    >
    </BaseTimePicker>

    <!-- if use with validate -->
    <Form @submit="submitForm" v-slot="{ meta }" :validation-schema="schema">
      <Field v-slot="{ field, errors }" name="expireAt">
        <BaseTimePicker
          label="Time due (validate)"
          id="time-due"
          placeholder="Select time"
          v-bind="field"
          v-model="expireAt"
          required
        >
          <template v-slot:error-message> {{ errors[0] }}</template>
        </BaseTimePicker>
      </Field>
    </Form>

    <div></div>
    <div></div>

    <div>
      {{ selectedTime }}
    </div>
    <div>
      {{ expireAt }}
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'

import { Field, ErrorMessage, Form } from 'vee-validate'
import * as yup from 'yup'

// console.log(moment.locale())

// Part 1
const selectedTime = ref()

// Part 2
const expireAt = ref()
const submitForm = () => {}
const schema = yup.object({
  expireAt: yup.array().required()
})
</script>

<style lang="scss" scoped></style>
