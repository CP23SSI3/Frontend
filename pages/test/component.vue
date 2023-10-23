<template>
  <!-- <div>
    {{ selected }}
    <label class="text-base font-semibold text-gray-900">Notifications</label>
    <p class="text-sm text-gray-500">
      How do you prefer to receive notifications?
    </p>
    <fieldset class="mt-4">
      <legend class="sr-only">Notification method</legend>
      <div class="space-y-4">
        <div
          v-for="notificationMethod in notificationMethods"
          :key="notificationMethod.id"
          class="flex items-center"
        >
          <input
            :id="notificationMethod.id"
            name="notification-method"
            type="radio"
            :value="notificationMethod.id"
            v-model="selected"
            class="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-600"
          />
          <label
            :for="notificationMethod.id"
            class="block ml-3 text-sm font-medium leading-6 text-gray-900"
            >{{ notificationMethod.title }}</label
          >
        </div>
      </div>
    </fieldset>
  </div> -->
  <!-- <BaseRadio
    :label="ระยะเวลาที่เปิดรับสมัคร"
    required
    :id="test"
    :choices="notificationMethods"
    v-model="selected"
  />
  {{ selected }} -->

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
  <hr />
  <!-- Test Radio -->

  <div>
    <BaseLabel :id="radio" required>Check box </BaseLabel>
    <fieldset class="mt-4">
      <div class="space-y-4">
        <div
          v-for="choice in choices"
          :key="choice.id"
          class="flex items-center"
        >
          <input
            :id="choice.id"
            :name="choice.id"
            type="radio"
            :value="choice.id"
            v-model="selected"
            class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-600"
          />
          <label
            :for="choice.id"
            class="block ml-3 text-sm font-medium leading-6 text-gray-900"
            >{{ choice.title }}</label
          >
        </div>
      </div>
    </fieldset>
    {{ selected }}
  </div>

  <!-- Test Checkbox -->
  <div class="space-y-3">
    <div
      class="relative flex items-start"
      v-for="(item, index) in listCheckbox"
      :key="index"
    >
      <div class="flex items-center h-6">
        <input
          :id="item.value"
          :name="item.value"
          type="checkbox"
          :value="item.value"
          v-model="checkedNames"
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
        />
      </div>
      <div class="ml-3 text-sm leading-6">
        <label :for="item.value" class="font-medium text-gray-900">
          {{ item.text }}
        </label>
      </div>
    </div>
  </div>
  {{ checkedNames }}
</template>

<script setup>
// const selected = ref('email')
// const notificationMethods = [
//   { id: 'email', title: 'Email' },
//   { id: 'sms', title: 'Phone (SMS)' },
//   { id: 'push', title: 'Push notification' }
// ]

const selected = ref('choice1')
const choices = [
  { id: 'choice1', title: 'Choice 1' },
  { id: 'choice2', title: 'Choice 2' },
  { id: 'choice3', title: 'Choice 3' }
]
const label = ref('checkbox1')

const listCheckbox = [
  { text: 'Check box 1', value: 'checkbox1' },
  { text: 'Check box 2', value: 'checkbox2' },
  { text: 'Check box 3', value: 'checkbox3' }
]
const checkedNames = ref([])
</script>
