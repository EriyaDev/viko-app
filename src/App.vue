<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen w-full bg-[#070a13] font-sans antialiased text-gray-200">
    <RouterView />
  </div>
</template>

<style>
/* Global reset adjustments if needed */
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #070a13;
}
</style>
