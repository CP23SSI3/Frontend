<template>
  <div
    class="grid items-end grid-cols-1 px-6 py-4 mt-1 rounded-md gap-x-3 gap-y-4 sm:grid-cols-6 bg-blue-50"
  >
    <BaseTitleForm class="text-center col-span-full">
      {{ editmode ? 'แก้ไขตำแหน่งงาน' : 'เพิ่มตำแหน่งงาน' }}
    </BaseTitleForm>
    <BaseInputField
      class="sm:col-span-4"
      label="ชื่อตำแหน่งงาน"
      id="title"
      v-model="position.title"
      required
    ></BaseInputField>

    <BaseInputField
      class="sm:col-span-6"
      label="คำอธิบาย"
      id="desc"
      v-model="position.desc"
      required
    ></BaseInputField>
    <BaseInputField
      class="sm:col-span-2"
      :icon="BriefcaseIcon"
      label="ระยะเวลาการฝึกงาน"
      id="workMounth"
      v-model="position.workMonth"
      type="number"
      unit="เดือน"
      required
    ></BaseInputField>
    <BaseInputField
      class="sm:col-span-2"
      :icon="CurrencyDollarIcon"
      label="ค่าตอบแทน"
      id="salary"
      v-model="position.salary"
      type="number"
      unit="บาท/วัน"
      required
    ></BaseInputField>
    <BaseInputField
      class="sm:col-span-2"
      :icon="UsersIcon"
      label="จำนวนที่เปิดรับ"
      id="num"
      v-model="position.num"
      type="number"
      unit="คน"
      required
    ></BaseInputField>
    <div class="flex flex-row-reverse gap-3 sm:col-span-6">
      <BaseButton :leadingIcon="CheckIcon" @click="$emit('submit')">
        {{ editmode ? 'บันทึกการแก้ไข' : 'เพิ่มตำแหน่งงาน' }}
      </BaseButton>
      <BaseButton negative @click="$emit('cancel', position)">
        ยกเลิก</BaseButton
      >
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'
import {
  BriefcaseIcon,
  CurrencyDollarIcon,
  UsersIcon
} from '@heroicons/vue/24/outline'
const props = defineProps({
  position: {
    type: Object,
    required: true
  },
  editmode: {
    type: Boolean,
    default: false
  }
})
defineEmits(['submit', 'cancel'])
</script>

<style lang="scss" scoped></style>
