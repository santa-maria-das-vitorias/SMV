import categories from '@/api/data/articlesPerCategory.json';
import { isProduction } from '@/utils/isProduction';

export const fetchArticlesPerCategory = async ({ slug }) => {
  const category = categories.find((category) => category.slug === slug);
  if (!category) {
    console.error('Categoria não encontrada para o slug:', slug);
    throw new Error('Category not found');
  }

  const articlesWithImageUrls = category.articles.map(article => {
    const imageUrl = article.image
      ? isProduction
        ? `${import.meta.env.VITE_IMAGE_URL}${article.image}`
        : `/upload${article.image}`
      : null;

    return {
      ...article,
      imageUrl,
    };
  });

  return {
    ...category,
    articles: articlesWithImageUrls,
  };
};