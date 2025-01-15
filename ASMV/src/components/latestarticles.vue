<template>
  <div v-if="sortedArticles.length">
    <div v-for="article in sortedArticles" :key="article.title">
      <router-link
        :to="`/Artigos/${generateSlug(article.category)}/${generateSlug(article.title)}`" 
        class=""
      >
        <p class="py-4 px-2 hover:bg-surface-50 hover:text-primary-500 transition-all ">
          {{ article.title }}
        </p>
      </router-link>
    </div>    
  </div>
  <div v-else class="text-center py-4">
    <p>Nenhum artigo encontrado.</p>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sampleArticles: [
        { title: "Como fortalecer a fé no cotidiano", date: new Date('2023-12-01T10:00:00Z'), category:"Vida espiritual" },
        { title: "A história de São José de Anchieta", date: new Date('2023-11-25T15:30:00Z'), category:"Vida dos santos" },
        { title: "Santa Maria das Vitórias: Um exemplo de devoção", date: new Date('2023-11-30T08:45:00Z'), category:"História Local" },
      ],      
    };
  },
  computed: {
    sortedArticles() {
      return this.sampleArticles.slice().sort((a, b) => b.date - a.date)      
    },
  },
  methods: {
    generateSlug(title) {
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

