<template>
  <BaseSectionContent :h-padding="4" :v-padding="10">
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
        placeholder=""
        v-model="data.count"
        >{{ data.count }}</BaseInput
      >

      <BaseInput
        label="เบี้ยเลี้ยง"
        id="price"
        type="number"
        placeholder=""
        v-model="data.number"
        unit="บาท/วัน"
        >{{ data.number }}</BaseInput
      >
    </Form>
  </BaseSectionContent>
</template>

<script setup>
import { MapPinIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { Field, Form, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const data = ref({
  text: '',
  required: '',
  disabled: 'แก้ไขข้อความนี้ไม่ได้',
  location: '',
  search: '',
  count: '',
  number: ''
})

const isRequired = yup.string().required()
</script>

<style lang="scss" scoped></style>
