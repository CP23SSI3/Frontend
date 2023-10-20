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
    <NuxtLink href="/test/checkbox">Checkbox</NuxtLink>
    <NuxtLink href="/test/radio">Radio</NuxtLink>

    <NuxtLink href="/test/map">Google Map</NuxtLink>
  </div>
</template>

<script setup>
import moment from 'moment'
import Swal from 'sweetalert2'

const swalFunction = () =>
  Swal.fire({
    showConfirmButton: true,
    timerProgressBar: true,
    icon: 'error',
    title: 'Error',
    text: 'ระบบผิดพลาด'
  })
</script>

<style lang="scss" scoped></style>
