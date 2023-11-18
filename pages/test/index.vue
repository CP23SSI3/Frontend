<template>
  <div>Page:index</div>

  <nuxt-img
    class="w-auto h-8"
    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
    alt="Your Company"
  />

  <BaseTitle>Title Topic component</BaseTitle>
  {{ moment(new Date()).format('YYYY-MM-DD') }}
  <div class="flex flex-col gap-3">
    <BaseButton
      type="button"
      @click="swalFunction()"
      class="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      Swal Alert
    </BaseButton>

    <NuxtLink href="/test/easytable">View Vue3-EasyDataTable</NuxtLink>

    <NuxtLink href="/test/validation">View yup & Vee validation</NuxtLink>
    <NuxtLink href="/test/multiselect">Vue-Multiselect</NuxtLink>
    <!-- <NuxtLink href="/test/checkbox">Checkbox</NuxtLink>
    <NuxtLink href="/test/radio">Radio</NuxtLink> -->

    <NuxtLink href="/test/map">Google Map</NuxtLink>
    <NuxtLink href="/test/pagination">Vue Anesome pagination</NuxtLink>

    <input type="search" v-model="searchValue" />
    {{ searchValue }}
    <button @click="reset()">reset</button>

    <!-- <UPagination v-model="page" :page-count="5" :total="items.length" /> -->
  </div>
</template>

<script setup>
import moment from 'moment'
import Swal from 'sweetalert2'

const page = ref(1)
const items = ref(Array(55))

const swalFunction = () => {
  Swal.fire({
    title: 'Are you want to Save?',
    text: 'คุณต้องการบันทึกการแก้ไขนี้ใช่หรือไม่',
    icon: 'question',
    showCloseButton: true,

    confirmButtonText: 'Save',

    showDenyButton: true,
    denyButtonText: `Don't save`,
    denyButtonColor: 'red',

    showCancelButton: true
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Save is OK', '', 'success')
    } else if (result.isDenied) {
      Swal.fire({
        title: 'Are you sure?',
        text: `Don't save`,
        confirmButtonText: 'Yes',
        confirmButtonColor: 'green',
        showDenyButton: true,
        denyButtonText: 'No',
        denyButtonColor: 'red'
      })
    }
    console.log(result)
  })
}

const searchValue = ref()
const reset = () => {
  searchValue.value = ''
}
</script>

<style lang="scss" scoped></style>
