<template>
  <div>
    <div v-if="categories.length">
      <div v-for="category in categories" :key="category.id">
        <a :href="`/${category.slug}/`">
          <p
            class="py-4 px-2 hover:bg-surface-50 hover:text-primary-500 transition-all"
          >
          {{ category.title }}
          </p>
        </a>
      </div>
    </div>
    <p v-else>Nenhum artigo</p>
  </div>
</template>

<script>
import allCategories from '@/api/data/allCategories.json';

export default {
  data() {
    return {
      categories: allCategories,
    };
  },
};
</script>
