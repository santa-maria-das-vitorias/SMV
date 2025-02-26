<template>
  <div class="flex flex-col items-center w-full md:px-10">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 w-full mt-20">
      <div ref="stickyElement" class="hidden md:flex flex-col gap-10">
        <div class="card p-4">
          <h1 class="text-center mt-2 mb-5"> Categorias de Artigo </h1>
          <allCategories />
        </div>
        <div class="card p-4">
          <h1 class="text-center mt-2 mb-5"> Artigos recentes </h1>
          <latestArticles />
        </div>
      </div>
      <div class="md:col-span-2 card-padding w-full flex flex-col items-center overflow-hidden ">
        <SingleArticle :slug="$route.params.slug" />
      </div>
      
      <div ref="stickyContainer" class="hidden md:block md:col-span-1 h-full relative">
        <div ref="stickyElement" >
          <div class="flex flex-col items-center gap-5 card ">
            <h1 class="text-center mt-2 mb-5">Compartilhe</h1>
            <ShareButtons />
          </div>
          <div ref="stickyElement" class="flex flex-col items-center gap-5 card mt-5">
            <ReactionsButtons :articleSlug="$route.params.slug" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted, onUnmounted } from "vue";
  import allCategories from "@/components/Articles/allCategories.vue";
  import latestArticles from "@/components/Articles/latestArticles.vue";
  import SingleArticle from "@/components/Articles/singleArticle.vue";
  import ShareButtons from "@/components/Articles/sharebuttons.vue";
  import { handleScroll } from "@/utils/handleScroll.js";
  import ReactionsButtons from "@/components/Articles/reactionsButtons.vue";

  export default {
    components: {
      latestArticles,
      SingleArticle,
      allCategories,
      ShareButtons,
      ReactionsButtons
    },
    props: {
      categoria: {
        type: String,
        required: true,
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
  }
</script>