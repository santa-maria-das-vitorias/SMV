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

    <div class="flex flex-col items-center w-full md:px-10 my-10">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-12 w-full mt-20">
        <div class="md:col-span-1 card bg-secondary-200 mx-5">
          <div class="mt-40">
              <img src="/home/eventos/brasao-papa-francisco.svg" alt="Brasão Papa Francisco" class="w-28 h-28 mx-auto my-auto">
              <br>
              <h3 class="text-center text-surface-900 font-light text-3xl mx-7">Ó Roma eterna dos mártires e dos santos, acolhe nossos cantos!</h3>
          </div>
        </div>

        <div class="md:col-span-3 card bg-primary-100">
          <div>
            <h1 class="text-center font-bold text-4xl">Eventos</h1>
            <hr class="border-t-2 border-primary-contrast">
          </div>

          <div class="flex flex-col items-center w-full md:px-4 md:py-10">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-4 w-full mt-10">
              <a href="/#" class="md:col-span-1 card bg-primary-50 transform hover:scale-105 transition duration-300 ">
                <div>
                  <img src="/home/eventos/ns-do-rosario.webp" class="rounded-full p-2 aspect-square w-48 h-30 ">
                  <h2 class="text-center font-bold text-lg tracking-tighter">Rosário Mariano</h2>
                  <p class="text-center text-base my-5">Venha recitar o Terço Mariano antes da Santa Missa.</p>
                  
                </div>
              </a>

              <a href="/#" class="md:col-span-1 card bg-primary-50 transform hover:scale-105 transition duration-300 ">
                <div >
                  <img src="/home/eventos/CM.jpeg" class="rounded-full p-2 w-48 h-30">
                  <h2 class="text-center font-bold text-lg tracking-tighter">Congregação Mariana</h2>
                  <p class="text-center text-base my-5">Participe da confraria da Congregação Mariana, com reuniões mensais, às 17h dos primeiros sábados do mês.</p>
                </div>
              </a>
              <a href="/#" class="md:col-span-1 card bg-primary-50 transform hover:scale-105 transition duration-300 ">
                <div >
                  <img src="/home/eventos/congregatio-bonae-mortis.jpg" class="rounded-full p-2 w-48 h-30">
                  <h2 class="text-center font-bold text-lg tracking-tighter">Confraria da Boa Morte</h2>
                  <p class="text-center text-base my-5">Participe da confraria da Congregação da Boa Morte, que se reúne às primeiras terças do mês numa missa votiva para pedir a graça de uma boa morte quando o calendário litúrgico permite.</p>

                </div>
              </a>

              <a href="/#" class="md:col-span-1 card bg-primary-50 transform hover:scale-105 transition duration-300 ">
                <div >
                  <img src="/home/eventos/santa-ines.webp" class="rounded-full p-2 aspect-square w-48 h-30">
                  <h2 class="text-center font-bold text-lg tracking-tighter">Pia União das Filhas de Maria</h2>
                  <p class="text-center text-base my-5">Esta congregação se reúne no dia tal.</p>
                </div>
              </a>
              <a href="/#" class="md:col-span-1 card bg-primary-50 transform hover:scale-105 transition duration-300 ">
                <div class="">
                  <img src="/home/eventos/catequese.jpg" class="rounded-full p-2 aspect-auto w-48 h-30">
                  <h2 class="text-center font-bold text-lg tracking-tighter">Catequese Básica a crianças</h2>
                  <p class="text-center text-base my-5">Esta congregação se reúne no dia tal.</p>
                </div>
              </a>

            </div>

          </div>
       </div>

       <div class="md:col-span-1 card bg-secondary-200 mx-5">
        <div class="mt-40">
            <img src="/home/eventos/papa-agatao.png" alt="Fala do Papa Agatão" class="w-28 h-28 mx-auto mt-2">
            <br>
            <h3 class="text-center text-surface-900 font-light text-3xl mx-12">Quem reza com herege é herege.</h3>
            <h3 class="text-center text-surface-900 font-light text-3xl mx-7 italic my-10"> Papa Agatão</h3>
          </div>
      </div>

      </div>

      <!-- GALERIA DE FOTOS-->
      <div class=" bg-secondary-200 flex min-h-[300px] items-center w-full  my-1 card mt-40">
        <div class="  w-full max-w-4x1 flex items-center justify-center object-cover ">
          <div class=" m-5 w-full mt-5 flex items-center justify-center max-w-4xl p-4 bg-transparent ">
            <div class="overflow-hidden relative">
              <carousel
                
                @prevImage = "prevImage"
                @nextImage = "nextImage"
              >
                <Transition :name="transitionName" mode="out-in">
                  <div :key="slidesPictures[visibleSlide]">
                    <carousel-slide v-for="(slide, index) in slidesPictures"
                      :key="slide"
                      :index="index" 
                      :visibleSlide = "visibleSlide">
                      <img :src="slide.slide" alt="slide"
                      class="w-full min-w-[400px] h-auto object-cover rounded-rounded-border" />
                      <p class="text-lg font-semibold w-full h-auto object-cover flex items-center justify-center"> {{slide.name}} </p>
                    </carousel-slide>
                  </div>
                </Transition>
              </carousel>
            </div>              
          </div>

         <!-- <div class="bg-secondary-200 m-auto h-auto mt-20 flex items-center justify-center md:col-span-1 card p-4">
            <div class="overflow-hidden relative">
              <carousel
                
                @prevImage = "prevImage"
                @nextImage = "nextImage"
              >
                <Transition :name="transitionName" mode="out-in">
                  <div :key="slidesHistory[visibleSlide]">
                    <carousel-slide v-for="(slide, index) in slidesHistory"
                      :key="slide"
                      :index="index" 
                      :visibleSlide = "visibleSlide">
                      <img :src="slidesHistory" alt="slide"/>
                    </carousel-slide>
                  </div>
                </Transition>
              </carousel>
            </div>
          </div>  -->
        </div>  
    </div>
    <!--FIM DE GALERIA DE FOTOS-->


    
  </div>

  <audio ref="bgMusic" :src="audioSrc" autoplay loop>
      
      Seu navegador não suporta áudio.
    </audio>



  <!--FIM DE RODAPÉ-->

  </div>
  <!--RODAPÉ INÍCIO-->
    
  <footer class="w-full">
    <div class=" bg-primary-600 min-h-10 border-t-4 border-t-secondary-500 text-surface-0 flex justify-between items-center px-4 py-2 mt-auto">
      <div class="w-full container mx-auto px-6 md:px-12">
        <div class=" w-full flex flex-col md:flex-row justify-between items-center">
        

          <!-- Botão para iniciar ou pausar a música -->
          <button @click="toggleMusic" class="bg-blue-500 text-white px-50 py-50 rounded mx-4">
            {{ isPlaying ? "&#10074; Pausar" : "&#9197; Tocar"	 }}
          </button>
       
        <!-- Links de Navegação -->
          <nav class="flex space-x-6">
          <a href="#" class="hover:text-gray-300">Início</a>
          <a href="#" class="hover:text-gray-300">Sobre</a>
          <a href="#" class="hover:text-gray-300">Contato</a>
          </nav>

       
          <div class="mt-4 md:mt-0">
          <p class="text-sm mx-2">© {{ new Date().getFullYear() }} Capela Santa Maria das Vitórias. Todos os direitos reservados.</p>
          </div>

        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  import Carousel from '@/components/Home/carousel.vue';
  import CarouselSlide from '@/components/Home/carouselSlide.vue';
  import { ref, computed, onMounted, onUnmounted } from "vue";
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
      Carousel,
      CarouselSlide,
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

      const visibleSlide = ref(0);
      const transitionDirection = ref('next');
      const transitionName = computed(() =>{
        return transitionDirection.value === 'next' ? 'slide-next' : 'slide-prev';
      });

      const isPlaying = ref(false);

      const audioSrc = "/audio/Laudate-Dominum.mp3";

      const audio = ref(null);

      

      

      // Função para alternar entre play e pause
    const toggleMusic = () => {
      // Usando document.querySelector diretamente para verificar se conseguimos acessar o áudio
      const audioElement = document.querySelector('audio');

      // Verifique se o áudio foi encontrado
      if (!audioElement) {
        console.error("Áudio não encontrado!");
        return;
      }

      // Alterna o estado de reprodução
      if (audioElement.paused) {
        audioElement.play().then(() => {
          isPlaying.value = true;
        }).catch((error) => {
          console.error("Erro ao tentar tocar o áudio:", error);
        });
      } else {
        audioElement.pause();
        isPlaying.value = false;
      }
    };

      // Usamos `onMounted` para garantir que o DOM tenha sido montado antes de tentar acessar o áudio
          onMounted(() => {
      const audioElement = document.querySelector('audio');
      if (!audioElement) {
        console.error("Áudio não encontrado após o componente ser montado!");
      }
    });

      

      const slidesPictures = ref([]);
      //const slidesHistory = ref([]);

      slidesPictures.value = [
        {slide:"home/carrossel/batalha-dos-guararapes.jpg", name:"Batalha dos Guararapes"},
        {slide:"home/carrossel/primeira-missa.jpg", name:"Primeira Missa"},
        {slide: "home/carrossel/o-grito-do-ipiranga.jpg", name:"O Grito do Ipiranga"},
      ];

      //slidesHistory.value = []

      
      const nextImage = () =>{
        transitionDirection.value = 'next';
        if(visibleSlide.value >= slidesPictures.value.length - 1){
          visibleSlide.value = 0;
        }else{
          visibleSlide.value ++;
        };        
      };
      const prevImage = () => {
        transitionDirection.value = 'prev';
        if(visibleSlide.value <= 0){
          visibleSlide.value = slidesPictures.value.length - 1;
        }else{
          visibleSlide.value --;
        }
      };


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
        visibleSlide,
        nextImage,
        prevImage,
        slidesPictures,
        audioSrc,
        isPlaying,
        //slidesHistory,
        transitionName,
        toggleMusic,
      };
    },
  };
</script>


<style lang="css" scoped>
/* Animação para o slide indo para frente */
.slide-next-enter-active,
.slide-next-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-next-enter,
.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-100%); /* Move o slide atual para a esquerda e o próximo vem da direita */
}

.slide-next-enter-to,
.slide-next-leave {
  opacity: 1;
  transform: translateX(0); /* O próximo vai para o centro */
  transition: transform 0.5s ease, opacity 0.5s ease;
}

/* Animação para o slide indo para trás */
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-prev-enter,
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(100%); /* Move o slide atual para a direita e o próximo vem da esquerda */
}

.slide-prev-enter-to,
.slide-prev-leave {
  opacity: 1;
  transform: translateX(0); /* O próximo vai para o centro */
  transition: transform 0.5s ease, opacity 0.5s ease;
}

</style>