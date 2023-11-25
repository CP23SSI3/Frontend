<template>
  <div
    class="grid items-start grid-cols-1 px-6 py-4 mt-1 rounded-md gap-x-3 gap-y-4 sm:grid-cols-6 bg-blue-50"
  >
    <BaseTitleForm class="text-center col-span-full">
      {{ editmode ? 'แก้ไขตำแหน่งงาน' : 'เพิ่มตำแหน่งงาน' }}
    </BaseTitleForm>
    <BaseInputField
      class="sm:col-span-4"
      label="ชื่อตำแหน่งงาน"
      id="openPositionTitle"
      v-model="position.openPositionTitle"
      required
    ></BaseInputField>
    <!-- <div class="sm:col-span-6">
      <BaseLabel id="position-title" required> ชื่อตำแหน่งงาน </BaseLabel>
      <Multiselect
        v-model="position.title"
        for="position-title"
        placeholder=""
        noOptionsText="..."
        :create-option="true"
        :delay="1"
        :filter-results="false"
        :min-chars="1"
        :searchable="true"
        :resolve-on-load="false"
        class="searchselect-blue"
        :options="
          (query) => searchPositionName(query) // check JS block for implementation
        "
      />
    </div> -->

    <BaseInputField
      class="sm:col-span-6"
      label="คำอธิบาย"
      id="openPositionDesc"
      v-model="position.openPositionDesc"
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
    ></BaseInputField>
    <BaseInputField
      class="sm:col-span-2"
      :icon="CurrencyDollarIcon"
      label="ค่าตอบแทน"
      id="salary"
      v-model="position.salary"
      type="number"
      unit="บาท/วัน"
    ></BaseInputField>
    <BaseInputField
      class="sm:col-span-2"
      :icon="UsersIcon"
      label="จำนวนที่เปิดรับ"
      id="openPositionNum"
      v-model="position.openPositionNum"
      type="number"
      unit="คน"
    ></BaseInputField>
    <div class="flex flex-row-reverse gap-3 sm:col-span-6">
      <BaseButton
        :leadingIcon="CheckIcon"
        @click="$emit('submit')"
        :disabled="statusButton"
      >
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
  },
  statusButton: {
    type: Boolean,
    default: false
  }
  // listPositionTag: {
  //   type: Array,
  //   required: true
  // }
})
defineEmits(['submit', 'cancel'])

// const searchPositionName = async (query) => {
//   let result = props.listPositionTag.filter((item) => {
//     return item.toLowerCase().includes(query.toLowerCase())
//   })
//   return result
// }
</script>

<style lang="scss" scoped>
.searchselect-blue {
  --ms-option-bg-selected: #2563eb;
  --ms-option-bg-selected-pointed: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
  --ms-spinner-color: #60a5fa;
}
</style>
