<template>
  <div>
    <Slider :images="sliderImages" />
    <div class="flex flex-col items-center w-full md:px-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 w-full mt-20">
        <div class="md:col-span-1 card">
          <h1 class="text-center mt-2">Nossos Padroeiros</h1>
          <div class="flex flex-col items-center mt-10 gap-8">
            <div v-for="padroeiro in padroeiros" :key="padroeiro.image" class="flex flex-col items-center">
              <img :src="padroeiro.image" class="w-48 aspect-square rounded-full" />
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

    <div class="mt-40 bg-primary-500 p-4 py-20">
      <h1 class="text-center text-white mt-4">
        “Aquele que só busca palavras não terá nada; mas o que é possuidor de entendimento ama a sua alma, e o conservador da prudência achará bens.”
      </h1>
      <h2 class="text-center mt-4 text-white">
        (Provérbios, 19, 7-8)
      </h2>
    </div>

    <div class="flex flex-col md:flex-row md:items-center justify-center gap-8 mt-40 md:px-10 w-full">
      <a href="/calendario-romano-tradicional" class="w-full md:w-1/2">
        <img src="/home/calendario-liturgico-tradicional.jpg" alt="Calendário Romano Tradicional" class="hover:brightness-50 transition-all w-full rounded-lg">
      </a>
      <a href="/suma-teologica" class="w-full md:w-1/2">
        <img src="/home/suma-teologica.jpg" alt="Suma Teológica" class="hover:brightness-50 transition-all w-full  rounded-lg">
      </a>
    </div>

    <div class="bg-secondary-200 min-h-screen mt-40 flex items-center justify-center">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 p-2 md:p-8">
        <div
          v-for="category in categories"
          :key="category.name"
          class="bg-white rounded-lg shadow-md overflow-hidden md:flex"
        >
          <div class="w-full md:w-1/3 h-48 md:h-full overflow-hidden">
            <img
              :src="category.image"
              :alt="category.name"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="w-full md:w-2/3 p-4 flex flex-col">
            <h1 class="text-lg font-bold text-left ml-2 py-4">
              {{ category.name }}
            </h1>
            <LatestArticles :category="category.name" />
            <hr class="my-4">
            <router-link
              :to="`/${category.name.toLowerCase().replace(/ /g, '-')}`"
              class="btn-primary"
            >
              Ver todos os artigos
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-40 p-4 py-20 flex flex-col items-center">
      <img src="/home/ornamento-topo.svg" alt="ornamentos em arabesco" class="w-28 h-28 mx-auto mb-2">
      <h1 class="text-center border-t border-b border-secondary-500 md:w-5/6 w-full py-2 pt-4">
        Louvemos aos grandes homens, e aos nossos pais em sua geração
      </h1>
      <img src="/home/ornamento-topo.svg" alt="ornamentos em arabesco" class="w-28 h-28 mx-auto mt-2 rotate-180">
    </div>

    <div class="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-6 gap-6">
      <div v-for="homens in homens" :key="homens.image" class="flex flex-col items-center justify-center">
        <img :src="homens.image" class="w-48 aspect-square rounded-full" />
        <h2 class="text-center font-bold">{{ homens.name }}</h2>
        <div class="text-center text-surface-600 font-light">{{ homens.date }}</div>
      </div>

    </div>

    <div class="bg-primary-500 min-h-screen mt-40 flex items-center justify-center p-5 md:p-32">
      <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
        <div v-for="(card, index) in cards" :key="card.title" class="card grid items-start justify-center">
          <h1 class="text-lg font-bold text-center">{{ card.title }}</h1>
          <div class="p-4 flex items-center justify-center">
            <img :src="card.image" />
          </div>
          <div class="p-4 text-center">
            <p class="font-light">{{ card.description }}</p>
            <hr class="my-4">
            <p class="font-light mt-2">{{ card.footer }}</p>
            <div v-if="index === cards.length - 1" class="mt-4">
              <router-link to="/contato" class="btn-primary flex items-center justify-center">Leia mais <i class="ml-2 pi pi-arrow-right"></i></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted, onUnmounted } from "vue";
  import Slider from "@/components/Home/slider.vue";
  import Avatar from "primevue/avatar";
  import LatestArticles from "@/components/Articles/latestArticles.vue";
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
          "home/slider/1.jpg",
          "home/slider/2.jpg",
          "home/slider/3.jpg",
          "home/slider/4.jpg",
        ],
        padroeiros: [
          { image: "home/padroeiros/santa-maria-das-vitorias.jpg", name: "Santa Maria das Vitórias" },
          { image: "home/padroeiros/sao-pio-x.jpg", name: "São Pio X" },
          { image: "home/padroeiros/anchieta.jpg", name: "São José de Anchieta" },
        ],
        categories: [
          { name: "Crítica e Doutrina", image: "home/categories/critica-e-doutrina.jpg" },
          { name: "Apologética", image: "home/categories/apologetica.jpg" },
          { name: "Pensamento Brasileiro", image: "home/categories/pensamento-brasileiro.jpg" },
          { name: "Crônica Católica", image: "home/categories/cronica-catolica.jpg" },
        ],
        homens: [
          { image: "home/homens/santo-agostinho.png", date: "354-430", name: "Santo Agostinho" },
          { image: "home/homens/cardeal-merry-del-val.png", date: "1865-1930", name: "Cardeal Merry del Val" },
          { image: "home/homens/jacques-bossuet.png", date: "1627-1704", name: "Jacques Bossuet" },
          { image: "home/homens/d-lefebvre.png", date: "1905-1991", name: "D. Lefebvre" },
          { image: "home/homens/d-mayer.png", date: "1904-1991", name: "D. Mayer" },
          { image: "home/homens/d-pestana.png", date: "1928-2011", name: "D. Pestana" },
        ],
        cards: [
          {
            title: "A vocação do Brasil",
            image: "/home/cards/anchieta.png",
            description: "“Rei é Cristo, e seu império se estende na terra, nas ondas, no espaço, e de direito inalienável reclama para si as plagas brasílicas. Que teu nome e teu preço e tua glória inefável se espalhe pelo mundo inteiro, ó Cristo, honra dos céus, e a plaga austral ecoe eternamente, Jesus, o teu nome!”",
            footer: "(De Gestis Mendi de Saa, Beato Pe. Anchieta)",
          },
          {
            title: "Missal romano tradicional",
            image: "/home/cards/sao-pio-v.png",
            description: "Se alguém, contudo, tiver a audácia de atentar contra estas disposições (referentes ao missal romano tradicional), saiba que incorrerá na indignação de Deus Todo-Poderoso e de seus bem-aventurados apóstolos Pedro e Paulo.",
            footer: "São Pio V, Bula Quo Primum Tempore",
          },
          {
            title: "Somos contra o Liberalismo e a Modernidade",
            image: "/home/cards/pio-ix.png",
            description: "Proposições condenadas pelo Syllabus de Pio IX: “Efetivamente, é falso que a liberdade civil de qualquer culto, assim como a plena potestade concedida a todos de manifestar aberta e publicamente quaisquer opiniões e pensamentos, conduza mais facilmente à corrupção dos costumes e do espírito dos povos, bem como à propagação da peste do indiferentismo“.",
            footer: "O Romano Pontífice pode e deve reconciliar-se e transigir com o progresso, com o liberalismo e com a civilização moderna.",
          },
          {
            title: "Compreenda o problema da reforma litúrgica",
            image: "/home/cards/reforma-liturgica.png",
            description: "Leia o breve exame crítico da missa nova dos cardeais Ottaviani e Bacci.",
            footer: "Tendo cuidadosamente examinado e após longa oração e reflexão, os os cardeais Ottaviani e Bacci sentiram-se obrigados perante Deus e a Igreja a apresentar suas considerações.",
            link: "/link-card-4"
          }
        ]
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
        } else if (containerRect.bottom <= stickyRect.height) {
          sticky.style.position = "absolute";
          sticky.style.top = "unset";
          sticky.style.bottom = "0";
        } else {
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
