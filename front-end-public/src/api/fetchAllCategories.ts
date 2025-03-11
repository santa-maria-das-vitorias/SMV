import { LRUCache } from 'lru-cache';

interface Category {
  [key: string]: any;
}

const cache = new LRUCache<string, Category[]>({ max: 100, ttl: 1000 * 60 * 60 }); // Cache até 100 categorias por 1 hora

export const fetchAllCategories = async (): Promise<Category[]> => {
  const cachedCategories = cache.get('allCategories');
  if (cachedCategories) {
    return cachedCategories;
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories`, {
      headers: {
        'x-api-key': import.meta.env.VITE_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const categories: Category[] = await response.json();
    cache.set('allCategories', categories);

    return categories;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    throw error;
  }
};