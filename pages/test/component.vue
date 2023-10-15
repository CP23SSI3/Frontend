<template>
  <div class="space-y-5">
    <div class="relative flex items-start">
      <div class="flex items-center h-6">
        <input
          id="comments"
          aria-describedby="comments-description"
          name="comments"
          type="checkbox"
          class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
        />
      </div>
      <div class="ml-3 text-sm leading-6">
        <label for="comments" class="font-medium text-gray-900">Comments</label>
        <p id="comments-description" class="text-gray-500">
          Get notified when someones posts a comment on a posting.
        </p>
      </div>
    </div>
    <div class="relative flex items-start">
      <div class="flex items-center h-6">
        <input
          id="candidates"
          aria-describedby="candidates-description"
          name="candidates"
          type="checkbox"
          class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
        />
      </div>
      <div class="ml-3 text-sm leading-6">
        <label for="candidates" class="font-medium text-gray-900"
          >Candidates</label
        >
        <p id="candidates-description" class="text-gray-500">
          Get notified when a candidate applies for a job.
        </p>
      </div>
    </div>
    <div class="relative flex items-start">
      <div class="flex items-center h-6">
        <input
          id="offers"
          aria-describedby="offers-description"
          name="offers"
          type="checkbox"
          class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
        />
      </div>
      <div class="ml-3 text-sm leading-6">
        <label for="offers" class="font-medium text-gray-900">Offers</label>
        <p id="offers-description" class="text-gray-500">
          Get notified when a candidate accepts or rejects an offer.
        </p>
      </div>
    </div>
  </div>
  <br />
  <br />
  <br />
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

  <br />
  <br />
  <BaseCheckbox :items="listDocument" v-model="checkedDoc" />
  {{ checkedDoc }}
</template>

<script setup>
const label = ref('checkbox1')

const listCheckbox = [
  { text: 'Check box 1', value: 'checkbox1' },
  { text: 'Check box 2', value: 'checkbox2' },
  { text: 'Check box 3', value: 'checkbox3' }
]
const checkedNames = ref([])

const listDocument = [
  { text: 'Resume', value: 'resume' },
  { text: 'CV', value: 'cv' },
  { text: 'Portfolio', value: 'portfolio' }
]
const checkedDoc = ref([])
</script>

<style lang="scss" scoped></style>
