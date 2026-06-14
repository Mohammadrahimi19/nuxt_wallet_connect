<template>
  <div>
    <nuxt-app :toaster="toaster">
      <nuxt-page :page-key="(route) => route.fullPath" />
    </nuxt-app>
  </div>
</template>
<script setup lang="ts">
const toaster = { position: "bottom-right", duration: 5000 };
</script>
//@custom-variant dark (&:where(.dark, .dark *)
<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>
