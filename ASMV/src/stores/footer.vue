<template>
  <div class="mt-20 bg-primary-600 border-t-2 border-t-secondary-500 w-full min-h-10 p-4 flex flex-col md:flex-row justify-between items-center text-xs font-light text-surface-100">
    <div class="text-center md:text-left">
      <p>&copy; {{ currentYear }} Capela Santa Maria das Vitórias. Todos os direitos reservados.</p>
    </div>
    <div class="flex space-x-4 mt-2 md:mt-0">
      <a href="/" class="hover:text-primary-500 transition-all">Início</a>
      <a href="/contato" class="hover:text-primary-500 transition-all">Contato</a>
      <a href="/politica-de-privacidade" class="hover:text-primary-500 transition-all">Política de Privacidade</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentYear = ref(new Date().getFullYear());
</script>