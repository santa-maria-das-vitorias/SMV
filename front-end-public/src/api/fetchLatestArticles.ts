import { LRUCache } from 'lru-cache';

interface Article {
  date: string;
  [key: string]: any;
}

const cache = new LRUCache<string, Article[]>({ max: 100, ttl: 1000 * 60 * 60 }); // Cache até 100 artigos por 1 hora

export const fetchLatestArticles = async (): Promise<Article[]> => {
  const cachedArticles = cache.get('latestArticles');
  if (cachedArticles) {
    return cachedArticles;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles`, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const articles: Article[] = await response.json();
    // Organize os artigos de maneira cronológica pela coluna "date"
    const sortedArticles = articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    cache.set('latestArticles', sortedArticles);

    return sortedArticles;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};