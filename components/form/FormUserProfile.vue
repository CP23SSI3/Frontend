<template>
  <div v-if="myUser != null" class="w-auto space-y-6">
    <BaseSectionContent class="w-full">
      <div>
        <div class="flex items-center justify-between px-4 py-5 sm:px-10">
          <BaseTitleForm>Personal Information</BaseTitleForm>
        </div>
        <BaseLine />
        <Form
          @submit="submitFormProfile"
          v-slot="{ meta, values, errors }"
          :validation-schema="schema"
          :initial-values="initialValues"
        >
          <div class="grid items-start gap-6 px-4 py-8 sm:grid-cols-3 sm:px-10">
            <div
              class="flex flex-col items-center justify-start gap-4 sm:py-4 sm:col-span-1"
            >
              <BaseProfile
                size="XL"
                :fname="myUser.firstname"
                :lname="myUser.lastname"
              />

              <!-- <BaseBadge color="blue">{{ myUser.role }}</BaseBadge> -->
              <div class="flex gap-6 sm:flex-col">
                <BaseDescription label="Role">
                  {{ form.role }}
                </BaseDescription>
                <BaseDescription label="Created Date">
                  {{
                    moment(new Date(form.createdDate)).format(
                      'D MMM YYYY, hh:mm a'
                    )
                  }}
                </BaseDescription>
                <BaseDescription label="Last Update">
                  {{
                    moment(new Date(form.lastUpdate)).format(
                      'D MMM YYYY, hh:mm a'
                    )
                  }}
                </BaseDescription>
              </div>
            </div>

            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:col-span-2">
              <BaseInputField
                class="sm:col-span-2"
                label="Display Name "
                id="username"
                v-model="form.username"
              ></BaseInputField>
              <BaseInputField
                class="sm:col-start-1"
                label="First Name"
                id="firstname"
                v-model="form.firstname"
              ></BaseInputField>
              <BaseInputField
                label="Last Name"
                id="lastname"
                v-model="form.lastname"
              ></BaseInputField>
              <Field v-slot="{ field }" name="gender">
                <BaseDropdown
                  :option-lists="genders"
                  label="เพศ"
                  v-model="form.selectedGender"
                  v-bind="field"
                  @click="changeGender()"
              /></Field>
              <BaseInputField
                class="sm:col-span-1"
                label="Email Address"
                id="email"
                v-model="form.email"
                disabled
              ></BaseInputField>
              <BaseInputField
                class="sm:col-span-1"
                label="Phone Number"
                id="phoneNumber"
                type="tel"
                v-model="form.phoneNumber"
              ></BaseInputField>
              <Field v-slot="{ field, errors }" name="dateOfBirth">
                <BaseDatePicker
                  label="วันเกิด"
                  id="dateOfBirth"
                  placeholder="DD/MM/YYYY"
                  :enable-time-picker="false"
                  v-bind="field"
                  v-model="form.birthDay"
                  :format="
                    (date) => (date ? moment(date).format('DD/MM/YYYY') : '')
                  "
                  :max-date="new Date()"
                >
                  <template v-slot:error-message>{{ errors[0] }}</template>
                </BaseDatePicker>
              </Field>

              <BaseLineTopic
                class="col-start-1 col-span-full"
                v-if="auth.user.role !== 'ADMIN'"
                >Profile Detail</BaseLineTopic
              >
              <Field
                v-slot="{ field, errors }"
                name="userDesc"
                v-if="auth.user.role !== 'ADMIN'"
              >
                <div class="col-span-full">
                  <BaseLabel id="userDesc">About me</BaseLabel>
                  <div class="mt-1 sm:col-span-full">
                    <textarea
                      id="userDesc"
                      name="userDesc"
                      rows="4"
                      v-model="form.userDesc"
                      v-bind="field"
                      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p class="text-sm leading-6 text-gray-600" v-if="!errors[0]">
                    Write a few sentences about yourself.
                  </p>
                  <span class="pl-2 text-xs text-red-500">{{ errors[0] }}</span>
                </div>
              </Field>
            </div>
          </div>
          <BaseLine />
          <div class="flex items-center justify-between px-4 py-5 sm:px-10">
            <BaseButton
              :leadingIcon="ArrowRightOnRectangleIcon"
              type="button"
              negative
              @click="auth.logout()"
              >Log out</BaseButton
            >
            <BaseButton
              :leading-icon="ArrowDownTrayIcon"
              type="sumbit"
              :disabled="!meta.dirty || !meta.valid"
              >Save</BaseButton
            >
          </div>
        </Form>
      </div>
    </BaseSectionContent>

    <!-- Form 2 -->
    <BaseSectionContent class="w-full">
      <div>
        <div class="flex items-center justify-between px-4 py-5 sm:px-10">
          <BaseTitleForm>Address</BaseTitleForm>
        </div>
        <BaseLine />
        <div class="grid items-start gap-6 px-4 py-8 sm:grid-cols-3 sm:px-10">
          <BaseInputField
            label="ที่อยู่ปัจจุบัน"
            id="area"
            class="sm:col-start-1 sm:col-span-2"
            v-model="form.address.area"
          ></BaseInputField>

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
      <BaseLine />
      <div class="flex items-center justify-end px-4 py-5 sm:px-10">
        <!-- <BaseButton
          :leadingIcon="ArrowRightOnRectangleIcon"
          type="button"
          negative
          @click="auth.logout()"
          >Log out</BaseButton
        > -->
        <BaseButton :leading-icon="ArrowDownTrayIcon">Save</BaseButton>
      </div>
    </BaseSectionContent>
  </div>
  <BaseLoading v-else></BaseLoading>

  <!-- {{ myUser }} -->
</template>

<script setup>
import {
  ArrowRightOnRectangleIcon,
  ArrowDownTrayIcon
} from '@heroicons/vue/24/outline'
import Swal from 'sweetalert2'
import moment from 'moment'
import { Field, ErrorMessage, Form } from 'vee-validate'
import yup from '@/assets/yup-error.js'

const auth = useAuth()
const userId = auth.user.userId

// --- GET : User by id ---
const myUser = ref()
const getUser = async () => {
  try {
    const res = await getUserById(userId)
    if (res.value.status == 200) {
      myUser.value = res.value.data
      console.log(myUser.value)
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'Error',
      text: error.message
    })
  }
}

// -- dropdown : gender --
const genders = [
  { id: 1, text: 'ชาย', value: 'M' },
  { id: 2, text: 'หญิง', value: 'F' },
  { id: 3, text: 'ไม่ระบุ', value: null }
]

const form = ref({
  birthDay: null,
  selectedGender: { id: 0, text: 'เลือก เพศ', value: null },
  selectedAddress: {
    province: { id: 0, text: 'เลือก จังหวัด' },
    amphure: { id: 0, text: 'เลือก เขต' },
    tambon: { id: 0, text: 'เลือก แขวง', zip_code: null }
  }
})

const setupForm = async () => {
  await getUser()
  for (let key in myUser.value) {
    if (myUser.value.hasOwnProperty(key)) {
      form.value[key] = myUser.value[key]
    }
  }

  form.value.birthDay = new Date(myUser.value.dateOfBirth)
  form.value.selectedGender = genders.find(
    (g) => g.value === myUser.value.gender
  )

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

// const { data } = await useFetch('/api/locations-thai')
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

const setupSelectedAddress = () => {
  if (myUser.value.address != null) {
    let address = myUser.value.address
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

await setupForm()
const initialValues = ref({ ...form.value })

const changeGender = () => {
  form.value.gender = form.value.selectedGender.value
}

// --- check validate : yup ---
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const schema = yup.object({
  username: yup.string().required('กรุณากรอก ชื่อผู้ใช้').max(50),
  firstname: yup.string().required('กรุณากรอก ชื่อจริง').max(50),
  lastname: yup.string().required('กรุณากรอก นามสกุล').max(50),
  dateOfBirth: yup.string().nullable().required('โปรดเลือก วันเกิดของคุณ'),
  phoneNumber: yup
    .string()
    .trim()
    .required('โปรดระบุ เบอร์โทร')
    .matches(phoneRegExp, 'เบอร์โทรไม่ถูกต้อง')
    .max(10),
  userDesc: yup.string().nullable().max(1500)
})

// --- เอาข้อมูลที่เลือกไว้ มาจัดเพื่อเตรียมส่ง --
const setAddress = () => {
  let address = myUser.value.address
  ;(address.city = form.value.selectedAddress.province.text),
    (address.district = form.value.selectedAddress.amphure.text),
    (address.subDistrict = form.value.selectedAddress.tambon.text),
    (address.postalCode = form.value.selectedAddress.tambon.zip_code)
}

const submitFormProfile = async () => {
  if (form.value.birthDay) {
    form.value.dateOfBirth = moment(form.value.birthDay)
      .format()
      .substring(0, 10)
  }
  const {
    dateOfBirth,
    firstname,
    gender,
    lastname,
    phoneNumber,
    userDesc,
    username
  } = form.value

  let editUser = {
    dateOfBirth,
    firstname,
    gender,
    lastname,
    phoneNumber,
    userDesc,
    username
  }
  console.log(editUser)
  await saveUserProfile(editUser)
}
const saveUserProfile = async (editUser) => {
  try {
    const res = await useUpdateUser(userId, editUser)
    if (res.value) {
      Swal.fire({
        title: 'Update Post',
        confirmButtonColor: 'blue',
        text: 'บันทึกการแก้ไข profile สำเร็จ',
        icon: 'success'
      }).then((result) => {
        let role = auth.user.role
        reloadNuxtApp({
          path: `/account/${role.toLowerCase()}/profile`,
          ttl: 1000
        })
      })
    }
  } catch (error) {
    console.log(error.message)
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'Error',
      text: 'ไม่สามารถบันทึกการแก้ไขนี้ได้'
    })
  }
}
// --- location: get latitude / longtitude ---
// const getGeoLication = async () => {
//   setAddress()
//   let address = form.value.selectedAddress
//   let location = address.area.concat(
//     ' ',
//     address.subDistrict,
//     ' ',
//     address.district,
//     ' ',
//     address.city,
//     ' ',
//     address.country,
//     ' ',
//     address.postalCode
//   )
//   try {
//     const res = await useGoogleMap(location)
//     let response = res.value
//     if (response.status == 'OK') {
//       address.latitude = response.results[0].geometry.location.lat
//         .toString()
//         .substring(0, 11)
//       address.longitude = response.results[0].geometry.location.lng
//         .toString()
//         .substring(0, 11)
//       // console.log(address.latitude + ',' + address.longitude)
//     } else {
//       // console.log('Unable to locate this location.')
//       Swal.fire({
//         showConfirmButton: true,
//         timerProgressBar: true,
//         confirmButtonColor: 'blue',
//         icon: 'error',
//         title: 'ที่อยู่ไม่ถูกต้อง',
//         text: 'กรุณากรอกที่อยู่ใหม่อีกครั้ง'
//       })
//     }
//   } catch (error) {
//     console.error('Error fetching location:', error)
//     Swal.fire({
//       showConfirmButton: true,
//       timerProgressBar: true,
//       confirmButtonColor: 'blue',
//       icon: 'error',
//       title: 'ที่อยู่ไม่ถูกต้อง',
//       text: 'กรุณากรอกที่อยู่ใหม่อีกครั้ง'
//     })
//   }
// }
</script>

<style lang="scss" scoped></style>
