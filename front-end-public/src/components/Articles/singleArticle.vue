<template>
  <div v-if="article" class="w-full prose flex flex-col items-center">
    <h1 class="text-center mt-8">{{ article.title }}</h1>
    
    <!-- Imagem do artigo -->
    <img v-if="article.imageUrl" :src="article.imageUrl" alt="Imagem do artigo" class="mt-4 rounded-lg shadow-lg max-w-full h-auto">
    
    <small class="text-center mt-2 w-full">
      {{ article.categories.map(category => category.title).join(' - ') }}
    </small>
    
    <div class="flex flex-col items-center mt-10 gap-8">
      <div v-html="article.content"></div>
    </div>
    
    <hr class="w-full mt-8">
    
    <p class="text-center w-full">
      {{ article.author }} - {{ new Intl.DateTimeFormat('pt-BR').format(new Date(article.date)) }}
    </p>
  </div>
  <div v-else class="text-center py-4">
    <p>{{ error }}</p>
  </div>
</template>

<script>
import { fetchSingleArticle } from "@/api/fetchSingleArticle";

export default {
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      article: null,
      error: null,
    };
  },
  async mounted() {
    try {
      this.article = await fetchSingleArticle({ slug: this.slug });
    } catch (error) {
      console.error("Erro ao carregar o artigo:", error);
      this.error =
        error.message === "Article not found"
          ? "Artigo não encontrado."
          : "Erro ao carregar o artigo. Por favor, tente novamente mais tarde.";
    }
  }
};
</script>