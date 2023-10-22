<template>
  <div>
    <BaseLabel :id="radio" required> สถานที่ฝึกงาน </BaseLabel>
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
            class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
          />
          <label
            :for="choice.id"
            class="ml-3 block text-sm font-medium leading-6 text-gray-900"
            >{{ choice.title }}</label
          >
        </div>
      </div>
    </fieldset>
    {{ selected }}
  </div>
</template>

<script setup>
const selected = ref('choice1')
const choices = [
  { id: 'choice1', title: 'Choice 1' },
  { id: 'choice2', title: 'Choice 2' },
  { id: 'choice3', title: 'Choice 3' }
]
</script>
