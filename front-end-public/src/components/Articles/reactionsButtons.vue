<template>
  <div>
    <div class="flex gap-10">
      <button 
        @click="react('like')" 
        :disabled="isProcessing"
        :class="{'brightness-90 scale-75': isProcessing, ' bg-surface-200': currentReaction === 'like', 'bg-gray-300': currentReaction === 'like'}" 
        class="transition-all active:scale-90 p-2 rounded-full"
      >
        👍 {{ like }}
      </button>
      <button 
        @click="react('love')" 
        :disabled="isProcessing"
        :class="{'brightness-90 scale-75': isProcessing, ' bg-surface-200': currentReaction === 'love', 'bg-gray-300': currentReaction === 'love'}" 
        class="transition-all active:scale-90 p-2 rounded-full"
      >
        ❤️ {{ love }}
      </button>
      <button 
        @click="react('surprised')" 
        :disabled="isProcessing"
        :class="{'brightness-90 scale-75': isProcessing, ' bg-surface-200': currentReaction === 'surprised', 'bg-gray-300': currentReaction === 'surprised'}" 
        class="transition-all active:scale-90 p-2 rounded-full"
      >
        😮 {{ surprised }}
      </button>
      <button 
        @click="react('sad')" 
        :disabled="isProcessing"
        :class="{'brightness-90 scale-75': isProcessing, ' bg-surface-200': currentReaction === 'sad', 'bg-gray-300': currentReaction === 'sad'}" 
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
      reactionTimeout: null,
      isProcessing: false,
    };
  },
  created() {
    this.loadReactions();
  },
  methods: {
    async loadReactions() {
      try {
        const data = await fetchReactionsArticle({ articleSlug: this.articleSlug });
        this.like = data.reactions.like || 0;
        this.love = data.reactions.love || 0;
        this.surprised = data.reactions.surprised || 0;
        this.sad = data.reactions.sad || 0;
        this.visits = data.visits || 0;
      } catch (error) {
        console.error('Erro ao carregar reações:', error);
      }
    },
    async react(reaction) {
      // Prevent spamming by disabling buttons while processing
      if (this.isProcessing) {
        return;
      }

      // Set processing state
      this.isProcessing = true;

      try {
        const data = await addReactionArticle({ articleSlug: this.articleSlug, reactionType: reaction });

        // Update reactions and visits based on the response
        this.like = data.reactions.like || 0;
        this.love = data.reactions.love || 0;
        this.surprised = data.reactions.surprised || 0;
        this.sad = data.reactions.sad || 0;
        this.visits = data.visits || 0;

        // Update current reaction
        if (this.currentReaction === reaction) {
          this.currentReaction = null;
        } else {
          this.currentReaction = reaction;
        }
      } catch (error) {
        console.error('Erro ao adicionar reação:', error);
      } finally {
        // Reset processing state
        this.isProcessing = false;
      }
    },
  },
};
</script>