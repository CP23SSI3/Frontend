<template>
  <table class="min-w-full divide-y divide-gray-300">
    <thead>
      <tr class="divide-x divide-gray-200">
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
    <tbody class="divide-y divide-gray-200">
      <tr class="divide-x divide-gray-200">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseTitle
        </td>
        <td class="p-4 text-sm">
          <BaseTitle>Topic 1</BaseTitle>
        </td>
      </tr>
      <tr class="divide-x divide-gray-200">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseTitleForm
        </td>
        <td class="p-4 text-sm">
          <BaseTitleForm>Topic in Form</BaseTitleForm>
        </td>
      </tr>
      <tr class="divide-x divide-gray-200">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseButton
        </td>
        <td class="p-4 text-s">
          <TestBaseButton />
        </td>
      </tr>
      <tr class="divide-x divide-gray-200">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseInput
        </td>
        <td class="p-4 text-sm text-gray-500">
          <TestBaseInput />
        </td>
      </tr>
      <tr class="divide-x divide-gray-200">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseSectionContent
        </td>
        <td class="p-4 text-sm text-gray-500">
          <BaseSectionContent :h-padding="6" :v-padding="4">
            Content...
          </BaseSectionContent>
        </td>
      </tr>
      <tr class="divide-x divide-gray-200">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseDropdown
        </td>
        <td class="p-4 text-sm text-gray-500">
          <TestBaseDropdown />
        </td>
      </tr>
      <tr class="divide-x divide-gray-200">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseDatePicker
        </td>
        <td class="p-4 text-sm text-gray-500">
          <TestBaseDatePicker />
        </td>
      </tr>
      <tr class="divide-x divide-gray-200">
        <td class="py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
          BaseTimePicker
        </td>
        <td class="p-4 text-sm text-gray-500">
          <TestBaseTimePicker />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup></script>

<style lang="scss" scoped></style>
