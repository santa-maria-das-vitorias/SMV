<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Button from 'primevue/button';
import Image from 'primevue/image';
import { RouterLink } from 'vue-router';

const isScrolled = ref(false);
const isSidebarOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const navLinks = [
  { label: 'Início', to: '/' },
  { label: 'Sobre', to: '/sobre' },
  { label: 'Contato', to: '/Contato' },
  { label: 'Liturgia', to: '/liturgia' },
  { label: 'Artigos', to: '/Artigos' },
  { label: 'Projetos', to: '/Projetos' },
  { label: 'Suma Teológica', to: '/suma-teologica' },
  { label: 'Fotos', to: '/fotos' },
];

const contactLinks = [
  {
    icon: 'pi pi-map-marker',
    href: 'https://maps.app.goo.gl/qVXDhUGzRXxjSUMx8',
    label: 'Localização',
  },
  {
    icon: 'pi pi-envelope',
    href: 'mailto:santamariadasvitorias@gmail.com',
    label: 'santamariadasvitorias@gmail.com',
  },
];

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="w-full">
    <!-- Top bar -->
    <nav class="w-full bg-primary-600 min-h-10 border-b-4 border-b-secondary-500 text-surface-0 flex justify-between items-center px-4 py-2">
      <div class="flex items-center gap-4">
        <Button
          v-for="link in contactLinks"
          :key="link.href"
          :as="'a'"
          :href="link.href"
          target="_blank"
          rel="noopener"
          class="hover:text-surface-200 text-xs gap-2 flex items-center transition-all"
        >
          <i :class="link.icon"></i>
          <span class="hidden sm:inline">{{ link.label }}</span>
        </Button>
      </div>
      <Button
        icon="pi pi-bars"
        class="md:hidden text-white"
        @click="toggleSidebar"
      />
    </nav>

    <!-- Logo bar -->
    <nav class="w-full bg-surface-0 py-4">
      <div class="wrapper w-full hidden md:flex items-center justify-around">
        <div class="flex items-center gap-10">
          <Button
            v-for="(link, index) in navLinks.slice(0, Math.ceil(navLinks.length / 2))"
            :key="link.to"
            as="router-link"
            :label="link.label"
            :to="link.to"
          />
        </div>

        <RouterLink to="/">
          <Image
            class="hover:brightness-110 transition-all rounded-lg shadow-lg"
            src="/logo.svg"
            alt="Logo"
            width="180"
            height="180"
          />
        </RouterLink>

        <div class="flex items-center gap-10">
          <Button
            v-for="(link, index) in navLinks.slice(Math.ceil(navLinks.length / 2))"
            :key="link.to"
            as="router-link"
            :label="link.label"
            :to="link.to"
          />
        </div>
      </div>

      <div class="flex md:hidden w-full items-center justify-around">
        <RouterLink to="/">
          <Image
            class="hover:brightness-110 transition-all rounded-lg shadow-lg"
            src="/favicon.svg"
            alt="Logo"
            width="50"
            height="50"
          />
        </RouterLink>
      </div>
    </nav>
  </header>

  <!-- Secondary Navbar (fixed and minimalist) -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform -translate-y-full"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform -translate-y-full"
  >
    <nav v-show="isScrolled" class="fixed top-0 left-0 right-0 bg-primary-900/50 backdrop-blur-xl text-surface-0 py-2 z-50 shadow-md">
      <div class="flex justify-between items-center px-4">
        <RouterLink to="/">
          <Image
            class="w-12 h-12 hover:brightness-110 transition-all rounded-lg"
            src="/favicon.svg"
            alt="Logo"
            width="50"
            height="50"
          />
        </RouterLink>
        <div class="ml-10 w-full gap-4 hidden md:flex">
          <Button
            v-for="link in navLinks"
            :key="link.to"
            as="router-link"
            :label="link.label"
            :to="link.to"
          />
        </div>
        <div class="flex items-center gap-4 text-white">
          <Button as="router-link" icon="pi pi-map-marker" to="/localizacao" />
          <Button as="router-link" icon="pi pi-envelope" to="/contato" />
          <Button
            icon="pi pi-bars"
            class="block md:hidden"
            @click="toggleSidebar"
          />
        </div>
      </div>
    </nav>
  </Transition>

  <!-- Sidebar with slide transition -->
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="transform -translate-x-full"
    enter-to-class="transform translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in"
    leave-from-class="transform translate-x-0"
    leave-to-class="transform -translate-x-full"
  >
    <div
      v-show="isSidebarOpen"
      class="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-primary-900/50 backdrop-blur-xl text-surface-0 p-4 z-50"
    >
      <div class="flex justify-end mb-4">
        <Button icon="pi pi-times" class="text-white" @click="toggleSidebar" />
      </div>
      <div class="flex flex-col gap-4">
        <Button
          v-for="link in navLinks"
          :key="link.to"
          as="router-link"
          :label="link.label"
          :to="link.to"
        />
      </div>
    </div>
  </Transition>

  <!-- Backdrop overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="isSidebarOpen"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="toggleSidebar"
    ></div>
  </Transition>
</template>
