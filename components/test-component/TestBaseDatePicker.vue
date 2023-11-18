<template>
  <div class="grid grid-cols-4 gap-2">
    <BaseDatePicker
      label="Default DateTime"
      id="expire"
      placeholder="Select Date"
      v-model="selectedDateTime"
    >
    </BaseDatePicker>

    <BaseDatePicker
      label="Date Only"
      id="date-only"
      placeholder="Select Date"
      :enable-time-picker="false"
      v-model="selectedDate"
    >
    </BaseDatePicker>

    <BaseDatePicker
      label="Date Custom Format"
      id="date-only"
      placeholder="Select Date"
      :enable-time-picker="false"
      v-model="selectedDateCustom"
      :format="myFormat"
    >
    </BaseDatePicker>

    <!-- if use with validate -->
    <Form @submit="submitForm" v-slot="{ meta }" :validation-schema="schema">
      <Field v-slot="{ field, errors }" name="expireAt">
        <BaseDatePicker
          label="Expire date (validate)"
          id="expireAt"
          placeholder="Select Date"
          v-bind="field"
          v-model="expireAt"
          :enable-time-picker="false"
          :min-date="new Date()"
          fixed-start
          required
        >
          <template v-slot:error-message> {{ errors[0] }}</template>
        </BaseDatePicker>
      </Field></Form
    >
    <div>
      {{ selectedDateTime }}
    </div>
    <div>
      {{ selectedDate ? moment(selectedDate).format('DD MMM YYYY') : '' }}
    </div>
    <div>
      {{
        selectedDateCustom
          ? moment(selectedDateCustom).format('DD MMM YYYY')
          : ''
      }}
    </div>
    <div>
      {{ expireAt ? moment(expireAt).format('DD MMM YYYY') : '' }}
    </div>
  </div>
</template>

<script setup>
import moment from 'moment'

import { Field, ErrorMessage, Form } from 'vee-validate'
import * as yup from 'yup'

const selectedDateTime = ref()
const selectedDate = ref()
const selectedDateCustom = ref()
const expireAt = ref()

const myFormat = (date) => {
  return moment(date).format('DD/MM/YYYY')
}

const submitForm = () => {}

const schema = yup.object({
  expireAt: yup.date().min(new Date()).required()
})
</script>

<style lang="scss" scoped></style>
