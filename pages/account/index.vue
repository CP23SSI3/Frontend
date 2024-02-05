<template>
  <div>
    <nav class="flex flex-col gap-2">
      <NuxtLink to="/account/admin/profile">Admin</NuxtLink>
      <NuxtLink to="/account/company/profile">Company</NuxtLink>
      <NuxtLink to="/account/user/profile">User</NuxtLink>
    </nav>

    <NuxtPage />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
