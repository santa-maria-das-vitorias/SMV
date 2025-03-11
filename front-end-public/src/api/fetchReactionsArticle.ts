import { LRUCache } from 'lru-cache';

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

interface FetchReactionsArticleParams {
  articleSlug: string;
}

const cache = new LRUCache<string, ArticleStats>({ max: 100, ttl: 1000 * 60 * 60 }); // Cache até 100 artigos por 1 hora

export const fetchReactionsArticle = async ({ articleSlug }: FetchReactionsArticleParams): Promise<ArticleStats> => {
  const cachedStats = cache.get(articleSlug);
  if (cachedStats) {
    return cachedStats;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stats/${articleSlug}`, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const articleStats: ArticleStats = {
      reactions: {
        like: data.stats.like || 0,
        love: data.stats.love || 0,
        surprised: data.stats.surprised || 0,
        sad: data.stats.sad || 0,
      },
      visits: data.stats.visit || 0
    };

    cache.set(articleSlug, articleStats);

    return articleStats;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};