<template>
  <div class="flex justify-center items-center min-h-[400px] w-full my-10">
    <div class="relative w-full overflow-hidden">
      <div class="absolute z-20 w-full h-full flex items-center justify-between px-4">
        <button @click="prevSlide" class="bg-black/50 p-2 rounded-full text-white">
          <i class="pi pi-chevron-left"></i>
        </button>
        <button @click="nextSlide" class="bg-black/50 p-2 rounded-full text-white">
          <i class="pi pi-chevron-right"></i>
        </button>
      </div>

      <div class="relative flex w-full h-[300px] justify-center items-center overflow-hidden">
        <transition-group name="carousel" tag="div" class="relative w-full flex justify-center items-center">
          <div
            v-for="(slide, index) in visibleSlides"
            :key="slide.name"
            class="absolute transition-all duration-500 ease-in-out rounded-lg shadow-lg overflow-hidden"
            :class="slideClasses(index)"
          >
            <img :src="slide.image" :alt="slide.name" class="w-full h-full object-cover rounded-lg" />
            <h1 class="text-sm font-semibold text-center mt-2 text-white bg-primary-500 py-1">
              {{ slide.name }}
            </h1>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const slides = ref([
      { image: "/home/carrossel/batalha-dos-guararapes.jpg", name: "Batalha dos Guararapes" },
      { image: "/home/carrossel/primeira-missa.jpg", name: "Primeira Missa" },
      { image: "/home/carrossel/o-grito-do-ipiranga.jpg", name: "O Grito do Ipiranga" },
      { image: "/home/carrossel/independencia-ou-morte.jpg", name: "Independência ou Morte" },
      { image: "/home/carrossel/proclamacao-da-republica.jpg", name: "Proclamação da República" }
    ]);

    const currentIndex = ref(0);

    const visibleSlides = computed(() => {
      const total = slides.value.length;
      return [
        slides.value[(currentIndex.value - 1 + total) % total], // Esquerda
        slides.value[currentIndex.value], // Central
        slides.value[(currentIndex.value + 1) % total], // Direita
      ];
    });

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % slides.value.length;
    };

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
    };

    const slideClasses = (index) => {
      return [
        index === 0 ? "opacity-30 scale-90 -translate-x-96 z-0" : "", // Esquerda
        index === 1 ? "opacity-100 scale-110 translate-x-0 z-10" : "", // Centro
        index === 2 ? "opacity-30 scale-90 translate-x-96 z-0" : "", // Direita
      ];
    };

    return { slides, visibleSlides, currentIndex, nextSlide, prevSlide, slideClasses };
  },
};
</script>

<style>
.carousel-enter-active, .carousel-leave-active {
  transition: all 0.5s ease;
}
.carousel-enter, .carousel-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
