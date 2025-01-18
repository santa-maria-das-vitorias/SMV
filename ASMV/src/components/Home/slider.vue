<template>
  <div class="relative w-full max-h-screen overflow-hidden">
    <div
      class="flex transition-all duration-700 ease-in-out w-full h-[50vh]"
      :style="`transform: translateX(-${currentIndex * 100}%)`"
    >
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        alt="Slide Image"
        class="h-full min-w-full object-cover"
      />
    </div>

    <!-- Navigation Buttons -->
    <Button
      @click="prevSlide"
      class="absolute top-1/2 left-5 p-2 transform -translate-y-1/2 bg-surface-700 text-white rounded-full flex items-center justify-center"
    >
      <i class="pi pi-chevron-left" />
    </Button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-5 p-2 transform -translate-y-1/2 bg-surface-700 text-white rounded-full flex items-center justify-center"
    >
      <i class="pi pi-chevron-right" />
    </button>
  </div>
</template>

<script>
import Button from 'primevue/button';

export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      timer: null, // Guarda a referência do timer
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    startAutoSlide() {
      // Inicia o timer que chama nextSlide a cada 3 segundos (3000ms)
      this.timer = setInterval(this.nextSlide, 4000);
    },
    stopAutoSlide() {
      // Para o timer
      clearInterval(this.timer);
    },
  },
  mounted() {
    this.startAutoSlide(); // Começa o slideshow automático quando o componente for montado
  },
  beforeDestroy() {
    this.stopAutoSlide(); // Para o slideshow automático quando o componente for destruído
  },
};
</script>