<template>
  <div class="w-full">
    <div v-if="categories.length">
      <div v-for="category in categories" :key="category.id">
        <a :href="`/artigos/${category.slug}/`">
          <p
            class="py-4 px-2 hover:bg-surface-50 hover:text-primary-500 transition-all"
          >
          {{ category.title }}
          </p>
        </a>
      </div>
    </div>
    <p v-else>Nenhuma categoria encontrada</p>
  </div>
</template>

<script>
import { fetchAllCategories } from '@/api/fetchAllCategories';

export default {
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      try {
        const categories = await fetchAllCategories();
        this.categories = categories;
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
      }
    },
  },
};
</script>