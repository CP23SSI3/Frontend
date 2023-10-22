<template>
  <Form class="grid grid-cols-4 gap-4">
    <BaseInput
      label="Default"
      id="default"
      placeholder="text placeholder"
      v-model="data.text"
      >{{ data.text }}</BaseInput
    >

    <BaseInput
      label="Required"
      id="required"
      required
      v-model="data.required"
      :rules="isRequired"
      >{{ data.required }}</BaseInput
    >

    <BaseInput
      label="Disabled"
      id="disabled"
      disabled
      v-model="data.disabled"
      >{{ data.disabled }}</BaseInput
    >

    <BaseInput
      label="สถานที่ฝึกงาน"
      id="location"
      :icon="MapPinIcon"
      required
      placeholder="ชื่อจังหวัด / แขวง / เขต"
      v-model="data.location"
      >{{ data.location }}</BaseInput
    >

    <BaseInput
      label="Search"
      id="search"
      placeholder="search by name"
      :iconInput="MagnifyingGlassIcon"
      v-model="data.search"
      >{{ data.search }}</BaseInput
    >
    <BaseInput
      label="จำนวนที่เปิดรับ"
      id="count"
      type="number"
      v-model="data.count"
      >{{ data.count }}</BaseInput
    >

    <BaseInput
      label="เบี้ยเลี้ยง"
      id="price"
      type="number"
      v-model="data.number"
      unit="บาท/วัน"
      >{{ data.number }}</BaseInput
    >

    <BaseInput label="Phone" id="phone" type="tel" v-model="data.phone">{{
      data.phone
    }}</BaseInput>
  </Form>
</template>

<script setup>
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const data = ref({
  text: '',
  required: '',
  disabled: 'ข้อความนี้ แก้ไขไม่ได้',
  location: '',
  search: '',
  count: '',
  number: '',
  phone: ''
})

const isRequired = yup.string().required()
</script>

<style lang="scss" scoped></style>
