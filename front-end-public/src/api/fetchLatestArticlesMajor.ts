import { LRUCache } from 'lru-cache';

interface Article {
  image?: string;
  imageUrl?: string | null;
  date: string;
  [key: string]: any;
}

const cache = new LRUCache<string, Article[]>({ max: 100, ttl: 1000 * 60 * 60 }); // Cache até 100 artigos por 1 hora

export const fetchLatestArticlesMajor = async (): Promise<Article[]> => {
  const cachedArticles = cache.get('latestArticlesMajor');
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

    // Adicionar URLs completas das imagens
    const articlesWithImageUrls = articles.map(article => {
      const imageUrl = article.image
        ? `${import.meta.env.VITE_IMAGE_URL}${article.image}`
        : null;

      return {
        ...article,
        imageUrl,
      };
    });

    // Ordenar os artigos por data, do mais recente para o mais antigo
    const sortedArticles = articlesWithImageUrls.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    cache.set('latestArticlesMajor', sortedArticles);

    return sortedArticles;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};