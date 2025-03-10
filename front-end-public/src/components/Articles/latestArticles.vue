<template>
  <div v-if="filteredArticles.length">
    <div v-for="article in filteredArticles" :key="article.id">
      <a
        :href="`/artigos/${article.categories[0]?.slug}/${generateSlug(article.title)}`"
      >
        <p class="py-4 px-2 hover:bg-surface-50 hover:text-primary-500 transition-all ">
          {{ article.title }}
        </p>
      </a>
    </div>    
  </div>
  <div v-else class="text-center py-4">
    <p>Nenhum artigo encontrado.</p>
  </div>
</template>

<script>
import { fetchLatestArticles } from '@/api/fetchLatestArticles';

export default {
  props: {
    category: {
      type: String,
      default: null,
    },
    slice: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      latestArticles: [],
    };
  },
  async created() {
    try {
      this.latestArticles = await fetchLatestArticles();
    } catch (error) {
      console.error('Erro ao carregar os artigos mais recentes:', error);
    }
  },
  computed: {
    filteredArticles() {
      const filtered = this.category
        ? this.latestArticles.filter(article => article.categories.some(cat => cat.slug === this.category))
        : this.latestArticles;
      return filtered.slice(0, this.slice).sort((a, b) => new Date(b.date) - new Date(a.date));
    },
  },
  methods: {
    generateSlug(title) {
      if (!title) return '';
      return title
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
    },
  },
};
</script>