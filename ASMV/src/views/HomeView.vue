<template>
  <div>
    <Slider :images="sliderImages" />
    <div class="flex flex-col items-center w-full md:px-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 w-full mt-20">
        <div class="md:col-span-1 card">
          <h1 class="text-center mt-2">Nossos Padroeiros</h1>
          <div class="flex flex-col items-center mt-10 gap-8">
            <div v-for="padroeiro in padroeiros" :key="padroeiro.image" @click="redirectPadroeiros" class="hover:cursor-pointer hover:scale-105 flex flex-col items-center transition-all">
              <img :src="padroeiro.image" class="w-48 aspect-square rounded-full" />
              <small>{{ padroeiro.name }}</small>
            </div>
          </div>
        </div>
        <div class="md:col-span-2 card flex flex-col items-center">
          <h1 class="text-center mt-2">Últimos Artigos</h1>
          <!-- <LatestArticles :articles="articles" /> -->
          <div class="flex flex-col items-center mt-10 prose card">
            <h2 class="text-center">Em Construção...</h2>
            <p>Desde janeiro de 2024 nossa plataforma tem passado por um processo de melhorias e restaurações devido a um ataque hacker.</p>

            <p>Estamos trabalhando arduamente para restaurar a segurança e garantir que a experiência dos nossos leitores e apoiadores seja a melhor possível.</p>

            <p>Pedimos desculpas por qualquer inconveniente e agradecemos sua paciência durante esse período de reestruturação.</p>
          </div>
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
                <a href="https://www.paypal.com/ncp/payment/TYNYLJQ33BF9U" target="_blank">
                  <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                    <i class="pi pi-paypal" /> Doe com PayPal
                  </button>
                </a>
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
              <a href="https://www.paypal.com/ncp/payment/TYNYLJQ33BF9U" target="_blank">
                <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                  <i class="pi pi-paypal" /> Doe com PayPal
                </button>
              </a>
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
              <router-link to="/carta-dos-cardeais-ottaviani-e-bacci-contra-a-promulgacao-da-missa-nova" class="btn-primary flex items-center justify-center">Leia mais <i class="ml-2 pi pi-arrow-right"></i></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid justify-center grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-5 xl:gap-12 gap-4 md:gap-0 md:px-10 lg:gap-0 lg:px-10 w-full mt-20 ">
      <div class="md:col-span-1 card bg-secondary-200 mx-5 md:my-5 lg:my-10 xl:my-0">
        <div class="my-40">
            <img src="/home/eventos/brasao-papa-francisco.svg" alt="Brasão Papa Francisco" class="w-32 h-32 md:w-32 md:h-32 lg:w-24 lg:h-24 mx-auto my-auto">
            <br>
            <h3 class="text-center text-surface-900 font-semibold text-3xl sm:text-2x1 md:text-xl mx-12 sm:mx-0">Ó Roma eterna dos mártires e dos santos, acolhe nossos cantos!</h3>
        </div>
      </div>

      <div class="md:col-span-3 card bg-primary-100 my-20 sm:my-20 md:my-0">
        <div>
          <h1 class="text-center font-bold text-4xl">Eventos</h1>
          <hr class="border-t-2 border-primary-contrast">
        </div>

        <div ref="listCOntainer" class="flex flex-col items-center w-full md:px-4 md:py-10" @scroll="handleScroll2">
          <div class="relative w-full max-w-5xl">
            <!-- Botão Esquerdo -->
            <button @click="scrollLeft" v-show="!hideButtonLeft"
              class="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white shadow-md rounded-full z-10">
              ◀
            </button>

            <!-- Carrossel -->
            <div ref="carousel"
              class="flex overflow-x-hidden scroll-smooth space-x-4 p-5">
              <div v-for="evento in events" :key="evento.id" 
                class="flex-none w-64 bg-primary-50 rounded-lg p-4 shadow-md transform hover:scale-105 transition duration-300"
                >
                <div class="flex flex-col items-center">
                  <img :src="evento.image" class="rounded-full p-2 aspect-square w-48">
                  <h2 class="text-center font-bold text-lg tracking-tighter">{{ evento.title }}</h2>
                  <p class="text-center text-base my-5">{{ evento.description }}</p>
                </div>
              </div>
            </div>

            <!-- Botão Direito -->
            <button @click="scrollRight" v-show="!hideButtonRight"
              class="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white shadow-md rounded-full z-10">
              ▶
            </button>
           </div>
        </div>                
      </div>

    <div class="md:col-span-1 card bg-secondary-200 mx-5 md:my-5 lg:my-5 xl:my-0">
      <div class="my-40">
          <img src="/home/eventos/papa-agatao.png" alt="Fala do Papa Agatão" class="w-32 h-32 md:w-32 md:h-32 lg:w-24 lg:h-24 mx-auto my-auto">
          <br>
          <h3 class="text-center text-surface-900 font-semibold text-3xl sm:text-2x1 md:text-xl mx-12 sm:mx-0">Quem reza com herege é herege.</h3>
          <h3 class="text-center text-surface-900 font-light text-3xl sm:text-xl md:text-x1 mx-7 sm:mx-0 italic my-10"> Papa Agatão</h3>
        </div>
    </div>

    </div>

    <div class="">
      <CarouselSlide />
    </div>
  </div>
</template>

<script>
import CarouselSlide from '@/components/Home/carouselSlide.vue';
import { ref, onMounted, onUnmounted } from "vue";
import Slider from "@/components/Home/slider.vue";
import Avatar from "primevue/avatar";
import LatestArticles from "@/components/Articles/latestArticles.vue";
import socialbuttons from "@/components/socialbuttons.vue";
import { handleScroll } from "@/utils/handleScroll";

export default {
  components: {
    Slider,
    LatestArticles,
    socialbuttons,
    Avatar,
    CarouselSlide,
  },
  data() {
    return {
      hideButtonLeft: false,
      hideButtonRight: false,
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
          footer: '"O Romano Pontífice pode e deve reconciliar-se e transigir com o progresso, com o liberalismo e com a civilização moderna."',
        },
        {
          title: "Compreenda o problema da reforma litúrgica",
          image: "/home/cards/reforma-liturgica.png",
          description: "Leia o breve exame crítico da missa nova dos cardeais Ottaviani e Bacci.",
          footer: "Tendo cuidadosamente examinado e após longa oração e reflexão, os os cardeais Ottaviani e Bacci sentiram-se obrigados perante Deus e a Igreja a apresentar suas considerações.",
          link: "/link-card-4"
        }
      ],
      events: [
        {
          title: "Rosário Mariano",
          image: "/home/eventos/ns-do-rosario.webp",
          name: "Nossa Senhora do Rosário",
          description: "Logo antes de cada missa diária os fiéis se reúnem com o padre na capela para recitar o Santo Terço Mariano."
        },
        {
          title: "Congregação Mariana",
          image: "/home/eventos/CM.jpeg",
          
          description: "Congrega rapazes católicos que desejam ser católicos mais perfeitos e filhos mais devotos de Nossa Senhora. Reúnem-se uma vez por mês para formações com o padre diretor e outras devoções piedosas.",
        },
        {
          title: "Confraria da Boa Morte",
          image: "/home/eventos/congregatio-bonae-mortis.jpg",
          
          description: "Esta confraria se reúne às primeiras terças de cada mês, quando o calendário permite, para assistência na missa votiva pela graça de uma boa morte.",
        },
        {
          title: "Pia União das Filhas de Maria",
          image: "/home/eventos/santa-ines.webp",
          name: "Santa Inês, Virgem e Mártir",
          description: "A Pia União das Filhas de Maria congrega moças católicas que desejam crescer na fé, na devoção a Nossa Senhora. Reúnem-se uma vez por mês para rezar, estudar a doutrina católica, sob a orientação do padre diretor.",
        },
        {
          title: "Catequese Básica",
          image: "/home/eventos/catequese.jpg",
          name: "São Francisco Xavier, Confessor",
          description: "Semanalmenteo padre dá uma aula de catequese básica a crianças aos sábados, bem como às quartas após a santa missa aos fiéis.",
        },
        {
          title: "Apostolado São Lucas",
          image: "/home/eventos/sao-lucas.jpg",
          name: "São Lucas Evangelista",
          description: "Sob os auspícios do grande médico de homens e de almas, os interessados se beneficiam com a caridade de médicos que atendem gratuitamente na capela quando há possibilidade.",
        },
        {
          title: "Apostolado Santa Zita",
          image: "/home/eventos/santa-zita.jpg",
          name: "Santa Zita, Virgem",
          description: "Aos primeiros sábados de cada mês o apostolado Santa Zita reúne-se no mesmo espírito da padroeira para realizar a limpeza da casa de Deus.",
        },
      ]
    };
  },

  methods: {
    redirectPadroeiros() {
      window.location.href = '/padroeiros';  // Redireciona para a página inicial
    },

    handleScroll2(){
      const listContainer = this.$refs.listContainer;
      const listHeight = listContainer.scrollHeight;      
      const scrollPosition = listContainer.scrollTop + listContainer.clientHeight;

      // Se o usuário chegou ao fim da lista (com uma margem de 50px)
      if (scrollPosition >= listHeight - 50) {
        this.hideButtonLeft = true;
        this.hideButtonRight = false;
      } else {
        this.hideButtonLeft = false;
        this.hideButtonRight = true;}
    },

    scrollLeft() {
      this.$refs.carousel.scrollBy({ left: -300, behavior: "smooth" });
    },
    scrollRight() {
      this.$refs.carousel.scrollBy({ left: 300, behavior: "smooth" });
    },
  },

  setup() {
    const stickyElement = ref(null);
    const stickyContainer = ref(null);

    onMounted(() => {
      window.addEventListener("scroll", () => handleScroll(stickyContainer, stickyElement));
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", () => handleScroll(stickyContainer, stickyElement));
    });

    return {
      stickyElement,
      stickyContainer,
    };
  },
};
</script>