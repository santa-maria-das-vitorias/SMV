import { LRUCache } from 'lru-cache';
import { fetchReactionsArticle } from './fetchReactionsArticle';

interface AddArticleVisitParams {
  articleSlug: string;
}

interface Reactions {
  like: number;
  love: number;
  surprised: number;
  sad: number;
}

interface ArticleStats {
  reactions: Reactions;
  visits: number;
}

const cache = new LRUCache<string, ArticleStats>({ max: 100, ttl: 1000 * 60 * 60 }); // Cache até 100 artigos por 1 hora

export const addArticleVisit = async ({ articleSlug }: AddArticleVisitParams): Promise<ArticleStats> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ articleSlug, stat: 'visit' })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Assuming the response is just a confirmation and not the updated stats
    await response.json();

    // Fetch the updated stats
    const updatedStats = await fetchReactionsArticle({ articleSlug });

    // Update the cache with the new stats
    cache.set(articleSlug, updatedStats);

    return updatedStats;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};