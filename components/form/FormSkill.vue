<template>
  <Form
    @submit="$emit('submit')"
    v-slot="{ meta, values, errors }"
    :validation-schema="schemaSkill"
  >
    <div
      class="grid items-start grid-cols-1 px-6 py-4 mt-1 rounded-md gap-x-3 gap-y-4 sm:grid-cols-4 bg-blue-50"
    >
      <BaseTitleForm class="text-center col-span-full">
        {{ editmode ? 'Edit Skill' : 'Add Skill' }}
      </BaseTitleForm>
      <BaseInputField
        class="sm:col-span-4"
        label="Skill Name"
        id="skillName"
        v-model="skill.skillName"
        required
      ></BaseInputField>

      <BaseTextarea
        label="Description"
        id="skillDesc"
        nametag="skillDescription"
        required
        :rows="10"
        v-model="skill.skillDesc"
      ></BaseTextarea>
      <div class="flex flex-row-reverse gap-3 sm:col-span-full">
        <BaseButton :leadingIcon="CheckIcon" type="submit">
          {{ editmode ? 'Save' : 'Add' }}
        </BaseButton>
        <BaseButton negative @click="$emit('cancel')" type="button">
          Cancel
        </BaseButton>
      </div>
    </div>
  </Form>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/solid'
import { Form } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps({
  skill: {
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
})
defineEmits(['submit', 'cancel'])

const schemaSkill = yup.object({
  skillName: yup.string().required().max(100),
  skillDesc: yup.string().required().max(1500)
})
</script>

<style lang="scss" scoped>
.searchselect-blue {
  --ms-option-bg-selected: #2563eb;
  --ms-option-bg-selected-pointed: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
  --ms-spinner-color: #60a5fa;
}
</style>
