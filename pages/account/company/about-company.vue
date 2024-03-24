<template>
  <BaseLoading v-if="!myUser"></BaseLoading>
  <div v-else-if="myUser != null" class="w-auto space-y-6"></div>
  <BaseSectionContent class="w-full">
    <Form
      @submit="submitForm"
      v-slot="{ meta, values, errors }"
      :validation-schema="schema"
    >
      <div>
        <div class="flex items-center justify-between px-4 py-5 sm:px-10">
          <BaseTitleForm>Company Information</BaseTitleForm>
        </div>
        <BaseLine />
        <div class="grid items-start gap-6 px-4 py-8 sm:grid-cols-4 sm:px-10">
          <BaseInputField
            label="Company name"
            id="compName"
            class="sm:col-span-2"
            required
            v-model="form.compName"
          />
          <BaseInputField
            :icon="LinkIcon"
            label="Website"
            id="compUrl"
            class="sm:col-span-2"
            v-model="form.compUrl"
          />
          <BaseTextarea
            label="Description"
            id="compDesc"
            nametag="compDesc"
            :rows="10"
            v-model="form.compDesc"
          ></BaseTextarea>

          <!-- <BaseTextarea
          label="Basic Welfare"
          id="defaultWelfare"
          nametag="defaultWelfare"
          :rows="10"
          v-model="form.defaultWelfare"
        ></BaseTextarea> -->
          <div class="col-span-full">
            <BaseLabel id="defaultWelfare">Basic Welfare</BaseLabel>
            <div class="mt-1">
              <ClientOnly>
                <quill-editor
                  content-type="html"
                  theme="snow"
                  :toolbar="quillToolbar"
                  class="h-full"
                  v-model:content="form.defaultWelfare"
                  style="
                    height: 150px;
                    border-bottom-right-radius: 0.375rem;
                    border-bottom-left-radius: 0.375rem;
                  "
                />
              </ClientOnly>
              <div class="pl-2 text-xs text-red-500">
                {{ checkTextOnly(form.defaultWelfare, 'Basic Welfare') }}
              </div>
            </div>
          </div>
          <!-- <BaseLineTopic class="col-start-1 col-span-full">Contact</BaseLineTopic> -->
          <BaseLineTopic class="col-start-1 col-span-full"
            >Address</BaseLineTopic
          >
          <div class="grid items-start gap-6 col-span-full sm:grid-cols-3">
            <BaseInputField
              label="ที่อยู่ปัจจุบัน"
              id="area"
              class="sm:col-start-1 sm:col-span-2"
              v-model="form.address.area"
            >
            </BaseInputField>

            <BaseDropdown
              class="relative z-40"
              :option-lists="provinceList"
              label="จังหวัด"
              v-model="form.selectedAddress.province"
              @click="getAmphure(form.selectedAddress.province.id)"
            />
            <BaseDropdown
              class="relative z-30"
              :option-lists="amphureList"
              label="เขต"
              v-model="form.selectedAddress.amphure"
              :disabled="!(amphureList.length > 0)"
              @click="
                getTambon(
                  form.selectedAddress.province.id,
                  form.selectedAddress.amphure.id
                )
              "
            />
            <BaseDropdown
              class="relative z-20"
              :option-lists="tambonList"
              label="แขวง"
              v-model="form.selectedAddress.tambon"
              :disabled="!(tambonList.length > 0)"
            />
            <BaseInput
              label="รหัสไปรณีย์"
              id="postalCode"
              v-model="form.selectedAddress.tambon.zip_code"
              disabled
            ></BaseInput>
          </div>
        </div>
      </div>
      <BaseLine />
      <div class="flex items-center justify-between gap-3 px-4 py-5 sm:px-10">
        <NuxtLink
          :to="{ path: `/internship/company/${myUser.company.compId}` }"
        >
          <BaseButton :leading-icon="EyeIcon" type="button" secondary>
            View Profile
          </BaseButton>
        </NuxtLink>
        <BaseButton :leading-icon="ArrowDownTrayIcon" type="sumbit"
          >Save</BaseButton
        >
      </div>
    </Form>
  </BaseSectionContent>
</template>

<script setup>
import { ArrowDownTrayIcon, EyeIcon } from '@heroicons/vue/24/outline'
import { LinkIcon } from '@heroicons/vue/20/solid'
import { Field, ErrorMessage, Form } from 'vee-validate'
import yup from '@/assets/yup-error.js'
import Swal from 'sweetalert2'

const props = defineProps({
  myUser: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['getUser'])

const form = ref({
  selectedAddress: {
    province: { id: 0, text: 'เลือก จังหวัด' },
    amphure: { id: 0, text: 'เลือก เขต' },
    tambon: { id: 0, text: 'เลือก แขวง', zip_code: null }
  }
})

const data = useLocationThai()
// --- location: province > amphure > tambon ---
const sortingThai = (a, b) => {
  return a.text.localeCompare(b.text, 'th')
}
// const myAddress = ref({
//   province: { id: 0, text: 'เลือก จังหวัด' },
//   amphure: { id: 0, text: 'เลือก เขต' },
//   tambon: { id: 0, text: 'เลือก แขวง', zip_code: null }
// })

// console.log(data.location)
const provinceList = ref([])
const getProvince = () => {
  let list = []
  let province
  data.location.forEach((city) => {
    province = {
      id: city.id,
      text: city.name_th
    }
    list.push(province)
  })
  list.sort(sortingThai)
  provinceList.value = list
}
getProvince()

const amphureList = ref([])
const getAmphure = (provinceId) => {
  if (provinceId) {
    amphureList.value = []
    form.value.selectedAddress.amphure = { id: 0, text: 'เลือก เขต' }
    tambonList.value = []
    form.value.selectedAddress.tambon = {
      id: 0,
      text: 'เลือก แขวง',
      zip_code: null
    }
    let list = []
    let result = data.location.find((city) => city.id === provinceId)
    let amphure
    result.amphure.forEach((district) => {
      amphure = {
        id: district.id,
        text: district.name_th
      }
      list.push(amphure)
    })
    list.sort(sortingThai)
    amphureList.value = list
  }
}

const tambonList = ref([])
const getTambon = (provinceId, amphureId) => {
  if (amphureId) {
    tambonList.value = []
    form.value.selectedAddress.tambon = {
      id: 0,
      text: 'เลือก แขวง',
      zip_code: null
    }
    let province = data.location.find((city) => city.id === provinceId)
    let amphure = province.amphure.find((district) => district.id === amphureId)
    let list = []
    let tambon
    amphure.tambon.forEach((subDistrict) => {
      tambon = {
        id: subDistrict.id,
        text: subDistrict.name_th,
        zip_code: subDistrict.zip_code
      }
      list.push(tambon)
    })
    list.sort(sortingThai)
    tambonList.value = list
  }
}

const setupSelectedAddress = () => {
  if (form.value.address != null) {
    let address = form.value.address
    let selected = form.value.selectedAddress
    let province = data.location.find((p) => p.name_th.includes(address.city))
    if (province) {
      selected.province.id = province.id
      selected.province.text = province.name_th
      getAmphure(selected.province.id)
    }
    let amphure = amphureList.value.find((a) =>
      a.text.includes(address.district)
    )
    if (amphure) {
      selected.amphure.id = amphure.id
      selected.amphure.text = amphure.text
      getTambon(selected.province.id, selected.amphure.id)
    }
    let tambon = tambonList.value.find((t) =>
      t.text.includes(address.subDistrict)
    )
    if (tambon) {
      selected.tambon.id = tambon.id
      selected.tambon.text = tambon.text
      selected.tambon.zip_code = tambon.zip_code
    } else {
      selected.tambon.zip_code = address.postalCode
    }
  }
}

const setupForm = () => {
  form.value = { ...form.value, ...props.myUser.company }

  if (form.value.address == null) {
    form.value.address = {
      country: 'ประเทศไทย',
      postalCode: '',
      city: '',
      district: '',
      subDistrict: '',
      area: '',
      latitude: null, // function getGeoLication()
      longitude: null
    }
  } else {
    setupSelectedAddress()
  }
}
setupForm()

// -- quill editor ---
const quillToolbar = [
  { size: ['small', false, 'large'] },
  'bold',
  'italic',
  'underline',
  'strike',
  { list: 'ordered' },
  { list: 'bullet' }
]
// --- check validate : length quill-editor ---
function checkTextOnly(value, error_message) {
  if (value) {
    if (value.length == 0) {
      return ''
      // } else if (!value.replace(/<[^>]*>/g, '').trim()) {
      //   return 'Please enter ' + error_message
    } else if (value.replace(/<[^>]*>/g, '').length > 750) {
      return 'Must be no more than 750 characters'
    } else {
      return ''
    }
  }
}

const schema = yup.object({
  compName: yup.string().required('Please enter your company name').max(100),
  compUrl: yup.string().url('url is invalid').nullable().max(255),
  compDesc: yup.string().nullable().max(500),
  defaultWelfare: yup.string().max(1500)
})

const submitForm = () => {
  console.log(form.value)
  //--- รอทำ function edit profile company ----

  // +***อย่าลืมเพิ่ม emits('getUser')
}
</script>

<style lang="scss" scoped></style>
