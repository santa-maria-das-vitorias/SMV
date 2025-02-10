<template>
  <div>
    <div v-if="category && category.articles.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="article in category.articles" :key="article.id" class="border rounded-lg overflow-hidden">
        <a :href="`/${category.slug}/${article.slug}`">
          <div class="w-full h-48 bg-gray-300" :style="{ backgroundImage: article.imageUrl ? `url(${article.imageUrl})` : '' }"></div>
        </a>
        <div class="p-4">
          <a :href="`/${category.slug}/${article.slug}`" class="text-lg font-semibold hover:underline">
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
    };
  },
  created() {
    this.loadCategory();
  },
  methods: {
    async loadCategory() {
      try {
        const data = await fetchArticlesPerCategory({ slug: this.categorySlug });
        this.category = data;
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
  },
};
</script>

