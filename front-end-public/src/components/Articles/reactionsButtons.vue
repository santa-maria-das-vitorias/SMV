<template>
  <div>
    <div class="flex gap-10">
      <button 
        v-for="reaction in reactions" 
        :key="reaction.type"
        @click="react(reaction.type)" 
        :disabled="isProcessing || !canReact(reaction.type)"
        :class="{
          'bg-surface-300': isProcessing || !canReact(reaction.type), 
          'bg-surface-200': currentReaction === reaction.type, 
          'bg-gray-300': currentReaction === reaction.type
        }" 
        class="transition-all active:scale-90 p-2 rounded-full"
      >
        {{ reaction.icon }} {{ reaction.count }}
      </button>
    </div>
    <div class="mt-4 text-center">
      <p>Total de visitas: {{ visits }}</p>
    </div>
  </div>
</template>

<script>
import { fetchReactionsArticle } from '@/api/fetchReactionsArticle';
import { addReactionArticle } from '@/api/addReactionArticle';
import { addArticleVisit } from '@/api/addArticleVisit';

export default {
  props: {
    articleSlug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      reactions: [
        { type: 'like', icon: '👍', count: 0 },
        { type: 'love', icon: '❤️', count: 0 },
        { type: 'surprised', icon: '😮', count: 0 },
        { type: 'sad', icon: '😢', count: 0 },
      ],
      currentReaction: null,
      visits: 0,
      isProcessing: false,
    };
  },
  created() {
    this.loadReactions();
    this.incrementVisitIfNeeded();
  },
  methods: {
    async loadReactions() {
      try {
        const data = await fetchReactionsArticle({ articleSlug: this.articleSlug });
        this.reactions.forEach(reaction => {
          reaction.count = data.reactions[reaction.type];
        });
        this.visits = data.visits;
      } catch (error) {
        console.error('Erro ao carregar reações:', error);
      }
    },
    async react(reactionType) {
      if (this.isProcessing || !this.canReact(reactionType)) {
        return;
      }

      this.isProcessing = true;

      try {
        const data = await addReactionArticle({ articleSlug: this.articleSlug, reactionType });

        this.reactions.forEach(reaction => {
          reaction.count = data.reactions[reaction.type];
        });
        this.visits = data.visits;

        if (this.currentReaction === reactionType) {
          this.currentReaction = null;
        } else {
          this.currentReaction = reactionType;
        }

        localStorage.setItem(`lastReaction_${this.articleSlug}_${reactionType}`, new Date().getTime());
      } catch (error) {
        console.error('Erro ao adicionar reação:', error);
      } finally {
        this.isProcessing = false;
      }
    },
    async incrementVisitIfNeeded() {
      const lastVisit = localStorage.getItem(`lastVisit_${this.articleSlug}`);
      const now = new Date().getTime();

      if (!lastVisit || now - lastVisit > 12 * 60 * 60 * 1000) { // 30 minutes
        try {
          await addArticleVisit({ articleSlug: this.articleSlug });
          localStorage.setItem(`lastVisit_${this.articleSlug}`, now);
          this.loadReactions(); // Refresh stats after incrementing visit
        } catch (error) {
          console.error('Erro ao incrementar visita:', error);
        }
      }
    },
    canReact(reactionType) {
      const lastReaction = localStorage.getItem(`lastReaction_${this.articleSlug}_${reactionType}`);
      const now = new Date().getTime();
      return !lastReaction || now - lastReaction > 12 * 60 * 60 * 1000; // 12 hours
    }
  },
};
</script>