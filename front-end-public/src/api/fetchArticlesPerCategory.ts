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

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories/${slug}`, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const articles: Article[] = await response.json();

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