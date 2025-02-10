<template>
  <div class="flex flex-col items-center w-full md:px-10">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 w-full my-20">

      <div class="hidden md:flex flex-col gap-10">
        <div class="flex flex-col items-center gap-5 card">
          <h1 class="text-center mt-2 mb-5">Categorias de Artigo</h1>
          <allCategories />
        </div>
      </div>

      <div class="md:col-span-2 card-padding w-full flex flex-col items-center overflow-hidden ">
        <SingleCategory :categorySlug="$route.params.categoria" />
      </div>
      
      <div class="hidden md:block md:col-span-1 h-full relative">
        <div class="flex flex-col items-center gap-5 card">
          <h1 class="text-center mt-2 mb-5">Artigos recentes</h1>
          <latestArticles />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleCategory from "@/components/Articles/singleCategory.vue";
import allCategories from "@/components/Articles/allCategories.vue";
import latestArticles from "@/components/Articles/latestArticles.vue";

export default {
  components: {
    SingleCategory,
    latestArticles,
    allCategories
  },
  created() {
    console.log('Slug from route:', this.$route.params.slug);
  }
};
</script>