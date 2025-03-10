<template>
  <div>
    <div v-if="category && paginatedArticles.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="article in paginatedArticles" :key="article.id" class="border rounded-lg overflow-hidden">
        <a :href="`/artigos/${article.slug}/${article.slug}`">
          <div class="w-full h-48 bg-gray-300" :style="{ backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : '' }"></div>
        </a>
        <div class="p-4">
          <a :href="`/artigos/${article.slug}/${article.slug}`" class="text-lg font-semibold hover:underline">
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
    <div v-if="category && category.articles.length > articlesPerPage" class="flex justify-center items-center mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn-primary mx-2"><i class="pi pi-arrow-left" /></button>
      <span class="mx-2">{{ currentPage }} - {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn-primary mx-2"><i class="pi pi-arrow-right" /></button>
    </div>
  </div>
</template>

<script>
import { fetchArticlesPerCategory } from '@/api/fetchArticlesPerCategory';

export default {
  props: {
    categorySlug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      category: null,
      currentPage: 1,
      articlesPerPage: 6,
    };
  },
  computed: {
    paginatedArticles() {
      if (!this.category || !this.category.articles) return [];
      const start = (this.currentPage - 1) * this.articlesPerPage;
      const end = start + this.articlesPerPage;
      return this.category.articles.slice(start, end);
    },
    totalPages() {
      if (!this.category || !this.category.articles) return 1;
      return Math.ceil(this.category.articles.length / this.articlesPerPage);
    },
  },
  created() {
    this.loadCategory();
  },
  methods: {
    async loadCategory() {
      try {
        const articles = await fetchArticlesPerCategory({ slug: this.categorySlug });
        this.category = { articles };
      } catch (error) {
        console.error('Erro ao carregar categoria:', error);
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