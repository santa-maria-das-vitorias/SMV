import { LRUCache } from 'lru-cache';

interface Article {
  image?: string;
  [key: string]: any;
}

interface FetchSingleArticleParams {
  slug: string;
}

const cache = new LRUCache<string, Article>({ max: 100, ttl: 1000 * 60 * 60 }); // Cache até 100 artigos por 1 hora

export const fetchSingleArticle = async ({ slug }: FetchSingleArticleParams): Promise<Article> => {
  const cachedArticle = cache.get(slug);
  if (cachedArticle) {
    return cachedArticle;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/articles/${slug}`, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const article: Article = await response.json();

    // Adicionar URL completa da imagem
    const imageUrl = article.image
      ? `${import.meta.env.VITE_IMAGE_URL}${article.image}`
      : null;

    const articleWithImageUrl = {
      ...article,
      imageUrl,
    };

    cache.set(slug, articleWithImageUrl);

    return articleWithImageUrl;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};