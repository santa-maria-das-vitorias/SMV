<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './stores/navbar.vue'
import Footer from './stores/footer.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <!-- Page Content -->
    <RouterView />
    <!-- End Content -->
    <Footer />
  </div>
  
</template>

