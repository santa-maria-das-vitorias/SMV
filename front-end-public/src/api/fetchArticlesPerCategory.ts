import { LRUCache } from 'lru-cache';

interface Article {
  image?: string;
  imageUrl?: string | null;
  [key: string]: any;
}

interface FetchArticlesPerCategoryParams {
  slug: string;
}

const cache = new LRUCache<string, Article[]>({ max: 100, ttl: 1000 * 60 * 60 }); // Cache até 100 categorias por 1 hora

export const fetchArticlesPerCategory = async ({ slug }: FetchArticlesPerCategoryParams): Promise<Article[]> => {
  const cachedArticles = cache.get(slug);
  if (cachedArticles) {
    return cachedArticles;
  }

  try {
    console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('API Key:', import.meta.env.VITE_API_KEY);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories/${slug}`, {
      headers: {
        'X-API-Key': import.meta.env.VITE_API_KEY
      }
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const articles: Article[] = await response.json();
    console.log('Articles:', articles);

    if (!Array.isArray(articles) || articles.length === 0) {
      throw new Error('No articles found for this category');
    }

    const articlesWithImageUrls = articles.map(article => {
      const imageUrl = article.image
        ? `${import.meta.env.VITE_IMAGE_URL}${article.image}`
        : null;

      return {
        ...article,
        imageUrl,
      };
    });

    cache.set(slug, articlesWithImageUrls);

    return articlesWithImageUrls;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};