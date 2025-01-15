<template>
  <div v-if="filteredArticles.length">
    <div v-for="article in filteredArticles" :key="article.title">
      <a
        :href="`/artigos/${generateSlug(article.category)}/${generateSlug(article.title)}`" 
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
    category: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      sampleArticles: [
        { 
          title: "Os fundamentos da defesa da fé cristã", 
          category: "Apologética", 
          date: new Date("2023-12-01T10:00:00Z") 
        },
        { 
          title: "Uma análise crítica sobre o relativismo moral", 
          category: "Crítica e Doutrina", 
          date: new Date("2023-12-03T09:45:00Z") 
        },
        { 
          title: "As virtudes na vida cotidiana: reflexões católicas", 
          category: "Crônica Católica", 
          date: new Date("2023-12-04T18:00:00Z") 
        },
        { 
          title: "O catecismo e sua aplicação na vida cristã", 
          category: "Doutrina", 
          date: new Date("2023-12-05T11:15:00Z") 
        },
        { 
          title: "Os exercícios espirituais de Santo Inácio de Loyola", 
          category: "Espiritualidade", 
          date: new Date("2023-12-06T08:00:00Z") 
        },
        { 
          title: "A ética de Aristóteles e a visão cristã", 
          category: "Filosofia", 
          date: new Date("2023-12-07T16:20:00Z") 
        },
        { 
          title: "O papel da Igreja na colonização do Brasil", 
          category: "História", 
          date: new Date("2023-12-08T10:45:00Z") 
        },
        { 
          title: "O pensamento católico de Alceu Amoroso Lima", 
          category: "Pensamento Brasileiro", 
          date: new Date("2023-12-09T15:00:00Z") 
        },
      ],
    };
  },
  computed: {
    filteredArticles() {
      const filtered = this.category
        ? this.sampleArticles.filter(article => article.category === this.category)
        : this.sampleArticles;
      return filtered.slice().sort((a, b) => b.date - a.date);
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
