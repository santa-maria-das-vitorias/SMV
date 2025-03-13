<template>
  <div class="flex justify-center items-center min-h-[400px] w-full my-10">
    <div class="relative w-full overflow-hidden">
      <h1 class="relative w-full text-center">Pinturas Históricas</h1>
      <div class="absolute z-20 w-full h-full flex items-center justify-between px-4">
        <button @click="prevSlide" class="bg-black/50 p-2 rounded-full text-white">
          <i class="pi pi-chevron-left"></i>
        </button>
        <button @click="nextSlide" class="bg-black/50 p-2 rounded-full text-white">
          <i class="pi pi-chevron-right"></i>
        </button>
      </div>

      <div class="relative flex w-full h-[500px] justify-center items-center overflow-hidden">
        <transition-group name="carousel" tag="div" class="relative w-full flex justify-center items-center m-2">
          <div
            v-for="(slideGrav, index) in visibleSlides"
            :key="slideGrav.name"
            class="absolute transition-all duration-500 ease-in-out rounded-lg shadow-lg overflow-hidden"
            :class="slideClasses(index)"
          >
            <img :src="slideGrav.image" :alt="slideGrav.name" class=" w-120 h-96 object-cover rounded-lg items-center" />
            <h1 class="text-sm font-semibold text-center mt-2 text-white bg-primary-500 p-2 text-wrap w-120">
              {{ slideGrav.name }}
            </h1>
          </div>
        </transition-group>
      </div>
    </div>    
  </div>



  <div class="relative w-full overflow-hidden">
    <h1 class="relative w-full text-center">Aspectos Pitorescos de uma Cidade Antiga</h1>

    <div class="absolute z-20 w-full h-full flex items-center justify-between px-4">
      <button @click="prevSlide2" class="bg-black/50 p-2 rounded-full text-white">
        <i class="pi pi-chevron-left"></i>
      </button>
      <button @click="nextSlide2" class="bg-black/50 p-2 rounded-full text-white">
        <i class="pi pi-chevron-right"></i>
      </button>
    </div>

    <div class="relative flex w-full h-[700px] justify-center items-center overflow-hidden">
      <transition-group name="carousel" tag="div" class="relative w-full flex justify-center items-center">
        <div
          v-for="(slides2, index2) in visibleSlidesHist"
          :key="slides2.name"
          class="absolute transition-all duration-500 ease-in-out rounded-lg shadow-lg overflow-hidden"
          :class="slideClasses2(index2)"
        >
          <img :src="slides2.image" :alt="slides2.name" class="w-96 h-auto object-cover rounded-lg" />
          <h1 class="text-sm font-semibold text-center mt-1 text-white bg-primary-500 py-1 text-wrap w-96">
            {{ slides2.name }}
          </h1>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const slides = ref([
      
      
      { image: "/home/carrossel/descobrimento-brasil.webp", name: "Oscar Pereira da Silva - Desembarque de Pedro Álvares Cabral em Porto Seguro em 1500"},
      { image: "/home/carrossel/primeira-missa.jpg", name: "Victor Meirelles - Primeira Missa no Brasil" },
      { image: "/home/carrossel/elevacao-cruz.jpg", name: "Pedro Peres - A Elevação da Cruz em Porto Seguro"},
      { image: "/home/carrossel/fundacao-sao-paulo.jpg", name: "Oscar Pereira da Silva - Fundação de São Paulo"},
      { image: "/home/carrossel/batalha-dos-guararapes.jpg", name: "Victor Meirelles - Batalha dos Guararapes" },
      { image: "/home/carrossel/partida-da-moncao.jpg", name: "Almeida Júnior - Partida da Monção" },
      //{ image: "/home/carrossel/casamento-princesa-isabel.JPG", name: "Pedro Américo - O Casamento da Princesa Isabel (1864)"},
      { image: "/home/carrossel/juramento-isabel.jpg", name: "Victor Meirelles - Juramento da Princesa Isabel"},
      { image: "/home/carrossel/abolicao-escravatura.jpg", name: "Victor Meirelles - Abolição da Escravatura"},
      { image: "/home/carrossel/batalha-campo-grande.jpg", name: "Pedro Américo - Batalha de Campo Grande"},
      { image: "/home/carrossel/passagem-do-chaco.jpg", name: "Pedro Américo - Passagem do Chaco"},
      { image: "/home/carrossel/batalha-riachuelo.jpg", name: "Oscar Pereira da Silva - A Batalha Naval do Riachuelo"},
      { image: "/home/carrossel/independencia-ou-morte.jpg", name: "Pedro Américo - O Grito do Ipiranga" },      
      { image: "/home/carrossel/sao-jose-anchieta-selva.jpg", name: "Benedito Calixto - Evangelho nas Selvas"},
      
      
    ]);

    const slideHist = ref([
      { image:"/home/carrossel/paço-municipal-mococa.jpg", name: "Paço Municipal de Mococa, SP - 1930"},
      { image: "/home/carrossel/aspectos-pitorescos-2.jpg", name: "Washington Luís e o arcebispo D. Duarte Leopoldo na matriz de Pirapora, MG- 1922"},
      { image: "/home/carrossel/aspectos-pitorescos-3.jpg", name: "Matriz do Patrocínio - 1930"},
      { image: "/home/carrossel/jau_velha.jpg", name: "Velha Estação Ferroviária em Jaú, SP - 1917"},
      { image: "/home/carrossel/aspectos-pitorescos-5.jpg", name: "Desfile Cívico"},
      { image: "/home/carrossel/faculdade-de-direito.webp", name: "Faculdade de Direito e Igreja São Francisco (SP) - 1900"},
      { image: "/home/carrossel/estacao-da-luz.webp", name: "Estação da Luz em construção (SP) - 1900"},
      { image: "/home/carrossel/casarao-familia-dumont.webp", name: "Casarão da Família Dumont (SP) - 1900"},
      { image: "/home/carrossel/bonde-com-trabalhador.webp", name: "O Bonde - 1961"},
      { image: "/home/carrossel/paulista.webp", name: "Avenida Paulista - 1891"},
      { image: "/home/carrossel/theatro-municipal.webp", name: "Teatro Municipal em São Paulo - 1910"},
      { image: "/home/carrossel/casamento.png", name: "Casamento coletivo no Palácio dos Campos Elíseos em São Paulo - 1950"},
      { image: "/home/carrossel/colegio-salesiano.jpg", name: "Colégio Salesiano Santa Rosa em Niterói, RJ - 1908"},
      { image: "/home/carrossel/sala-de-operacoes.jpg", name: "Sala de Operações do Hospital de Caridade de Santa Maria, RS - 1910"},
      { image: "/home/carrossel/igreja-matriz-araraquara.jpg", name: "Igreja Matriz de Araraquara, SP - 1914"},
      { image: "/home/carrossel/mosteiro-sao-bento.jpg", name: "Mosteiro São Bento (SP) - 1903"},
      { image: "/home/carrossel/rua_edgard.jpg", name: "Rua Edgard Ferraz - Jaú, SP - 1920"},      
      { image: "/home/carrossel/douradense.jpg", name: "Estação da Douradense - Jaú, SP - 1917"},
      
    ]);

    const currentIndex = ref(0);
    const currentIndex2 = ref(0);

    const visibleSlides = computed(() => {
      const total = slides.value.length;
      return [
        slides.value[(currentIndex.value - 1 + total) % total], // Esquerda
        slides.value[currentIndex.value], // Central
        slides.value[(currentIndex.value + 1) % total], // Direita
      ];
    });

    const visibleSlidesHist = computed(() => {
      const total = slideHist.value.length;
      return [
        slideHist.value[(currentIndex2.value - 1 + total) % total], // Esquerda
        slideHist.value[currentIndex2.value], // Central
        slideHist.value[(currentIndex2.value + 1) % total], // Direita
      ];
    });

    const nextSlide = () => {
      currentIndex.value = (currentIndex.value + 1) % slides.value.length;
    };

    const prevSlide = () => {
      currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
    };

    const nextSlide2 = () => {
      currentIndex2.value = (currentIndex2.value + 1) % slideHist.value.length;
    };

    const prevSlide2 = () => {
      currentIndex2.value = (currentIndex2.value - 1 + slideHist.value.length) % slideHist.value.length;
    };

    const slideClasses = (index) => {
      return [
        index === 0 ? "opacity-30 scale-90 -translate-x-96 z-0" : "", // Esquerda
        index === 1 ? "opacity-100 scale-110 translate-x-0 z-10" : "", // Centro
        index === 2 ? "opacity-30 scale-90 translate-x-96 z-0" : "", // Direita
      ];
    };

    const slideClasses2 = (index) => {
      return [
        index === 0 ? "opacity-30 scale-90 -translate-x-96 z-0" : "", // Esquerda
        index === 1 ? "opacity-100 scale-110 translate-x-0 z-10" : "", // Centro
        index === 2 ? "opacity-30 scale-90 translate-x-96 z-0" : "", // Direita
      ];
    };

    return {visibleSlidesHist ,slideHist, slides, visibleSlides, currentIndex, currentIndex2, nextSlide, prevSlide, slideClasses, slideClasses2, nextSlide2, prevSlide2 };
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
