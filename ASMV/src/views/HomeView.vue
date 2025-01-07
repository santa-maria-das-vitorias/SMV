<template>
  <div>
    <Slider :images="sliderImages" />
    <div class="flex flex-col items-center w-full md:px-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 w-full mt-20">
        <div class="md:col-span-1 card">
          <h1 class="text-center mt-2">Nossos Padroeiros</h1>
          <div class="flex flex-col items-center mt-10 gap-8">
            <div v-for="padroeiro in padroeiros" :key="padroeiro.image" class="flex flex-col items-center">
              <Avatar :image="padroeiro.image" class="w-48" shape="circle" />
              <small>{{ padroeiro.name }}</small>
            </div>
          </div>
        </div>
        <div class="md:col-span-2 card">
          <h1 class="text-center mt-2">Últimos Artigos</h1>
          <LatestArticles :articles="articles" />
        </div>
        <div ref="stickyContainer" class="hidden md:block md:col-span-1 h-full relative">
          <div ref="stickyElement" class="flex flex-col gap-5">
            <div class="card p-4">
              <h1 class="text-center mt-2">Horário de Missas</h1>
              <p class="mt-4 text-center"><strong>Aos Domingos</strong></p>
              <p class="text-center">Missas cantadas às 10:00 e 18:00 h</p>
              <p class="mt-4 text-center"><strong>Durante a semana</strong></p>
              <p class="text-center">18:30 h</p>
            </div>
            <div class="card p-4">
              <h1 class="text-center mt-2">Doações</h1>
              <div class="flex flex-col items-center mt-4 gap-4">
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                  <i class="pi pi-paypal" /> Doe com PayPal
                </button>
              </div>
              <p class="text-center text-sm mt-4 h-fit">
                É rápido, grátis e seguro!
              </p>
            </div>
            <div class="card p-4 flex flex-col items-center">
              <h1 class="text-center mt-2">Redes Sociais</h1>
              <socialbuttons appearance="icons" />
            </div>
          </div>
        </div>

        <div class="flex md:hidden flex-col gap-5">
          <div class="card p-4">
            <h1 class="text-center mt-2">Horário de Missas</h1>
            <p class="mt-4 text-center"><strong>Aos Domingos</strong></p>
            <p class="text-center">Missas cantadas às 10:00 e 18:00 h</p>
            <p class="mt-4 text-center"><strong>Durante a semana</strong></p>
            <p class="text-center">18:30 h</p>
          </div>
          <div class="card p-4">
            <h1 class="text-center mt-2">Doações</h1>
            <div class="flex flex-col items-center mt-4 gap-4">
              <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                <i class="pi pi-paypal" /> Doe com PayPal
              </button>
            </div>
            <p class="text-center text-sm mt-4 h-fit">
              É rápido, grátis e seguro!
            </p>
          </div>
          <div class="card p-4 flex flex-col items-center">
            <h1 class="text-center mt-2">Redes Sociais</h1>
            <socialbuttons appearance="icons" />
          </div>
        </div>
        
      </div>
    </div>
    <div class="mt-20 bg-primary-500 p-4">
      <h1 class="text-center text-white mt-4">
        “Aquele que só busca palavras não terá nada; mas o que é possuidor de entendimento ama a sua alma, e o conservador da prudência achará bens.”
      </h1>
      <h2 class="text-center mt-4 text-white">
        (Provérbios, 19, 7-8)
      </h2>
    </div>

    <div class="flex flex-col md:flex-row md:items-center md:gap-8 mt-4 md:px-10">
      <a href="/calendario-romano-tradicional">
        <img src="/public/home/calendario-liturgico-tradicional.jpg" alt="Calendário Romano Tradicional" class="hover:brightness-50 transition-all w-full md:w-auto rounded-lg">
      </a>
      <a href="/suma-teologica">
        <img src="/public/home/suma-teologica.jpg" alt="Suma Teológica" class="hover:brightness-50 transition-all w-full md:w-auto rounded-lg">
      </a>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import Slider from "@/components/slider.vue";
import Avatar from "primevue/avatar";
import LatestArticles from "@/components/latestarticles.vue";
import socialbuttons from "@/components/socialbuttons.vue";

export default {
  components: {
    Slider,
    LatestArticles,
    socialbuttons,
    Avatar,
  },
  data() {
    return {
      sliderImages: [
        "/slider/1.jpg",
        "/slider/2.jpg",
        "/slider/3.jpg",
        "/slider/4.jpg",
      ],
      padroeiros: [
        { image: "/public/padroeiros/santa-maria-das-vitorias.jpg", name: "Santa Maria das Vitórias" },
        { image: "/public/padroeiros/sao-pio-x.jpg", name: "São Pio X" },
        { image: "/public/padroeiros/anchieta.jpg", name: "São José de Anchieta" },
      ],
    };
  },
  setup() {
    const stickyElement = ref(null);
    const stickyContainer = ref(null);

    const handleScroll = () => {
      const container = stickyContainer.value;
      const sticky = stickyElement.value;

      const containerRect = container.getBoundingClientRect();
      const stickyRect = sticky.getBoundingClientRect();

      sticky.style.width = `${containerRect.width}px`;

      if (containerRect.top <= 0 && containerRect.bottom > stickyRect.height) {
        sticky.style.position = "fixed";
        sticky.style.top = "5rem";
        sticky.style.bottom = "unset";
      }
      else if (containerRect.bottom <= stickyRect.height) {
        sticky.style.position = "absolute";
        sticky.style.top = "unset";
        sticky.style.bottom = "0";
      }
      else {
        sticky.style.position = "relative";
        sticky.style.top = "unset";
        sticky.style.bottom = "unset";
        sticky.style.width = "unset";
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return {
      stickyElement,
      stickyContainer,
    };
  },
};
</script>
