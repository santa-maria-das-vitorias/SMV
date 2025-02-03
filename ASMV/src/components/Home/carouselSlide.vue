<template>
  <div class="flex justify-center items-center min-h-[400px] w-full my-10">
    <div class="relative w-full  overflow-hidden">
      <div class="absolute z-20 w-full h-full items-center justify-between flex">
        <button @click="prevSlide" class="bg-black/50 p-2 rounded-full text-white">
          <i class="pi pi-chevron-left"></i>
        </button>

        <button @click="nextSlide" class=" bg-black/50 p-2 rounded-full text-white">
          <i class="pi pi-chevron-right"></i>
        </button>
      </div>

      <div class="relative flex w-full h-[300px] justify-center items-center">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="absolute transition-all duration-500 ease-in-out rounded-lg shadow-lg overflow-hidden"
          :class="slideClasses(index)"
        >
          <img :src="slide.image" :alt="slide.name" class="w-full h-full object-cover rounded-lg" />
          <h1 class="text-sm font-semibold text-center mt-2 text-white bg-primary-500 py-1">{{ slide.name }}</h1>
        </div>
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
    ]);
    
    const currentSlide = ref(0);

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % slides.value.length;
    };
    
    const prevSlide = () => {
      currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
    };

    const slideClasses = (index) => {
      const totalSlides = slides.value.length;
      const position = (index - currentSlide.value + totalSlides) % totalSlides;

      return {
        "opacity-100 scale-110 z-10 translate-x-0": position === 0,
        "opacity-30 scale-110 z-0 translate-x-96": position === 1,
        "opacity-30 scale-110 z-0 -translate-x-96": position === 2,
      };
    };

    return { slides, currentSlide, nextSlide, prevSlide, slideClasses };
  }
};
</script>