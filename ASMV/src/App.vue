<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './stores/navbar.vue'
</script>

<template>
  <Navbar />
  <!-- Page Content -->
  <RouterView />
</template>
