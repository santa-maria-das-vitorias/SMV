<template>
  <audio ref="bgMusic" :src="audioSrc" autoplay loop>
    Seu navegador não suporta áudio.
  </audio>
  <div class="fixed bottom-4 z-30 right-4 flex flex-col-reverse items-center gap-2">
    <button v-if="$route.path === '/'" @click="toggleMusic" class=" text-xs bg-primary-800 text-white p-2 rounded-full aspect-square h-10 items-center justify-center flex hover:bg-primary-500">
      <i :class="isPlaying ? 'pi pi-pause' : 'pi pi-play'"></i>
    </button>
    <a href="https://www.paypal.com/ncp/payment/TYNYLJQ33BF9U" class="" target="_blank">
      <button class="bg-primary-800 text-white p-2 rounded-full h-10 items-center aspect-square justify-center flex hover:bg-primary-500">
        <i class="text-bold text-lg pi pi-paypal"></i>
        <span class="hidden text-xs">Doe agora!</span>
      </button>
    </a>
  </div>
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

<script lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, type RouteLocationNormalizedLoaded } from "vue-router";

export default {
  setup() {
    const route: RouteLocationNormalizedLoaded = useRoute();
    const currentYear = ref<number>(new Date().getFullYear());
    const isPlaying = ref<boolean>(false);
    const audioSrc = "/audio/Laudate-Dominum.mp3";

    // Função para alternar entre play e pause
    const toggleMusic = (): void => {
      const audioElement = document.querySelector<HTMLAudioElement>('audio');
      if (!audioElement) {
        console.error("Áudio não encontrado!");
        return;
      }
      if (audioElement.paused) {
        audioElement.play().then(() => {
          isPlaying.value = true;
        }).catch((error: Error) => {
          console.error("Erro ao tentar tocar o áudio:", error);
        });
      } else {
        if (audioElement) {
          audioElement.pause();
        }
        isPlaying.value = false;
      }
    };

    onMounted(() => {
      const audioElement = document.querySelector<HTMLAudioElement>('audio');
      if (!audioElement) {
        console.error("Áudio não encontrado após o componente ser montado!");
      }
      if (route.path !== '/') {
        if (audioElement) {
          audioElement.pause();
        }
        isPlaying.value = false;
      }
    });

    return {
      audioSrc,
      isPlaying,
      toggleMusic,
      currentYear,
      route,
    };
  },
};
</script>
