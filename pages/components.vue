<template>
  <table class="min-w-full divide-y divide-gray-400">
    <thead>
      <tr class="divide-x divide-gray-400">
        <th
          scope="col"
          class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
        >
          Component Name
        </th>
        <th
          scope="col"
          class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Example
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-400">
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseTitle
        </td>
        <td class="p-4 text-sm">
          <BaseTitle>Topic 1</BaseTitle>
        </td>
      </tr>
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseTitleForm
        </td>
        <td class="p-4 text-sm">
          <BaseTitleForm>Topic in Form</BaseTitleForm>
        </td>
      </tr>
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseButton
        </td>
        <td class="p-4 text-s">
          <TestBaseButton />
        </td>
      </tr>
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseLabel
        </td>
        <td class="p-4 text-s">
          <BaseLabel
            :id="labelIcon"
            :icon="MusicalNoteIcon"
            :required="required"
          >
            label
          </BaseLabel>
        </td>
      </tr>
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseInput
        </td>
        <td class="p-4 text-sm text-gray-500">
          <TestBaseInput />
        </td>
      </tr>
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseInputGroup
        </td>
        <td class="grid grid-cols-4 gap-4 p-4 text-sm text-gray-500">
          <BaseInputGroup
            label="ระยะเวลาที่ทำงาน"
            id="price"
            type="number"
            v-model:amount="data.workMonth.amount"
            v-model:unit="data.workMonth.unit"
            unitSelect
            >{{ data.workMonth }}</BaseInputGroup
          >
        </td>
      </tr>
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseSectionContent
        </td>
        <td class="p-4 text-sm text-gray-500">
          <BaseSectionContent class="px-6 py-4">
            Content...
          </BaseSectionContent>
        </td>
      </tr>
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseDropdown
        </td>
        <td class="p-4 text-sm text-gray-500 whitespace-nowrap">
          <TestBaseDropdown />
        </td>
      </tr>
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseDatePicker
        </td>
        <td class="p-4 text-sm text-gray-500">
          <TestBaseDatePicker />
        </td>
      </tr>
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseTimePicker
        </td>
        <td class="p-4 text-sm text-gray-500">
          <TestBaseTimePicker />
        </td>
      </tr>
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseBadge
        </td>
        <td class="p-4 text-sm text-gray-500">
          <BaseSectionContent class="px-6 py-4">
            <div class="flex gap-2">
              <BaseBadge color="green">เปิดรับตลอด</BaseBadge>
              <BaseBadge>ปิดรับสมัคร 19/09/2023</BaseBadge>
              <BaseBadge color="red">ปิดรับสมัคร 19/09/2023</BaseBadge>
              <BaseBadge color="yellow">ปิดรับสมัคร 19/09/2023</BaseBadge>
            </div>
          </BaseSectionContent>
        </td>
      </tr>
      <tr class="divide-x divide-gray-400">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseItem
        </td>
        <td class="p-4 text-sm text-gray-500">
          <TestBaseItem></TestBaseItem>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { MusicalNoteIcon } from '@heroicons/vue/20/solid'
const data = ref({
  workMonth: { amount: null, unit: 'เดือน' }
})
</script>

<style lang="scss" scoped></style>
