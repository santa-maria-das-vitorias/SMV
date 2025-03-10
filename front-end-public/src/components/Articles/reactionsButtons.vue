<template>
  <div>
    <div class="flex gap-10">
      <button 
        @click="react('like')" 
        :disabled="isProcessing || !canReact('like')"
        :class="{'brightness-90 scale-75': isProcessing || !canReact('like'), ' bg-surface-200': currentReaction === 'like', 'bg-gray-300': currentReaction === 'like'}" 
        class="transition-all active:scale-90 p-2 rounded-full"
      >
        👍 {{ like }}
      </button>
      <button 
        @click="react('love')" 
        :disabled="isProcessing || !canReact('love')"
        :class="{'brightness-90 scale-75': isProcessing || !canReact('love'), ' bg-surface-200': currentReaction === 'love', 'bg-gray-300': currentReaction === 'love'}" 
        class="transition-all active:scale-90 p-2 rounded-full"
      >
        ❤️ {{ love }}
      </button>
      <button 
        @click="react('surprised')" 
        :disabled="isProcessing || !canReact('surprised')"
        :class="{'brightness-90 scale-75': isProcessing || !canReact('surprised'), ' bg-surface-200': currentReaction === 'surprised', 'bg-gray-300': currentReaction === 'surprised'}" 
        class="transition-all active:scale-90 p-2 rounded-full"
      >
        😮 {{ surprised }}
      </button>
      <button 
        @click="react('sad')" 
        :disabled="isProcessing || !canReact('sad')"
        :class="{'brightness-90 scale-75': isProcessing || !canReact('sad'), ' bg-surface-200': currentReaction === 'sad', 'bg-gray-300': currentReaction === 'sad'}" 
        class="transition-all active:scale-90 p-2 rounded-full"
      >
        😢 {{ sad }}
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
      like: 0,
      love: 0,
      surprised: 0,
      sad: 0,
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
        this.like = data.reactions.like;
        this.love = data.reactions.love;
        this.surprised = data.reactions.surprised;
        this.sad = data.reactions.sad;
        this.visits = data.visits;
      } catch (error) {
        console.error('Erro ao carregar reações:', error);
      }
    },
    async react(reaction) {
      if (this.isProcessing || !this.canReact(reaction)) {
        return;
      }

      this.isProcessing = true;

      try {
        const data = await addReactionArticle({ articleSlug: this.articleSlug, reactionType: reaction });

        this.like = data.reactions.like;
        this.love = data.reactions.love;
        this.surprised = data.reactions.surprised;
        this.sad = data.reactions.sad;
        this.visits = data.visits;

        if (this.currentReaction === reaction) {
          this.currentReaction = null;
        } else {
          this.currentReaction = reaction;
        }

        localStorage.setItem(`lastReaction_${this.articleSlug}_${reaction}`, new Date().getTime());
      } catch (error) {
        console.error('Erro ao adicionar reação:', error);
      } finally {
        this.isProcessing = false;
      }
    },
    async incrementVisitIfNeeded() {
      const lastVisit = localStorage.getItem(`lastVisit_${this.articleSlug}`);
      const now = new Date().getTime();

      if (!lastVisit || now - lastVisit > 30 * 60 * 1000) { // 30 minutes
        try {
          await addArticleVisit({ articleSlug: this.articleSlug });
          localStorage.setItem(`lastVisit_${this.articleSlug}`, now);
          this.loadReactions(); // Refresh stats after incrementing visit
        } catch (error) {
          console.error('Erro ao incrementar visita:', error);
        }
      }
    },
    canReact(reaction) {
      const lastReaction = localStorage.getItem(`lastReaction_${this.articleSlug}_${reaction}`);
      const now = new Date().getTime();
      return !lastReaction || now - lastReaction > 12 * 60 * 60 * 1000; // 12 hours
    }
  },
};
</script>