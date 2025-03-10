<template>
  <div>
    <div v-if="paginatedArticles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="article in paginatedArticles" :key="article.id" class="border rounded-lg overflow-hidden">
        <a :href="`/artigos/${article.categoriaslug}/${article.slug}`">
          <div class="w-full h-48 bg-gray-300" :style="{ backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : '' }"></div>
        </a>
        <div class="p-4">
          <a :href="`/artigos/${article.categoriaslug}/${article.slug}`" class="text-lg font-semibold hover:underline">
            {{ article.title }}
          </a>
          <p class="text-gray-600">{{ formatDate(article.date) }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center" v-else>
      <p>Nenhum artigo encontrado.</p>
      <button @click="goBack" class="btn-primary mt-4">Voltar para o início</button>
    </div>
    <div v-if="articles.length > articlesPerPage" class="flex justify-center items-center mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn-primary mx-2"><i class="pi pi-arrow-left" /></button>
      <span class="mx-2">{{ currentPage }} - {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn-primary mx-2"><i class="pi pi-arrow-right" /></button>
    </div>
  </div>
</template>

<script>
import { fetchLatestArticlesMajor } from '@/api/fetchLatestArticlesMajor.js';

export default {
  data() {
    return {
      articles: [],
      currentPage: 1,
      articlesPerPage: 6,
    };
  },
  computed: {
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.articlesPerPage;
      const end = start + this.articlesPerPage;
      return this.articles.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.articles.length / this.articlesPerPage);
    },
  },
  created() {
    this.loadArticles();
  },
  methods: {
    async loadArticles() {
      try {
        const data = await fetchLatestArticlesMajor();
        this.articles = data;
      } catch (error) {
        console.error('Erro ao carregar artigos:', error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    goBack() {
      this.$router.push('/');
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>