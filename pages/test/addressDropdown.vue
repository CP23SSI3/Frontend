<template>
  <div class="grid grid-cols-6 gap-x-3 gap-y-2">
    <div class="col-span-full">{{ address }}</div>

    <BaseInputField
      class="sm:col-span-2"
      label="รหัสไปรณีย์"
      id="postalCode"
      v-model="address.postalCode"
      required
    ></BaseInputField>
    <BaseInputField
      class="sm:col-span-2"
      label="จังหวัด"
      id="postalCode"
      v-model="address.city"
      required
    ></BaseInputField>
    <BaseInputField
      class="sm:col-span-2"
      label="เขต"
      id="city"
      v-model="address.subDistrict"
      required
    ></BaseInputField>
    <BaseInputField
      class="sm:col-span-2"
      label="แขวง"
      id="district"
      v-model="address.district"
      required
    ></BaseInputField>
    <BaseButton class="col-span-full" @click="getAddressThailand()"
      >อย่ากดปุ่มนี้ web ค้าง
    </BaseButton>
    <div class="col-span-full" v-for="item in listAddress">
      {{ item }}
    </div>
  </div>
</template>

<script setup>
const address = ref({
  city: '',
  district: '',
  subDistrict: ''
})
const listAddress = ref([])
// const getAddressThailand = async () => {
//   try {
//     const res = await useLocation()
//     console.log(res.value)
//     listAddress.value = res.value
//   } catch (error) {
//     Swal.fire({
//       showConfirmButton: true,
//       timerProgressBar: true,
//       confirmButtonColor: 'blue',
//       icon: 'error',
//       title: 'Error',
//       text: 'useLocation() ใช้งานไม่ได่'
//     })
//   }
// }
</script>

<style lang="scss" scoped></style>
